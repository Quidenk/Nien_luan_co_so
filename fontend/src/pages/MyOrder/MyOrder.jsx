import React,{ useEffect } from 'react'
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { convertPrice } from '../../utils';
import { WrapperItemOrder, WrapperListOrder, WrapperHeaderItem, WrapperFooterItem, WrapperContainer, WrapperStatus, Wrapper, Lable, WrapperLabel } from './style';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMutationHooks } from '../../hooks/useMutationHook';
import { CancelOrderApi, GetOrderApi } from '../../util/orderService';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import { message } from 'antd';

const MyOrderPage = () => {
  const location = useLocation()
  const { state } = location
  const navigate = useNavigate()
  // const params = useParams()
  // const id = params
  
  // const fetchMyOrder = async () => {
  //   const res = await GetOrderApi(state?.id)
  //   return res.data
  // }
  const user = useSelector((state) => state.user)

  // const queryOrder = useQuery({ queryKey: ['orders'], queryFn: fetchMyOrder }, {
  //   enabled: state?.id && state?.token
  // })
  // const { isLoading, data } = queryOrder

    const fetchDetailsOrder = async () => {
        const res = await GetOrderApi(state?.id);
        return res.data;
    };

    const queryOrder = useQuery({
        queryKey: ['orders-details', state?.id], // Truyền `id` vào `queryKey` để phân biệt từng truy vấn theo `id`
        queryFn: fetchDetailsOrder,
        enabled: !!state?.id, // Kiểm tra `id` có tồn tại, chỉ thực hiện khi `id` có giá trị
    });

    const { isPending:isLoading, data } = queryOrder;

    const handleDetailsOrder = (id) => {
      navigate(`/details-order/${id}`)
    }

  const mutation = useMutationHooks(
    (data) => {
      const { id, orderItems, userId } = data
      const res = CancelOrderApi(id ,orderItems, userId)
      return res
    }
  )

  const handleCanceOrder = (order) => {
    mutation.mutate({id : order._id, token:state?.token, orderItems: order?.orderItems, userId: user.id }, {
      onSuccess: () => {
        queryOrder.refetch()
      },
    })
  }
  const { isLoading: isLoadingCancel, isSuccess: isSuccessCancel, isError: isErrorCancle, data: dataCancel } = mutation

  useEffect(() => {
    if (isSuccessCancel && dataCancel?.status === 'OK') {
      message.success("Đơn hàng đã hủy thành công!")
    } else if(isSuccessCancel && dataCancel?.status === 'ERR') {
      message.error(dataCancel?.message)
    }else if (isErrorCancle) {
      message.error("Hủy đơn hàng thất bại!")
    }
  }, [isErrorCancle, isSuccessCancel])

  const renderProduct = (data) => {
    return data?.map((order) => {
      return <WrapperHeaderItem key={order?._id}> 
              <img src={order?.image} 
                style={{
                  width: '70px', 
                  height: '70px', 
                  objectFit: 'cover',
                  border: '1px solid #fff',
                  padding: '2px',
                  fontSize: '17px'
                }}
              />
              <div style={{
                width: 260,
                overflow: 'hidden',
                textOverflow:'ellipsis',
                whiteSpace:'nowrap',
                marginLeft: '10px',
                color: '#fff',
                fontSize: '17px'
              }}>{order?.name}</div>
              <span style={{ fontSize: '13px', color: '#fff',marginLeft: 'auto' }}>{convertPrice(order?.price)}</span>
            </WrapperHeaderItem>
          })
  }

  return (
    <LoadingComponent isLoading={isLoading}>
      <Wrapper>
        <div style={{height: '100%', width: '1270px', margin: '0 auto'}}>
          <Lable>ĐƠN HÀNG CỦA TÔI</Lable>
          <WrapperListOrder>
            {data?.map((order) => {
              return (
                <WrapperItemOrder key={order?._id}>
                  <WrapperStatus>
                    <WrapperLabel style={{ color: '#fff'}}>Trạng thái</WrapperLabel>
                    <div>
                      <span style={{color: '#fff'}}>Giao hàng: </span>
                      <span style={{color: '#f15e2c', fontWeight: 'bold'}}>{`${order.isDelivered ? 'Đã giao hàng': 'Chưa giao hàng'}`}</span>
                    </div>
                    <div>
                      <span style={{color: '#fff'}}>Thanh toán: </span>
                      <span style={{color: '#f15e2c', fontWeight: 'bold'}}>{`${order.isPaid ? 'Đã thanh toán': 'Chưa thanh toán'}`}</span>
                    </div>
                  </WrapperStatus>
                  {renderProduct(order?.orderItems)}
                  <WrapperFooterItem>
                    <div>
                      <span style={{color: '#fff'}}>Tổng tiền: </span>
                      <span 
                        style={{ fontSize: '20px', color: '#f15e2c',fontWeight: 700 }}
                      >{convertPrice(order?.totalPrice)}</span>
                    </div>
                    <div style={{display: 'flex', gap: '10px'}}>
                      {order?.status == 1 ? (
                            <>
                                      <ButtonComponent
                              onClick={() => handleCanceOrder(order)}
                              size={40}
                              styleButton={{
                                  height: '36px',
                                  border: '1px solid #f15e2c',
                                  borderRadius: '4px',
                                  background: '#f15e2c',
                              }}
                              textbutton={'Hủy đơn hàng'}
                              styleTextButton={{ color: '#fff', fontSize: '14px' }}
                            >
                            </ButtonComponent>
                            </>
                        ) : (
                            <>
                                <button style={{ border: 'none', borderRadius: '4px', padding: '10px', backgroundColor: 'rgb(255, 255, 255, 0.2)', color: 'rgb(0, 0, 0, 0.3)'}} type="primary" htmlType="submit">
                                    Đơn hàng đã được xác nhận
                                </button>
                            </>
                        )}

                        <ButtonComponent
                              onClick={() => handleDetailsOrder(order?._id)}
                              size={40}
                              styleButton={{
                                  height: '36px',
                                  border: '1px solid #f15e2c',
                                  borderRadius: '4px'
                              }}
                              textbutton={'Xem chi tiết'}
                              styleTextButton={{ color: '#f15e2c', fontSize: '14px' }}
                            >
                          </ButtonComponent>
                    </div>
                  </WrapperFooterItem>
                </WrapperItemOrder>
              )
            })}
          </WrapperListOrder>
          </div>
      </Wrapper>
    </LoadingComponent>
  )
}

export default MyOrderPage