import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  AllSelect,
  BreadcrumbStyle,
  ButtonSale,
  CustomCheckbox,
  DivPrice,
  NameProduct,
  OptionSelect,
  OrderDiv,
  OrderProduct,
  PriceProduct,
  RateProduct,
  Wrapper,
  WrapperBreadcrumbStyle,
  WrapperInfo,
  WrapperTotal,
} from './style';
import { Col, Form, Input, InputNumber, message, Radio, Row, Select } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useLocation, useNavigate } from 'react-router';
import { removeAllOrderProduct, removeOrderProduct, selectedOrder, updateAmount } from '../../redux/slides/orderSlide';
import { convertPrice } from '../../utils';
import { useMutationHooks } from '../../hooks/useMutationHook';
import { UpdataUserApi } from '../../util/api';
import ModelComponent from '../../components/ModalComponent/ModelComponent';
import { updateUser } from '../../redux/slides/userSlide';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import { PaymentMethod } from './style';
import { Lable } from './style';
import { WrapperRadio } from './style';
import { RadioStype } from './style';
import { CreateOrder } from '../../util/orderService';

const PaymentPage = () => {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)
  const [delivery, setDelivery] = useState('fast')
  const [payment, setPayment] = useState('later_money')
  const [sdkReady , setSdkReady] = useState(false)
  const [stateUserDetails, setStateUserDetails] = useState({
    name: '',
    phone: '',
    address: '',
    city: ''
  })
  const navigate = useNavigate()
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(stateUserDetails)
  }, [form, stateUserDetails])

  useEffect(() => {
    if(isOpenModalUpdateInfo) {
      setStateUserDetails({
        city: user?.city,
        name: user?.name,
        address: user?.address,
        phone: user?.phone
      })
    }
  }, [isOpenModalUpdateInfo])

  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSlected?.reduce((total, cur) => {
      return total + ((cur.price * cur.amount))
    },0)
    return result
  },[order])

  const priceDiscountMemo = useMemo(() => {
    const result = order?.orderItemsSlected?.reduce((total, cur) => {
      const totalDiscount = cur.discount ? cur.discount : 0
      // return total + (priceMemo * (totalDiscount  * cur.amount) / 100)
      return total + (cur.price * cur.amount * (totalDiscount/ 100))
      // return total + (priceMemo * (100-totalDiscount)/100 *cur.amount)
    },0)
    if(Number(result)){
      return result
    }
    return 0
  },[order])

  const diliveryPriceMemo = useMemo(() => {
    if(priceMemo >= 20000 && priceMemo < 500000){
      return 10000
    }else if(priceMemo >= 500000 || order?.orderItemsSlected?.length === 0) {
      return 0
    } else {
      return 20000
    }
  },[priceMemo])

  const totalPriceMemo = useMemo(() => {
    return Number(priceMemo) - Number(priceDiscountMemo) + Number(diliveryPriceMemo)
  },[priceMemo,priceDiscountMemo, diliveryPriceMemo])

  const handleAddOrder = () => {
    if(user?.access_token && order?.orderItemsSlected && user?.name && user?.address && user?.phone && user?.city && priceMemo && user?.id) {
        // eslint-disable-next-line no-unused-expressions
        const temp = { 
                token: user?.access_token, 
                orderItems: order?.orderItemsSlected, 
                fullName: user?.name,
                address:user?.address, 
                phone:user?.phone,
                city: user?.city,
                paymentMethod: payment,
                itemsPrice: priceMemo,
                shippingPrice: diliveryPriceMemo,
                totalPrice: totalPriceMemo,
                user: user?.id,
                email: user?.email
        }
        // console.log('temp: ', temp)
        mutationAddOrder.mutate(temp)
      }
  }

