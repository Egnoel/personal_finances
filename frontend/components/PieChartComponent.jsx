'use client';
import React from 'react';
import { Pie, Label, PieChart } from 'recharts';
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

const PieChartComponent = () => {
  const chartData = [
    { category: 'housing', total: 4000, fill: 'var(--color-housing)' },
    { category: 'food', total: 3000, fill: 'var(--color-food)' },
    { category: 'work', total: 2000, fill: 'var(--color-work)' },
    { category: 'salary', total: 2780, fill: 'var(--color-salary)' },
  ];
  const chartConfig = {
    housing: {
      label: 'Income',
      color: 'hsl(var(--chart-1))',
    },
    food: {
      label: 'Food',
      color: 'hsl(var(--chart-2))',
    },
    work: {
      label: 'Work',
      color: 'hsl(var(--chart-3))',
    },
    salary: {
      label: 'Salary',
      color: 'hsl(var(--chart-4))',
    },
  };

  const toal = React.useMemo(() => {
    return chartData.reduce((acc, item) => acc + item.total, 0);
  }, [chartData]);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Expenses by category</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[200px] w-2xs"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="total"
              nameKey="category"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
            >
              {chartData.map((entry, index) => (
                <Label
                  key={`cell-${index}`}
                  fill={entry.fill}
                  position="outside"
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PieChartComponent;
