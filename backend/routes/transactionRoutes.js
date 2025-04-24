import express from 'express';

import { protectRoute } from '../middlewares/authMiddleware.js';
import { validateObjectId } from '../middlewares/validateObjectId.js';
import {
  createTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
  exportTransactions,
  getTransactionSummary,
  getExpensesByCategory,
  getMonthlyComparison,
} from '../controller/transactionController.js';

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
router.delete('/:id', protectRoute, validateObjectId, deleteTransaction);

// Route to update a transaction by ID
router.put('/:id', protectRoute, validateObjectId, updateTransaction);

// Route to export transactions as CSV
router.get('/export', protectRoute, exportTransactions);

router.get('/summary', protectRoute, getTransactionSummary);
router.get('/expenses-by-category', protectRoute, getExpensesByCategory);
router.get('/monthly-comparison', protectRoute, getMonthlyComparison);

export default router;
