import express from 'express';

import { protectRoute } from '../middlewares/authMiddleware.js';
import {
  createTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
  exportTransactions,
} from '../controller/transactionController.js';
const { query, matchedData, validationResult } = require('express-validator');

const router = express.Router();

/*

GET /api/transactions – listar todas (com filtros)

POST /api/transactions – criar nova

PUT /api/transactions/:id – editar

DELETE /api/transactions/:id – remover

GET /api/transactions/export – exportar CSV

*/

// Route to create a new transaction
router.post('/', protectRoute, createTransaction);

// Route to get all transactions for a user
router.get('/', protectRoute, getTransactions);

// Route to delete a transaction by ID
router.delete('/:id', protectRoute, deleteTransaction);

// Route to update a transaction by ID
router.put('/:id', protectRoute, updateTransaction);

// Route to export transactions as CSV
router.get('/export', protectRoute, exportTransactions);

export default router;
