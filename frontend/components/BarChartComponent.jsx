'use client';
import React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import {
  chartConfig,
  ChartContainer,
  chartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';

const BarChartComponent = () => {
  const chartData = [
    { month: 'Jan', income: 4000, expense: 2400 },
    { month: 'Feb', income: 3000, expense: 1398 },
    { month: 'Mar', income: 2000, expense: 9800 },
    { month: 'Apr', income: 2780, expense: 3908 },
    { month: 'May', income: 1890, expense: 4800 },
    { month: 'Jun', income: 2390, expense: 3800 },
    { month: 'Jul', income: 3490, expense: 4300 },
  ];
  const chartConfig = {
    income: {
      fill: '#8884d8',
      label: 'Income',
    },
    expense: {
      fill: '#82ca9d',
      label: 'Expense',
    },
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Income & Expenses by month</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-2xs">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <ChartLegend content={ChartLegendContent} />
            <Bar dataKey="income" fill={chartConfig.income.fill} radius={4} />
            <Bar dataKey="expense" fill={chartConfig.expense.fill} radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default BarChartComponent;
