import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface PieChartProps {
  data: {
    carbonFootprint: number;
    waterUsage: number;
    energyConsumption: number;
    recyclability: number;
  };
}

export const PieChart = ({ data }: PieChartProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Carbon Footprint', 'Water Usage', 'Energy Consumption', 'Recyclability'],
        datasets: [{
          data: [
            data.carbonFootprint,
            data.waterUsage,
            data.energyConsumption,
            data.recyclability,
          ],
          backgroundColor: [
            '#EF4444',
            '#3B82F6',
            '#F59E0B',
            '#10B981',
          ],
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [data]);

  return <canvas ref={chartRef} />;
}; 