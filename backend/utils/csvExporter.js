import { createObjectCsvWriter } from 'csv-writer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const csvFilePath = path.join(__dirname, '../uploads/transactions.csv');

export const cvsWriter = createObjectCsvWriter({
  path: 'out.csv',
  header: [
    { id: 'amount', title: 'Amount' },
    { id: 'transactionType', title: 'Transaction Type' },
    { id: 'category', title: 'Category' },
    { id: 'description', title: 'Description' },
    { id: 'date', title: 'Date' },
  ],
});
