import React from 'react'
import { WrapperAllPrice, WrapperContentInfo, WrapperHeaderUser, WrapperInfoUser, WrapperItem, WrapperItemLabel, WrapperLabel, WrapperNameProduct, WrapperProduct, WrapperStyleContent } from './style'
// import logo from '../../assets/images/logo.png'
import { useLocation, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { orderContant } from '../../contant'
import { convertPrice } from '../../utils'
import { useMemo } from 'react'
import { GetDetailOrderApi, GetOrderApi } from '../../util/orderService'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
import { Wrapper } from './style'
import { Lable } from './style'
import { WrapperOrder } from './style'

const DetailsOrderPage = () => {
  const params = useParams()
  const location = useLocation()
  const { state } = location
  const { id } = params

  console.log('id' , id)

//   const fetchDetailsOrder = async () => {
//     const res = await GetOrderApi(id)
//     return res
//   }
  
//     const queryOrder = useQuery({ 
//         queryKey: ['orders-details'], 
//         queryFn: fetchDetailsOrder 
//         }, {
//         enabled: id
//     })
//     const { isPending: isLoading, data } = queryOrder
    
    const fetchDetailsOrder = async () => {
        const res = await GetDetailOrderApi(id);
        return res.data;
    };
  
    const queryOrder = useQuery({
        queryKey: ['orders-details', id], // Truyền `id` vào `queryKey` để phân biệt từng truy vấn theo `id`
        queryFn: fetchDetailsOrder,
        enabled: !!id, // Kiểm tra `id` có tồn tại, chỉ thực hiện khi `id` có giá trị
    });
  
    const { isPending:isLoading, data } = queryOrder;

    console.log('res', data)

    const priceMemo = useMemo(() => {
        const result = data?.orderItems?.reduce((total, cur) => {
          return total + ((cur.price * cur.amount))
        },0)
        return result
    },[data])

  return (
   <LoadingComponent isLoading={isLoading}>
     <Wrapper>
        <Lable >CHI TIẾT ĐƠN HÀNG</Lable>
        <WrapperHeaderUser>
            <WrapperInfoUser>
                <WrapperLabel>Địa chỉ người nhận</WrapperLabel>
                <WrapperContentInfo>
                    <div className='name-info' style={{ color: '#f15e2c', fontSize: '17px'}}>
                        {data?.shippingAddress?.fullName}
                    </div>
                    <div className='address-info' style={{ color: '#fff'}}><span>Địa chỉ: </span> 
                        {`${data?.shippingAddress?.address} ${data?.shippingAddress?.city}`}
                    </div>
                    <div className='phone-info' style={{ color: '#fff'}}><span>Điện thoại: </span> 
                        {data?.shippingAddress?.phone}
                    </div>
                </WrapperContentInfo>
            </WrapperInfoUser>
            <WrapperInfoUser>
                <WrapperLabel>Hình thức giao hàng</WrapperLabel>
                <WrapperContentInfo>
                    <div className='delivery-info' style={{ color: '#fff'}}><span className='name-delivery'>FAST </span>Giao hàng tiết kiệm</div>
                    <div className='delivery-fee' style={{ color: '#fff'}}><span>Phí giao hàng: </span> 
                        {convertPrice(data?.shippingPrice)}
                    </div>
                </WrapperContentInfo>
            </WrapperInfoUser>
            <WrapperInfoUser>
                <WrapperLabel>Hình thức thanh toán</WrapperLabel>
                <WrapperContentInfo>
                    <div className='payment-info' style={{ color: '#fff'}}>
                        {orderContant.payment[data?.paymentMethod]}
                    </div>
                    <div className='status-payment'>
                        {data?.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}
                    </div>
                </WrapperContentInfo>
            </WrapperInfoUser>
        </WrapperHeaderUser>
        <WrapperStyleContent>
        <div style={{flex:1,display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#fff'}}>
            <div style={{width: '670px'}}>Sản phẩm</div>
            <WrapperItemLabel>Giá</WrapperItemLabel>
            <WrapperItemLabel>Số lượng</WrapperItemLabel>
            <WrapperItemLabel>Giảm giá</WrapperItemLabel>
        </div>
        {data?.orderItems?.map((order) => {
            return (
            <WrapperProduct>
                <WrapperNameProduct>
                <img src={order?.image} 
                    style={{
                    width: '70px', 
                    height: '70px', 
                    objectFit: 'cover',
                    border: '1px solid rgb(238, 238, 238)',
                    padding: '2px'
                    }}
                />
                <div style={{
                    width: 260,
                    overflow: 'hidden',
                    textOverflow:'ellipsis',
                    whiteSpace:'nowrap',
                    marginLeft: '10px',
                    height: '70px',
                }}>{order?.name}</div>
                </WrapperNameProduct>
                <WrapperItem>{convertPrice(order?.price)}</WrapperItem>
                <WrapperItem>{order?.amount}</WrapperItem>
                <WrapperItem>{ order?.discount ? `${order?.discount}%` : '0%'}</WrapperItem>
                
                
            </WrapperProduct>
            )
        })}
        
        <WrapperAllPrice style={{ borderTop: '2px solid #fff', paddingTop: '20px' }}>
            <WrapperItemLabel>Tạm tính</WrapperItemLabel>
            <WrapperItem>
                {convertPrice(priceMemo)}
            </WrapperItem>
        </WrapperAllPrice>
        <WrapperAllPrice>
            <WrapperItemLabel>Phí vận chuyển</WrapperItemLabel>
            <WrapperItem>
                {convertPrice(data?.shippingPrice)}
            </WrapperItem>
        </WrapperAllPrice>
        <WrapperAllPrice>
            <WrapperItemLabel>Tổng cộng</WrapperItemLabel>
            <WrapperItem><WrapperItem>
                {convertPrice(data?.totalPrice)}
            </WrapperItem></WrapperItem>
        </WrapperAllPrice>
        </WrapperStyleContent>
    </Wrapper>
    </LoadingComponent>
  )
}

export default DetailsOrderPage