//   const handleAddCard = () => {
//     if(!order?.orderItemsSlected?.length) {
//       message.error('Vui lòng chọn sản phẩm')
//     }else if(!user?.phone || !user.address || !user.name || !user.city) {
//       setIsOpenModalUpdateInfo(true)
//     }
//     // else {
//     //   navigate('/payment')
//     // } 
//   }

  const mutationUpdate = useMutationHooks(
    (data) => {
      const { id,
        ...rests } = data
      const res = UpdataUserApi(
        id,
        { ...rests })
      return res
    },
  )

  const mutationAddOrder = useMutationHooks(
    (data) => {
      const {
        ...rests } = data
      const res = CreateOrder(
        { ...rests })
      return res
    },
  )

  const {isPending: isLoading, data} = mutationUpdate
  const {data: dataAdd, isPending: isLoadingAddOrder, isSuccess, isError} = mutationAddOrder

  useEffect(() => {
    if (isSuccess && dataAdd?.status === 'OK') {
      const arrayOrdered = []
      order?.orderItemsSlected?.forEach(element => {
        arrayOrdered.push(element.product)
      });
      dispatch(removeAllOrderProduct({listChecked: arrayOrdered}))
      message.success('Đặt hàng thành công')
      navigate('/order-success', {
        state: {
          delivery,
          payment,
          orders: order?.orderItemsSlected,
          totalPriceMemo: totalPriceMemo
        }
      })
    } else if (isError) {
      message.error()
    }
  }, [isSuccess,isError])

  const handleCancleUpdate = () => {
    setStateUserDetails({
      name: '',
      email: '',
      phone: '',
      isAdmin: false,
    })
    form.resetFields()
    setIsOpenModalUpdateInfo(false)
  }

  const handleUpdateInforUser = () => {
    const {name, address,city, phone} = stateUserDetails
    if(name && address && city && phone){
      mutationUpdate.mutate({ id: user?.id, token: user?.access_token, ...stateUserDetails }, {
        onSuccess: () => {
          dispatch(updateUser({name, address,city, phone}))
          setIsOpenModalUpdateInfo(false)
        }
      })
    }
  }

  const handleOnchangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value
    })
  }

  const handleChangeAddress = () => {
    setIsOpenModalUpdateInfo(true)
  }

  const handleDilivery = (e) => {
    setDelivery(e.target.value)
  }

  const handlePayment = (e) => {
    setPayment(e.target.value)
  }

