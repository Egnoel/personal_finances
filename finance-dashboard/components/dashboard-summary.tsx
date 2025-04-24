'use client';

import { useEffect, useState } from 'react';
import { Wallet, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { fetchDashboardSummary } from '@/lib/api';

type SummaryData = {
  balance: number;
  totalIncome: number;
  totalExpense: number;
};

export function DashboardSummary() {
  const [summary, setSummary] = useState<SummaryData>({
    balance: 0,
    totalIncome: 0,
    totalExpense: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const data = await fetchDashboardSummary();
        setSummary(data);
      } catch (error) {
        console.error('Failed to load dashboard summary:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSummary();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="bg-gray-50 border-none animate-pulse">
            <CardContent className="h-24 p-6"></CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card className="bg-emerald-100 border-none">
        <CardContent className="flex items-center p-6">
          <div className="mr-4 rounded-full bg-emerald-200 p-3">
            <Wallet className="h-6 w-6 text-emerald-700" />
          </div>
          <div>
            <p className="text-sm font-medium text-emerald-700">Saldo Total</p>
            <h2 className="text-3xl font-bold text-emerald-700">
              R$ {summary.balance?.toFixed(2)}
            </h2>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-blue-100 border-none">
        <CardContent className="flex items-center p-6">
          <div className="mr-4 rounded-full bg-blue-200 p-3">
            <ArrowUpRight className="h-6 w-6 text-blue-700" />
          </div>
          <div>
            <p className="text-sm font-medium text-blue-700">
              Total de Entradas
            </p>
            <h2 className="text-3xl font-bold text-blue-700">
              R$ {summary.totalIncome?.toFixed(2)}
            </h2>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-red-100 border-none">
        <CardContent className="flex items-center p-6">
          <div className="mr-4 rounded-full bg-red-200 p-3">
            <ArrowDownLeft className="h-6 w-6 text-red-700" />
          </div>
          <div>
            <p className="text-sm font-medium text-red-700">Total de Saídas</p>
            <h2 className="text-3xl font-bold text-red-700">
              R$ {summary.totalExpense?.toFixed(2)}
            </h2>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
