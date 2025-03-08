import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

function TimelineGraph({ entries }) {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });

    useEffect(() => {
        if (!Array.isArray(entries) || entries.length === 0) {
            setChartData({ labels: [], datasets: [] });
            return;
        }

        // Step 1: Aggregate entries by date
        const aggregatedEntries = {};
        entries.forEach((entry) => {
            const dateKey = entry.date || 'Recurring';
            const amount = parseFloat(entry.amount);
            if (isNaN(amount)) return;

            if (!aggregatedEntries[dateKey]) {
                aggregatedEntries[dateKey] = 0;
            }

            // Add income, subtract expense
            aggregatedEntries[dateKey] += entry.transaction_type === 'OUT' ? -amount : amount;
        });

        // Step 2: Sort dates and calculate running total
        const sortedDates = Object.keys(aggregatedEntries).sort((a, b) => new Date(a) - new Date(b));
        let runningTotal = 0;
        const labels = [];
        const amounts = [];

        sortedDates.forEach((date) => {
            labels.push(date);
            runningTotal += aggregatedEntries[date];
            amounts.push(runningTotal);
        });

        // Step 3: Update chart data
        setChartData({
            labels,
            datasets: [
                {
                    label: 'Balance Over Time',
                    data: amounts,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                },
            ],
        });
    }, [entries]);

    return (
        <div style={{ width: '100%', height: '400px', padding: '20px' }}>
            {chartData.labels.length > 0 ? (
                <Line
                    data={chartData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: { position: 'top' },
                            tooltip: { mode: 'index', intersect: false },
                        },
                        scales: {
                            x: { title: { display: true, text: 'Date' } },
                            y: { title: { display: true, text: 'Balance' } },
                        },
                    }}
                />
            ) : (
                <p>No data available. Please add entries.</p>
            )}
        </div>
    );
}

export default TimelineGraph;
