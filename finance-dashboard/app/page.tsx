'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExpensesByCategoryChart } from '@/components/expenses-by-category-chart';
import { MonthlyComparisonChart } from '@/components/monthly-comparison-chart';
import { TransactionsTable } from '@/components/transactions-table';
import { AddTransactionDialog } from '@/components/add-transaction-dialog';
import { Suspense } from 'react';
import { DashboardSummary } from '@/components/dashboard-summary';
import { DashboardSkeleton } from '@/components/dashboard-skeleton';
import { useAuth } from '@/components/auth-provider';
import { signOut } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { downloadCSV } from '@/lib/downloadCSV';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin');
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-100">
      <div className="container mx-auto p-4 md:p-6 lg:p-8">
        <Card className="w-full overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between px-6 py-4 border-b">
            <h1 className="text-2xl font-bold">
              Dashboard de Finanças Pessoais
            </h1>
            <div className="flex items-center gap-4">
              <span className="font-medium">{user.fullName}</span>
              <Button variant="outline" size="sm" onClick={signOut}>
                Sair
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <Suspense fallback={<DashboardSkeleton />}>
              <DashboardSummary />
            </Suspense>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader className="px-6 py-4">
                  <CardTitle>Despesas por Categoria</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="h-[300px]">
                    <ExpensesByCategoryChart />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="px-6 py-4">
                  <CardTitle>Entradas e Saídas por Mês</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="h-[300px]">
                    <MonthlyComparisonChart />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Lista de Transações</h2>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={downloadCSV}>
                    Exportar CSV
                  </Button>
                  <AddTransactionDialog />
                </div>
              </div>
              <TransactionsTable />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
