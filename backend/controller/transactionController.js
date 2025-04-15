import User from '../models/User.js';
import Transaction from '../models/Transaction.js';

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
    transaction.amount = amount;
    transaction.transactionType = transactionType;
    transaction.category = category;
    transaction.description = description;
    transaction.date = date;
    await transaction.save();
    res.json(transaction);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const exportTransactions = async (req, res) => {};
