import React from 'react'
import { Lable, WrapperInfo, WrapperContainer, WrapperValue, WrapperCountOrder, WrapperItemOrder, WrapperItemOrderInfo } from './style';
import { useLocation } from 'react-router-dom';
import { orderContant } from '../../contant';
import { convertPrice } from '../../utils';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import { Wrapper } from './style';

const OrderSuccess = () => {
  const location = useLocation()
  const {state} = location
  return (
    <Wrapper>
      <LoadingComponent isLoading={false}>
        <div style={{height: '100%', width: '100%'}}>
          <h3 style={{ color: '#fff', fontSize: '24px', fontWeight: '600' }}>ĐẶC HÀNG THÀNH CÔNG</h3>
          <div style={{ display: 'flex', justifyContent: 'center'}}>
            <WrapperContainer>
              <WrapperInfo>
                <div>
                  <Lable>Phương thức giao hàng</Lable>
                    <WrapperValue>
                      <span style={{color: 'rgb(241, 94, 44)', fontWeight: 'bold'}}>{orderContant.delivery[state?.delivery]}</span> Giao hàng tiết kiệm
                    </WrapperValue>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div>
                  <Lable>Phương thức thanh toán</Lable>
                
                  <WrapperValue>
                    {orderContant.payment[state?.payment]}
                  </WrapperValue>
                </div>
              </WrapperInfo>
              <WrapperItemOrderInfo>
                {state.orders?.map((order) => {
                  return (
                    <WrapperItemOrder key={order?.name}>
                      <div style={{width: '500px', display: 'flex', alignItems: 'center', gap: 4}}> 
                        <img src={order.image} style={{width: '120px', height: '120px', objectFit: 'cover', borderRadius: '4px' , marginRight: '10px'}}/>
                        <div style={{
                            marginTop: '-100px',
                            fontSize: '20px',
                            width: 260,
                            overflow: 'hidden',
                            textOverflow:'ellipsis',
                            whiteSpace:'nowrap'
                        }}>{order?.name}</div>
                      </div>
                      <div style={{flex: 1, display: 'flex', gap: '10px', color: '#fff', fontSize: '15px', marginTop: '100px'}}>
                        <span>
                          <span >Giá tiền: {convertPrice(order?.price)}</span>
                        </span>
                        <span>
                          <span >Số lượng: {order?.amount}</span>
                        </span>
                      </div>
                    </WrapperItemOrder>
                  )
                })}
              </WrapperItemOrderInfo>
              <div style={{fontSize: '20px', height: '40px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '20px'}}>
                <span >
                    Cần chuẩn bị trước:
                </span>
                <span style={{ color: 'rgb(241, 94, 44)', fontWeight: '900', fontSize: '25px'}}>
                    {convertPrice(state?.totalPriceMemo)}
                    <span style={{ marginLeft: '10px',color: 'rgb(241, 94, 44)', fontWeight: '900', fontSize: '18px'}}>VND</span>
                </span>
              </div>
            </WrapperContainer>
          </div>
        </div>
      </LoadingComponent>
    </Wrapper>
  )
}

export default OrderSuccess