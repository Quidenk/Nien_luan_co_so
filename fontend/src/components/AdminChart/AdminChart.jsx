// import React from 'react'
// import RevenueChart from '../RevenueChart/RevenueChart'
// import { GetAllOrderApi } from '../../util/orderService';
// import { useQuery } from '@tanstack/react-query';
// import LoadingComponent from '../LoadingComponent/LoadingComponent';
// import { WrapperHeader } from './style';
// import OrderStatusChart from '../OrderStatusChart/OrderStatusChart';

// const AdminChart = () => {

//     const GetALLOrder = async() => {
//         const res = await GetAllOrderApi();
//         return res
//     }

//     const queryOrder = useQuery({
//         queryKey: ['order'], // Khóa để xác định query
//         queryFn: GetALLOrder, // Hàm gọi API
//     })
//     const { isPending : isLoadingOrder, data : order} = queryOrder
    
//     const statusCount = {
//         pending: order?.data?.filter(o => o.status === 1).length || 0,
//         canceled: order?.data?.filter(o => o.status === 2).length || 0,
//         confirmed: order?.data?.filter(o => o.status === 3).length || 0,
//     };

//     const chartData = [statusCount.pending, statusCount.canceled, statusCount.confirmed];

//   return (
//     <div>
//         <LoadingComponent isLoading={isLoadingOrder}>
//         <WrapperHeader style={{ display: 'flex', flexDirection: 'row' }}>
//             <div>
//                 <h3 style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: '30px' }}>Biểu đồ doanh thu</h3>
//                 <RevenueChart orders={order?.data || []} />
//             </div>

//             <div>
//                 {/* Display the order status chart */}
//                 <OrderStatusChart data={chartData} />
//             </div>
//         </WrapperHeader>
//         </LoadingComponent>
//     </div>
//   )
// }

// export default AdminChart


import React, { useState } from 'react';
import RevenueChart from '../RevenueChart/RevenueChart';
import { GetAllOrderApi } from '../../util/orderService';
import { useQuery } from '@tanstack/react-query';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import { ButtonAntD, WrapperHeader } from './style';
import OrderStatusChart from '../OrderStatusChart/OrderStatusChart';

const AdminChart = () => {
    const [activeChart, setActiveChart] = useState('revenue');  // Track which chart to display

    const GetALLOrder = async () => {
        const res = await GetAllOrderApi();
        return res;
    };

    const queryOrder = useQuery({
        queryKey: ['order'], // Khóa để xác định query
        queryFn: GetALLOrder, // Hàm gọi API
    });

    const { isPending: isLoadingOrder, data: order } = queryOrder;

    const statusCount = {
        pending: order?.data?.filter((o) => o.status === 1).length || 0,
        canceled: order?.data?.filter((o) => o.status === 2).length || 0,
        confirmed: order?.data?.filter((o) => o.status === 3).length || 0,
    };

    const chartData = [statusCount.pending, statusCount.canceled, statusCount.confirmed];

    // Function to toggle between the charts
    const handleToggleChart = (chartType) => {
        setActiveChart(chartType);
    };

    return (
        <div>
            <LoadingComponent isLoading={isLoadingOrder}>
                <WrapperHeader style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ flex: 1 }}>
                        <h3 style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: '30px' }}>
                            Biểu đồ {activeChart === 'revenue' ? 'doanh thu' : 'trạng thái đơn hàng'}
                        </h3>
                        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                            {/* Buttons to toggle charts */}
                            <ButtonAntD
                                onClick={() => handleToggleChart('revenue')}
                                style={{ padding: '10px', margin: '5px', cursor: 'pointer' }}
                            >
                                Biểu đồ doanh thu
                            </ButtonAntD>
                            <ButtonAntD
                                onClick={() => handleToggleChart('status')}
                                style={{ padding: '10px', margin: '5px', cursor: 'pointer' }}
                            >
                                Biểu đồ trạng thái đơn hàng
                            </ButtonAntD>
                        </div>
                        {/* Conditionally render the active chart */}
                        {activeChart === 'revenue' ? (
                            <RevenueChart orders={order?.data || []} />
                        ) : (
                            <OrderStatusChart data={chartData} />
                        )}
                    </div>
                </WrapperHeader>
            </LoadingComponent>
        </div>
    );
};

export default AdminChart;
