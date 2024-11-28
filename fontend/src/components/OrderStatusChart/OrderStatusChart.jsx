import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Register chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const OrderStatusChart = ({ data }) => {
    // Set up the chart data
    const chartData = {
        labels: ['Chưa duyệt', 'Đã hủy', 'Xác nhận'], // Labels for the bar chart
        datasets: [
            {
                label: 'Trạng thái đơn hàng',
                data: data,  // Receive data as props (Pending, Canceled, Confirmed)
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)', // Red for Pending
                    'rgba(54, 162, 235, 0.5)', // Blue for Canceled
                    'rgba(255, 205, 86, 0.5)', // Yellow for Confirmed
                ],
                borderColor: [
                    'rgb(255, 99, 132)', // Red for Pending
                    'rgb(54, 162, 235)', // Blue for Canceled
                    'rgb(255, 205, 86)', // Yellow for Confirmed
                ],
                borderWidth: 1, // Border width for the bars
            },
        ],
    };

    // Set up chart options
    const chartOptions = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => `${tooltipItem.raw} orders`, // Tooltip formatting
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Ngày trong tuần',
                    color: '#fff', // Chỉnh màu chữ của chú thích
                },
                ticks: {
                    color: '#fff', // Chỉnh màu chữ của các giá trị trên trục x
                },
                grid: {
                    color: 'rgb(255, 255, 255, 0.4)', // Chỉnh màu của các đường kẻ trên trục X
                },
            },
            y: {
                beginAtZero: true, // Ensure y-axis starts from 0
                ticks: {
                    color: '#fff', // Chỉnh màu chữ của các giá trị trên trục x
                },
                grid: {
                    color: 'rgb(255, 255, 255, 0.4)', // Chỉnh màu của các đường kẻ trên trục X
                },
            },
        },
    };

    return (
        <div >
            <Bar data={chartData} options={chartOptions} /> {/* Render the bar chart */}
        </div>
    );
};

export default OrderStatusChart;
