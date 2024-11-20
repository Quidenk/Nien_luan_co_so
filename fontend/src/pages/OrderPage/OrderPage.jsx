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
  ShippingCharge,
  Wrapper,
  WrapperBreadcrumbStyle,
  WrapperInfo,
  WrapperStyleHeaderDilivery,
  WrapperTotal,
} from './style';
import { Col, Form, Input, InputNumber, message, Row, Select } from 'antd';
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
import StepComponent from '../../components/StepComponent/StepComponent';

const OrderPage = () => {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const [listChecked, setListChecked] = useState([])
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)
  const [stateUserDetails, setStateUserDetails] = useState({
    name: '',
    phone: '',
    address: '',
    city: ''
  })
  const navigate = useNavigate()
  const [form] = Form.useForm();

  const handleRemoveItem = (productId) => {
    // dispatch(removeOrderProduct({ idProduct: productId }));
  };

  const handleChangeCount = (value, id) => {
    dispatch(updateAmount({idProduct: id, numOrder: value}))
  };

  const handleDeleteOrder = (idProduct) => {
    dispatch(removeOrderProduct({idProduct}))
  }

  const handleOnchangeCheckAll = (e) => {
    if(e.target.checked) {
      const newListChecked = []
      order?.orderItems?.forEach((item) => {
        newListChecked.push(item?.product)
      })
      setListChecked(newListChecked)
    }else {
      setListChecked([])
    }
  }
  
  const onChange = (e) => {
    if(listChecked.includes(e.target.value)){
      const newListChecked = listChecked.filter((item) => item !== e.target.value)
      setListChecked(newListChecked)
    }else {
      setListChecked([...listChecked, e.target.value])
    }
  };
  
  // console.log('listChecked', listChecked)

  const handleChange = () => {

  }

  useEffect(() => {
    dispatch(selectedOrder({listChecked}))
  },[listChecked])

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

  const handleRemoveAllOrder = () => {
    if(listChecked?.length > 1){
      dispatch(removeAllOrderProduct({listChecked}))
    }
  }

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
    if(priceMemo >= 200000 && priceMemo < 500000){
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

  const handleAddCard = () => {
    if(!order?.orderItemsSlected?.length) {
      message.error('Vui lòng chọn sản phẩm')
    }else if(!user?.phone || !user.address || !user.name || !user.city) {
      setIsOpenModalUpdateInfo(true)
    }
    else {
      console.log('ccccccccccccccccc: ', listChecked)
      navigate('/payment')
    } 
  }

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

  const {isPending: isLoading, data} = mutationUpdate

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

  const itemsDelivery = [
    {
      title: '20.000 VND',
      description: 'Dưới 200.000 VND',
    },
    {
      title: '10.000 VND',
      description: 'Từ 200.000 VND đến dưới 500.000 VND',
    },
    {
      title: 'Free ship',
      description : 'Trên 500.000 VND',
    },
  ]

  // useEffect(() => {
  //   const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id) 
  //   if((orderRedux?.amount + numProduct) <= orderRedux?.countInstock || (!orderRedux && productDetails?.countInStock > 0)) {
  //       setErrorLimitOrder(false)
  //   } else if(productDetails?.countInStock === 0){
  //       setErrorLimitOrder(true)
  //   }
  // },[numProduct])

  return (
    <div style={{ height: '100vh', display: 'flex', gap: '3%'}}>
        <Wrapper >
          <ShippingCharge>
            <span style={{ fontSize: '20px', marginBottom: '10px' }}>PHÍ GIAO HÀNG</span>
            <WrapperStyleHeaderDilivery  style={{ width: '90%', marginTop: '10px'  }} >
              <StepComponent items={itemsDelivery} current={diliveryPriceMemo === 10000 
                ? 2 : diliveryPriceMemo === 20000 ? 1 
                : order.orderItemsSlected.length === 0 ? 0:  3}/>
            </WrapperStyleHeaderDilivery>
          </ShippingCharge>

          <AllSelect style={{display: 'inline-block'}}>
            <CustomCheckbox 
              onChange={handleOnchangeCheckAll} 
              checked={listChecked?.length === order?.orderItems?.length && order?.orderItems?.length>0}
            ></CustomCheckbox>
            <span> Tất cả ({order?.orderItems?.length} sản phẩm)</span>
            <div 
              style={{  position: 'absolute', 
                        right: '20px', 
                        top: '50%', 
                        transform: 'translateY(-50%)', 
                        cursor: 'pointer',
                      }} 
            >
              <DeleteOutlined 
                onClick={() => handleRemoveAllOrder()}
              />
            </div>
          </AllSelect>
          {order?.orderItems?.map((order) => {
            return (
              <OrderProduct>
                <Row>
                  <Col span={7}>
                    <img
                        src={order?.image || "default-avatar-url.png"}
                        alt="Product Image"
                        style={{
                          width: '100%',
                          height: '170px',
                          borderRadius: '̀5px',
                          objectFit: 'cover',
                          border: '1px solid rgb(238, 238, 238)',
                          padding: '2px'
                        }}
                    />
                  </Col>
                  <Col span={11} style={{ display: 'flex', flexDirection: 'column', gap: '30px', padding: '10px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px'}}>
                      <NameProduct>{order?.name || 'quý anh trần đẹp trai'}</NameProduct>
                      <RateProduct>
                        <span>Giá: {order?.rating}</span>
                      </RateProduct>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', gap: '50px'}}>
                      <OptionSelect>
                        <span> Kích thước </span>
                        <Select
                          defaultValue=""
                          style={{ width: 120 }}
                          onChange={handleChange}
                          options={[
                            { value: 'jack', label: 'Jack' },
                            { value: 'lucy', label: 'Lucy' },
                            { value: 'Yiminghe', label: 'yiminghe' },
                          ]}
                        />
                      </OptionSelect>

                      <OptionSelect>
                        <span> Số lượng </span>
                          <InputNumber min={1} max={order?.countInStock} defaultValue={(order?.amount)} onChange={(value) => handleChangeCount(value, order?.product)} />
                      </OptionSelect>
                    </div>
                  </Col>
                  <Col span={6} style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '10px 5px'}}>
                      <CustomCheckbox 
                        onChange={onChange} 
                        value={order?.product} 
                        style={{ alignSelf: 'flex-end', marginRight: '20px' }} // Căn phải trong thẻ cha
                        checked={listChecked.includes(order?.product)}
                      />

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px'}}>
                        <PriceProduct>{convertPrice(order?.price * order?.amount)} <span style={{ fontSize: '15px' }}>VND</span></PriceProduct>
                        {/* <span></span> */}
                      </div>

                      <div>
                        <ButtonSale
                          style={{ width: '90%', height: '45px', backgroundColor: '#000'}}
                          // onClick={}
                        >
                          <DeleteOutlined onClick={() => handleDeleteOrder(order?.product)}/>
                        </ButtonSale>
                      </div>
                  </Col>
                </Row>
              </OrderProduct>
            )
          })}
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
            <ButtonComponent
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
          ></ButtonComponent>
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
  );
};

export default OrderPage;
