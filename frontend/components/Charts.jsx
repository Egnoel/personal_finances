'use client';
import React from 'react';
import PieChartComponent from './PieChartComponent';
import BarChartComponent from './BarChartComponent';

const Charts = () => {
  return (
    <div className="flex flex-row justify-center items-center gap-10 p-7">
      <PieChartComponent />
      <BarChartComponent />
    </div>
  );
};

export default Charts;
