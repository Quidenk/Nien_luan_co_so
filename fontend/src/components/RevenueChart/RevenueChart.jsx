
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Đăng ký các thành phần cần thiết của Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const RevenueChart = ({ orders }) => {
    // Xử lý dữ liệu theo tuần
    const processWeeklyRevenueData = (orders) => {
        // Khởi tạo mảng doanh thu theo các ngày trong tuần
        const weeklyRevenue = {
            Monday: 0,
            Tuesday: 0,
            Wednesday: 0,
            Thursday: 0,
            Friday: 0,
            Saturday: 0,
            Sunday: 0,
        };

        // Map ngày trong tuần
        const daysOfWeek = [
            'Sunday', // `getDay()` trả về 0 là Chủ Nhật
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ];

        orders.forEach((order) => {
            const orderDate = new Date(order.createdAt);
            const dayName = daysOfWeek[orderDate.getDay()];
            weeklyRevenue[dayName] += order.totalPrice;
        });

        // Chuẩn bị dữ liệu cho biểu đồ
        return {
            labels: Object.keys(weeklyRevenue), // ['Monday', 'Tuesday', ...]
            data: Object.values(weeklyRevenue), // [Doanh thu Monday, Doanh thu Tuesday, ...]
        };
    };

    const { labels, data } = processWeeklyRevenueData(orders);

    const chartData = {
        labels ,
        datasets: [
            {
                label: 'Doanh thu theo tuần (VNĐ)',
                data,
                fill: false,
                borderColor: 'rgb(241, 94, 44)',
                backgroundColor: 'rgb(241, 94, 44, 0.2)',
                tension: 0.3, // Làm mượt đường
                pointStyle: 'circle',
                pointRadius: 5,
                pointHoverRadius: 7,
                color: '#fff', // Chỉnh màu chữ của chú thích
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Doanh thu theo tuần',
                color: '#fff', // Chỉnh màu chữ của chú thích
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
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Doanh thu (VNĐ)',
                    color: '#fff', // Chỉnh màu chữ của chú thích
                },
                ticks: {
                    color: '#fff', // Chỉnh màu chữ của các giá trị trên trục x
                },
                grid: {
                    color: 'rgb(255, 255, 255, 0.4)', // Chỉnh màu của các đường kẻ trên trục X
                },
            },
        },
    };

    return <Line data={chartData} options={chartOptions} />;
};

export default RevenueChart;
