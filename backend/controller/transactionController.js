import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import { cvsWriter } from '../utils/csvExporter.js';
import fs from 'fs';

export const createTransaction = async (req, res) => {
  const { amount, transactionType, category, description, date } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const transaction = new Transaction({
      user: req.user._id,
      amount,
      transactionType,
      category,
      description,
      date,
    });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getTransactions = async (req, res) => {
  const { startDate, endDate, transactionType, category } = req.query;
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const query = { user: req.user._id };
    if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    if (transactionType) {
      query.transactionType = transactionType;
    }
    if (category) {
      query.category = category;
    }
    const transactions = await Transaction.find(query).sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};
export const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    await transaction.remove();
    res.json({ message: 'Transaction removed' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { amount, transactionType, category, description, date } = req.body;
  try {
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    if (!amount && !transactionType && !category && !description && !date) {
      return res.status(400).json({ message: 'No fields to update' });
    }

    if (amount) {
      if (amount < 0) {
        return res.status(400).json({ message: 'Amount must be positive' });
      }
      transaction.amount = amount;
    }

    if (transactionType) {
      if (!['income', 'expense'].includes(transactionType)) {
        return res.status(400).json({ message: 'Invalid transaction type' });
      }
      transaction.transactionType = transactionType;
    }

    if (category) {
      if (category.length < 3) {
        return res
          .status(400)
          .json({ message: 'Category must be at least 3 characters long' });
      }
      transaction.category = category;
    }

    if (description) {
      if (description.length < 5) {
        return res
          .status(400)
          .json({ message: 'Description must be at least 5 characters long' });
      }
      transaction.description = description;
    }

    if (date) {
      if (new Date(date) > new Date()) {
        return res
          .status(400)
          .json({ message: 'Date cannot be in the future' });
      }
      transaction.date = new Date(date);
    }

    await transaction.save();
    res.status(200).json(transaction);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const exportTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id });
    if (transactions.length === 0) {
      return res.status(404).json({ message: 'No transactions found' });
    }
    const csvData = transactions.map((transaction) => ({
      amount: transaction.amount,
      transactionType: transaction.transactionType,
      category: transaction.category,
      description: transaction.description,
      date: transaction.date.toISOString().split('T')[0],
    }));
    await cvsWriter.writeRecords(csvData);
    res.download('out.csv', 'transactions.csv', (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: 'Error downloading file' });
      } else {
        fs.unlinkSync('out.csv'); // Delete the file after download
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};
