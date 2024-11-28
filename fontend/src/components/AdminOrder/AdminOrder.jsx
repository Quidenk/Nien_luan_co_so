import React, { useEffect, useState } from 'react'
import { ButtonAntD, WrapperAllPrice, WrapperHeader, WrapperItem, WrapperItemLabel, WrapperNameProduct, WrapperProduct, WrapperStyleContent } from './style'
import TableComponent from '../TableComponent/TableComponent'
import { Button, Form, Input, message, Radio, Space } from 'antd';
import { FileExcelOutlined, SearchOutlined, SnippetsOutlined } from '@ant-design/icons';
import { CancelOrderApi, ConfirmOrderApi, GetAllOrderApi, GetDetailOrderApi, GetOrderApi } from '../../util/orderService';
import { useQuery } from '@tanstack/react-query';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import { FormStyle } from '../AdminUser/style';
import { convertPrice } from '../../utils';
import { useMutationHooks } from '../../hooks/useMutationHook';
import RevenueChart from '../RevenueChart/RevenueChart';
import * as XLSX from 'xlsx'; // Import the xlsx library



const AdminOrder = () => {
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [stateOrderDetails, setStateOrderDetails] = useState({
        idOrder: '',
        idUser: '',
        nameUser: '',
        phone: '',
        address: '',
        city: '',
        orderTtems: [],
        itemsPrice: '',
        shippingPrice: '',
        totalPrice: '',
        createAt: '',
        status: 1,
    })

    const [form] = Form.useForm();

    const GetALLOrder = async() => {
        const res = await GetAllOrderApi();
        return res
    }

    const fetchGetDetailsOrder = async (rowSelected) => {
        const res = await GetDetailOrderApi(rowSelected)
        console.log('res', res)
        if (res) {
          setStateOrderDetails({
            idOrder: res?.data?._id,
            idUser: res?.data?.user,
            nameUser: res?.data?.shippingAddress?.fullName,
            phone: res?.data?.shippingAddress?.phone,
            address: res?.data?.shippingAddress?.address,
            city: res?.data?.shippingAddress?.city,
            orderTtems: res?.data?.orderItems,
            itemsPrice: res?.data?.itemsPrice,
            shippingPrice: res?.data?.shippingPrice,
            totalPrice: res?.data?.totalPrice,
            createAt: res?.data?.createdAt,
            status: res?.data?.status,
          })
        }
        // setIsLoadingOrder(false)
    }

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
        //   setIsLoadingUpdate(true)
          fetchGetDetailsOrder(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    const queryOrder = useQuery({
        queryKey: ['order'], // Khóa để xác định query
        queryFn: GetALLOrder, // Hàm gọi API
    })

    const { isPending : isLoadingOrder, data : order} = queryOrder

    console.log('data', order)

    const handleDetailsProduct = () => {
        setIsOpenDrawer(true)
    }

    const renderAction = () => {
        return (
            <div>
                <SnippetsOutlined style={{ color: 'orange', fontSize: '25px', cursor: 'pointer'}} onClick={handleDetailsProduct}/>
            </div>
        )
    }
    // const getColumnSearchProps = (dataIndex) => ({
    //     filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
    //       <div
    //         style={{
    //           padding: 8,
    //         }}
    //         onKeyDown={(e) => e.stopPropagation()}
    //       >
    //         <Input
    //           ref={searchInput}
    //           placeholder={`Search ${dataIndex}`}
    //           value={selectedKeys[0]}
    //           onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
    //           onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
    //           style={{
    //             marginBottom: 8,
    //             display: 'block',
    //           }}
    //         />
    //         <Space>
    //           <Button
    //             type="primary"
    //             onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
    //             icon={<SearchOutlined />}
    //             size="small"
    //             style={{
    //               width: 90,
    //             }}
    //           >
    //             Search
    //           </Button>
    //           <Button
    //             onClick={() => clearFilters && handleReset(clearFilters)}
    //             size="small"
    //             style={{
    //               width: 90,
    //             }}
    //           >
    //             Reset
    //           </Button>
              
    //         </Space>
    //       </div>
    //     ),
    //     filterIcon: (filtered) => (
    //       <SearchOutlined
    //         style={{
    //           color: filtered ? '#1677ff' : undefined,
    //         }}
    //       />
    //     ),
    //     onFilter: (value, record) =>
    //       record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    //     onFilterDropdownOpenChange: (visible) => {
    //       if (visible) {
    //         setTimeout(() => searchInput.current?.select(), 100);
    //       }
    //     },
    //     // render: (text) =>
    //     //   searchedColumn === dataIndex ? (
    //     //     <Highlighter
    //     //       highlightStyle={{
    //     //         backgroundColor: '#ffc069',
    //     //         padding: 0,
    //     //       }}
    //     //       searchWords={[searchText]}
    //     //       autoEscape
    //     //       textToHighlight={text ? text.toString() : ''}
    //     //     />
    //     //   ) : (
    //     //     text
    //     //   ),
    //   });

    const columns = [
        {
          title: 'ID',
          dataIndex: '_id',
        },
        {
          title: 'Name',
          dataIndex: 'name',
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          render: (text) => <a>{text}</a>,
          sorter: (a, b) => a.name.length - b.name.length,
        //   ...getColumnSearchProps('name')
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          sorter: (a, b) => a.address.length - b.address.length,
        //   ...getColumnSearchProps('address')
        },
        {
            title: 'City',
            dataIndex: 'city',
            sorter: (a, b) => a.city.length - b.city.length,
            // ...getColumnSearchProps('city')
        },
        {
            title: 'Status',
            dataIndex: 'status',
            filters:[
                {
                    text: 'Chưa duyệt',
                    value: 1,
                },
                {
                  text: 'Đã hủy',
                  value: 2,
                },
                {
                    text: 'Xác nhận',
                    value: 3,
                },
              ],
            onFilter: (value, record) => record.status === value,
            render: (text) => {
                switch (text) {
                    case 1:
                        return <span>Chưa duyệt</span>;
                    case 2:
                        return <span>Đã hủy</span>;
                    default:
                        return <span>Xác nhận</span>;
                }},
            defaultFilteredValue: [1], // Giá trị lọc mặc định là 1
            // ...getColumnSearchProps('city')
        },
        {
          title: 'Action',
          dataIndex: 'Action',
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          render: renderAction,
        },
    ];
    const dataTable = order?.data?.length
        ? order.data.map((order) => ({
                _id: order._id,
                name: order.shippingAddress?.fullName || 'N/A',
                address: order.shippingAddress?.address || 'N/A',
                status: order.status || 'N/A',
                phone: order.shippingAddress?.phone || 'N/A',
                city: order.shippingAddress?.city || 'N/A',
            }))
        : [];

    console.log('stateOrderDetails', stateOrderDetails)

    
    const mutation = useMutationHooks(
        (data) => {
          const { id, orderItems, userId } = data
          const res = CancelOrderApi(id ,orderItems, userId)
          return res
        }
      )
    
      const handleCanceOrder = (order) => {
        mutation.mutate({id : order.idOrder, orderItems: order?.orderTtems, userId: order?.idUser}, {
          onSuccess: () => {
            queryOrder.refetch()
          },
        })
      }
      const { isLoading: isLoadingCancel, isSuccess: isSuccessCancel, isError: isErrorCancle, data: dataCancel } = mutation
    
      useEffect(() => {
        if (isSuccessCancel && dataCancel?.status === 'OK') {
          message.success("Đơn hàng đã hủy thành công!")
          setIsOpenDrawer(false)
        } else if(isSuccessCancel && dataCancel?.status === 'ERR') {
          message.error(dataCancel?.message)
        }else if (isErrorCancle) {
          message.error("Hủy đơn hàng thất bại!")
        }
      }, [isErrorCancle, isSuccessCancel])


      const mutationConfirm = useMutationHooks(
        (data) => {
          const { id, orderItems, userId } = data
          const res = ConfirmOrderApi(id ,orderItems, userId)
          return res
        }
      )
    
      const handleConfirmOrder = (order) => {
        mutationConfirm.mutate({id : order.idOrder, orderItems: order?.orderTtems, userId: order?.idUser}, {
          onSuccess: () => {
            queryOrder.refetch()
          },
        })
      }
      const { isLoading: isLoadingConfirm, isSuccess: isSuccessConfirm, isError: isErrorConfirm, data: dataConfirm } = mutationConfirm
    
      useEffect(() => {
        if (isSuccessConfirm && dataConfirm?.status === 'OK') {
          message.success("Đơn hàng đã xác nhận thành công!")
          setIsOpenDrawer(false)
        } else if(isSuccessConfirm && dataConfirm?.status === 'ERR') {
          message.error(dataConfirm?.message)
        }else if (isErrorConfirm) {
          message.error("Xác nhận đơn hàng thất bại!")
        }
      }, [isErrorConfirm, isSuccessConfirm])

    return (
        <WrapperHeader>
            <h2 style={{ display: 'flex', justifyContent: 'center', color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: '30px' }} >
                QUẢN LÝ ĐƠN HÀNG
            </h2>

            <div style={{ marginTop: '20px' }}>
                <TableComponent columns={columns} isloading={isLoadingOrder} data={dataTable} onRow={(record, rowIndex) =>{
                    return {
                        onClick: event => {
                            setRowSelected(record._id)
                        }
                    }
                }}/>
            </div>


            <DrawerComponent title='Chi tiết đơn hàng' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="50%">
                {/* <LoadingComponent isLoading={}> */}

                <FormStyle
                    name="basic"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 19 }}
                    // onFinish={onUpdateUser}
                    autoComplete="on"
                    form={form}
                >
                    <Form.Item
                    label="ID_Order"
                    name="idOrder"
                    rules={[{ required: true, message: 'Please input your id order!' }]}
                    >
                        <span style={{ color: '#fff', fontWeight: '600'}}>{stateOrderDetails.idOrder}</span>
                    {/* <Input style={{ color: '#fff', fontWeight: '600'}} disabled={true} value={stateOrderDetails.idOrder} name="idOrder" /> */}
                    </Form.Item>

                    <Form.Item
                        label="ID_User"
                        name="idUser"
                        rules={[{ required: true, message: 'Please input your id user!' }]}
                    >
                        <span style={{ color: '#fff', fontWeight: '600'}}>{stateOrderDetails.idUser}</span>
                    {/* <Input style={{ color: '#fff', fontWeight: '600'}} disabled={true} value={stateOrderDetails.idUser} name="idUser" /> */}
                    </Form.Item>

                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your id user!' }]}
                    >
                        <span style={{ color: '#fff', fontWeight: '600'}}>{stateOrderDetails.nameUser}</span>
                    {/* <Input style={{ color: '#fff', fontWeight: '600'}} disabled={true} value={stateOrderDetails.idUser} name="idUser" /> */}
                    </Form.Item>

                    <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[{ required: true, message: 'Please input your  phone!' }]}
                    >
                        <span style={{ color: '#fff', fontWeight: '600'}}>{stateOrderDetails.phone}</span>
                    {/* <Input style={{ color: '#fff', fontWeight: '600'}} disabled={true} value={stateOrderDetails.phone} name="phone" /> */}
                    </Form.Item>

                    <Form.Item
                    label="Address"
                    name="address"
                    rules={[{ required: true, message: 'Please input your  address!' }]}
                    >
                        <span style={{ color: '#fff', fontWeight: '600'}}>{stateOrderDetails.address}</span>
                    {/* <Input style={{ color: '#fff', fontWeight: '600'}} disabled={true} value={stateOrderDetails.address} name="address" /> */}
                    </Form.Item>

                    <Form.Item
                    label="City"
                    name="city"
                    rules={[{ required: true, message: 'Please input your  address!' }]}
                    >
                        <span style={{ color: '#fff', fontWeight: '600'}}>{stateOrderDetails.city}</span>

                    {/* <Input style={{ color: '#fff', fontWeight: '600'}} disabled={true} value={stateOrderDetails.city} name="city" /> */}
                    </Form.Item>

                    <WrapperStyleContent>
                        <div style={{flex:1,display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#fff'}}>
                            <div style={{width: '670px'}}>Sản phẩm</div>
                            <WrapperItemLabel>Giá</WrapperItemLabel>
                            <WrapperItemLabel>Kích thước</WrapperItemLabel>
                            <WrapperItemLabel>Số lượng</WrapperItemLabel>
                            <WrapperItemLabel>Giảm giá</WrapperItemLabel>
                        </div>
                        {stateOrderDetails?.orderTtems?.map((order) => {
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
                                    width: '100%',
                                    overflow: 'hidden',
                                    textOverflow:'ellipsis',
                                    whiteSpace:'nowrap',
                                    marginLeft: '10px',
                                    height: '70px',
                                }}>{order?.name}</div>
                                </WrapperNameProduct>
                                <WrapperItem>{convertPrice(order?.price)}</WrapperItem>
                                <WrapperItem>{order?.sizeSelected}</WrapperItem>
                                <WrapperItem>{order?.amount}</WrapperItem>
                                <WrapperItem>{ order?.discount ? `${order?.discount}%` : '0%'}</WrapperItem>
                                
                                
                            </WrapperProduct>
                            )
                        })}
                        
                        <WrapperAllPrice style={{ borderTop: '2px solid #fff', paddingTop: '20px' }}>
                            <WrapperItemLabel>Tạm tính</WrapperItemLabel>
                            <WrapperItem>
                                {convertPrice(stateOrderDetails?.itemsPrice)}
                            </WrapperItem>
                        </WrapperAllPrice>
                        <WrapperAllPrice>
                            <WrapperItemLabel>Phí vận chuyển</WrapperItemLabel>
                            <WrapperItem>
                                {convertPrice(stateOrderDetails?.shippingPrice)}
                            </WrapperItem>
                        </WrapperAllPrice>
                        <WrapperAllPrice>
                            <WrapperItemLabel>Tổng cộng</WrapperItemLabel>
                            <WrapperItem><WrapperItem>
                                {convertPrice(stateOrderDetails?.totalPrice)}
                            </WrapperItem></WrapperItem>
                        </WrapperAllPrice>
                    </WrapperStyleContent>

                    <Form.Item wrapperCol={{ offset: 14, span: 16 }}>
                        <div style={{ display: 'flex', gap: '50px'}}>
                        {stateOrderDetails?.status == 1 ? (
                                <>
                                    <ButtonAntD type="primary" htmlType="submit" onClick={() => handleCanceOrder(stateOrderDetails)}>
                                        Hủy đơn hàng
                                    </ButtonAntD>
                                    <ButtonAntD type="primary" htmlType="submit" onClick={() => handleConfirmOrder(stateOrderDetails)}>
                                        Xác nhận
                                    </ButtonAntD>
                                </>
                            ) : (
                                <>
                                    <button style={{ border: 'none', borderRadius: '4px', padding: '10px', backgroundColor: 'rgb(255, 255, 255, 0.2)', color: 'rgb(0, 0, 0, 0.3)'}} type="primary" htmlType="submit">
                                        Hủy đơn hàng
                                    </button>
                                    <button style={{ border: 'none', borderRadius: '4px', padding: '10px', backgroundColor: 'rgb(255, 255, 255, 0.2)', color: 'rgb(0, 0, 0, 0.3)'}} type="primary" htmlType="submit">
                                        Xác nhận
                                    </button>
                                </>
                        )}

                        </div>
                    </Form.Item>
                </FormStyle>
                {/* </LoadingComponent> */}
            </DrawerComponent>
        </WrapperHeader>
    )
}

export default AdminOrder
