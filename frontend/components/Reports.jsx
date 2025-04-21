import React from 'react';
import { Wallet, LogIn, LogOut } from 'lucide-react';

const Reports = () => {
  return (
    <div className="flex flex-row gap-28 p-7 w-full justify-center">
      <div className="flex flex-row items-center justify-center p-5 bg-green-800 gap-6 rounded-lg shadow-md w-2xs">
        <Wallet className="text-green-600" size={36} />
        <div className="text-white font-bold text-lg flex flex-col">
          <span>Balance</span>
          <span className="text-2xl">$ 0.00</span>
        </div>
      </div>

      <div className="flex flex-row items-center p-5 bg-blue-800 gap-6 rounded-lg shadow-md w-2xs">
        <LogIn className="text-white" size={36} />
        <div className="text-white font-bold text-lg flex flex-col">
          <span>Total Income</span>
          <span className="text-2xl">$ 0.00</span>
        </div>
      </div>

      <div className="flex flex-row items-center p-5 bg-rose-600 gap-6 rounded-lg shadow-md w-2xs">
        <LogOut className="text-white" size={36} />
        <div className="text-white font-bold text-lg flex flex-col">
          <span>Total Expenses</span>
          <span className="text-2xl">$ 0.00</span>
        </div>
      </div>
    </div>
  );
};

export default Reports;
