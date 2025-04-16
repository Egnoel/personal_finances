import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: 'Password must be at least 6 characters long' });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ fullName, email, password: hashedPassword });
    if (newUser) {
      const token = generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        token,
      });
    } else {
      return res.status(400).json({ message: 'Failed to create user' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = generateToken(user._id, res);
    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie('token', '', {
      maxAge: 0,
    });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      totalIncome: user.totalIncome,
      totalExpense: user.totalExpense,
      balance: user.balance,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};