//   const addPaypalScript = async () => {
//     const { data } = await PaymentService.getConfig()
//     const script = document.createElement('script')
//     script.type = 'text/javascript'
//     script.src = `https://www.paypal.com/sdk/js?client-id=${data}`
//     script.async = true;
//     script.onload = () => {
//       setSdkReady(true)
//     }
//     document.body.appendChild(script)
//   }


  return (
    <LoadingComponent isLoading={isLoadingAddOrder}>
        <div style={{ height: '100vh', display: 'flex', gap: '3%'}}>
            <Wrapper >
                <PaymentMethod>
                <div>
                    <div>
                    <Lable>
                        <span >
                            CHỌN PHƯƠNG THỨC GIAO HÀNG
                        </span>
                    </Lable>
                    <WrapperRadio 
                        onChange={handleDilivery} 
                        value={delivery}
                    > 
                        <RadioStype  value="fast"><span style={{color: 'rgb(241, 94, 44)', fontWeight: 'bold'}}>FAST</span> Giao hàng tiết kiệm</RadioStype>
                        <RadioStype  value="gojek"><span style={{color: 'rgb(241, 94, 44)', fontWeight: 'bold'}}>GO_JEK</span> Giao hàng tiết kiệm</RadioStype>
                    </WrapperRadio>
                    </div>
                </div>
                <div>
                    <div>
                    <Lable>CHỌN PHƯƠNG THỨC THANH TOÁN</Lable>
                    <WrapperRadio 
                        onChange={handlePayment} 
                        value={payment}
                    > 
                        <RadioStype value="later_money"> Thanh toán tiền mặt khi nhận hàng</RadioStype>
                        <RadioStype value="paypal"> Thanh toán tiền bằng paypal</RadioStype>
                    </WrapperRadio>
                    </div>
                </div>
                </PaymentMethod>
            </Wrapper>

            <OrderDiv>
            <div style={{width: '100%'}}>
                <shippingAddress>
                    <div>
                    <span>Địa chỉ: </span>
                    <span style={{fontWeight: 'bold', color: 'rgb(241, 94, 44)'}}>{ `${user?.address}, ${user?.city}`} </span>
                    <span 
                        onClick={handleChangeAddress} 
                        style={{color: 'rgb(241, 94, 44)', borderBottom: '1px solid rgb(241, 94, 44)' , cursor:'pointer', position: 'absolute', right: '25px',}}
                    >
                        Thay đổi
                    </span>
                    </div>
                </shippingAddress>

                <WrapperInfo>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <span>Tạm tính</span>
                    <span style={{color: '#000', fontSize: '14px', fontWeight: 'bold'}}>
                        {convertPrice(priceMemo)}
                    </span>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <span>Số tiền được giảm</span>
                    <span style={{color: '#000', fontSize: '14px', fontWeight: 'bold'}}>
                        {convertPrice(priceDiscountMemo) || 50000}
                    </span>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <span>Phí giao hàng</span>
                    <span style={{color: '#000', fontSize: '14px', fontWeight: 'bold'}}>
                        {convertPrice(diliveryPriceMemo) || 500000}
                    </span>
                    </div>
                </WrapperInfo>
                <WrapperTotal>
                    <span>Tổng tiền</span>
                    <span style={{display:'flex', flexDirection: 'column'}}>
                    <span style={{color: 'rgb(241, 94, 44)', fontSize: '24px', fontWeight: 'bold'}}>
                        {convertPrice(totalPriceMemo) || 500000}
                    </span>
                    <span style={{ fontSize: '11px'}}>(Đã bao gồm VAT nếu có)</span>
                    </span>
                </WrapperTotal>
                </div>
                {payment === 'paypal' && sdkReady ? (
                    <div style={{width: '320px'}}>
                    {/* <PayPalButton
                        amount={Math.round(totalPriceMemo / 30000)}
                        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                        onSuccess={onSuccessPaypal}
                        onError={() => {
                        alert('Erroe')
                        }}
                    /> */}
                    </div>
                ) : (
                    <ButtonComponent
                    onClick={() => handleAddOrder()}
                    size={40}
                    styleButton={{
                        background: 'rgb(241, 94, 44)',
                        height: '48px',
                        width: '100%',
                        border: 'none',
                        borderRadius: '4px'
                    }}
                    textbutton={'Đặt hàng'}
                    styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                ></ButtonComponent>
                )}
                {/* <ButtonComponent
                onClick={() => handleAddCard()}
                size={40}
                styleButton={{
                    background: 'rgb(241, 94, 44)',
                    height: '48px',
                    width: '100%',
                    border: 'none',
                    borderRadius: '4px'
                }}
                textbutton={'Mua hàng'}
                styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
            ></ButtonComponent> */}
            </OrderDiv>

            <ModelComponent title="Cập nhật thông tin giao hàng" open={isOpenModalUpdateInfo} onCancel={handleCancleUpdate} onOk={handleUpdateInforUser}>
            <LoadingComponent isLoading={isLoading}>
                <Form
                name="basic"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                // onFinish={onUpdateUser}
                autoComplete="on"
                form={form}
                >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input value={stateUserDetails['name']} onChange={handleOnchangeDetails} name="name" />
                </Form.Item>
                <Form.Item
                    label="City"
                    name="city"
                    rules={[{ required: true, message: 'Please input your city!' }]}
                >
                    <Input value={stateUserDetails['city']} onChange={handleOnchangeDetails} name="city" />
                </Form.Item>
                <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[{ required: true, message: 'Please input your  phone!' }]}
                >
                    <Input value={stateUserDetails.phone} onChange={handleOnchangeDetails} name="phone" />
                </Form.Item>

                <Form.Item
                    label="Adress"
                    name="address"
                    rules={[{ required: true, message: 'Please input your  address!' }]}
                >
                    <Input value={stateUserDetails.address} onChange={handleOnchangeDetails} name="address" />
                </Form.Item>
                </Form>
            </LoadingComponent>
        </ModelComponent>
        </div>
    </LoadingComponent>
  );
};

export default PaymentPage;
