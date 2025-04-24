import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import { createObjectCsvWriter, createObjectCsvStringifier } from 'csv-writer';
import fs from 'fs';
import mongoose from 'mongoose';

export const createTransaction = async (req, res) => {
  const { amount, transactionType, category, description, date } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!amount || !transactionType || !category || !description || !date) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (amount < 0) {
      return res.status(400).json({ message: 'Amount must be positive' });
    }
    if (!['income', 'expense'].includes(transactionType)) {
      return res.status(400).json({ message: 'Invalid transaction type' });
    }
    if (transactionType === 'income') {
      user.balance += amount;
      user.totalIncome += amount;
    }

    if (transactionType === 'expense') {
      user.balance -= amount;
      user.totalExpense += amount;
    }
    await user.save();

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
    const user = await User.findById(req.user._id);
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    if (transaction.transactionType === 'income') {
      user.balance -= transaction.amount;
      user.totalIncome -= transaction.amount;
      await user.save();
    } else if (transaction.transactionType === 'expense') {
      user.balance -= transaction.amount;
      user.totalExpense -= transaction.amount;
      await user.save();
    }

    await Transaction.findByIdAndDelete(id);
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
      if (transactionType === 'income') {
        transaction.user.balance += amount;
        transaction.user.totalIncome += amount;
      } else if (transactionType === 'expense') {
        transaction.user.balance -= amount;
        transaction.user.totalExpense += amount;
      }
      await transaction.user.save();
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

    const csvStringifier = createObjectCsvStringifier({
      header: [
        { id: 'amount', title: 'Amount' },
        { id: 'transactionType', title: 'Transaction Type' },
        { id: 'category', title: 'Category' },
        { id: 'description', title: 'Description' },
        { id: 'date', title: 'Date' },
      ],
    });

    const csvData = transactions.map((transaction) => ({
      amount: transaction.amount,
      transactionType: transaction.transactionType,
      category: transaction.category,
      description: transaction.description,
      date: transaction.date.toISOString().split('T')[0],
    }));

    const csvContent =
      csvStringifier.getHeaderString() +
      csvStringifier.stringifyRecords(csvData);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="transactions.csv"'
    );
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    res.status(200).send(csvContent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getTransactionSummary = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const summary = {
      totalIncome: user.totalIncome,
      totalExpense: user.totalExpense,
      balance: user.balance,
    };

    res.status(200).json(summary);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getExpensesByCategory = async (req, res) => {
  try {
    const expenses = await Transaction.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user._id),
          transactionType: 'expense',
        },
      },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' },
        },
      },
      {
        $project: {
          category: '$_id',
          total: 1,
          _id: 0,
        },
      },
      {
        $sort: { total: -1 },
      },
    ]);

    res.status(200).json(expenses);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getMonthlyComparison = async (req, res) => {
  try {
    const comparison = await Transaction.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user._id),
        },
      },
      {
        $group: {
          _id: {
            month: { $month: '$date' },
            year: { $year: '$date' },
            type: '$transactionType',
          },
          total: { $sum: '$amount' },
        },
      },
      {
        $group: {
          _id: {
            month: '$_id.month',
            year: '$_id.year',
          },
          income: {
            $sum: {
              $cond: [{ $eq: ['$_id.type', 'income'] }, '$total', 0],
            },
          },
          expense: {
            $sum: {
              $cond: [{ $eq: ['$_id.type', 'expense'] }, '$total', 0],
            },
          },
        },
      },
      {
        $project: {
          month: '$_id.month',
          year: '$_id.year',
          income: 1,
          expense: 1,
          _id: 0,
        },
      },
      {
        $sort: { year: 1, month: 1 },
      },
    ]);

    res.status(200).json(comparison);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};
