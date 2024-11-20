import React, { useEffect, useRef, useState } from 'react';
import { ButtonAdd, ButtonAntD, ButtonUpload, WrapperHeader, WrapperUploadFile } from './style';
import TableComponent from '../TableComponent/TableComponent';
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Radio, Space, Upload } from 'antd'; // Thêm Upload
import { getBase64 } from '../../utils';
import { useMutationHooks } from '../../hooks/useMutationHook';
import { CreateProductApi, GetProductApi } from '../../util/productService';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createUserApi, DeleteUserApi, GetAllUserApi, GetProfileUserApi, UpdataUserApi } from '../../util/api';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import ModelComponent from '../ModalComponent/ModelComponent';
import { FormStyle } from '../AdminProduct/style';


const AdminProduct = () => {
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const searchInput = useRef(null);
    const [stateUserDetails, setStateUserDetails] = useState({
        name: '',
        email: '',
        phone: '',
        isAdmin: false,
        avatar: '',
        address: ''
    })

    const [form] = Form.useForm();

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

    const mutationDeleted = useMutationHooks(
        (data) => {
          const { id,
          } = data
          const res = DeleteUserApi(
            id,)
          return res
        },
    )

    const fetchGetDetailsUser = async (rowSelected) => {
        const res = await GetProfileUserApi(rowSelected)
        console.log('res', res[0].email)
        if (res[0]) {
          setStateUserDetails({
            name: res[0]?.name,
            email: res[0]?.email,
            phone: res[0]?.phone,
            isAdmin: res[0]?.isAdmin,
            address: res[0]?.address,
            avatar: res[0]?.avatar
          })
        }
        setIsLoadingUpdate(false)
    }

    const GetALLUser = async() => {
        const res = await GetAllUserApi();
        // console.log('..................',res.result)
        return res
    }

    const queryUser = useQuery({
        queryKey: ['users'], // Khóa để xác định query
        queryFn: GetALLUser, // Hàm gọi API
    })

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
          setIsLoadingUpdate(true)
          fetchGetDetailsUser(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    const {isloading : isLoadingUser, data : users} = queryUser
    const { data: dataDeleted, isPending: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
    const { data: dataUpdated, isPending: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate

    const queryClient = useQueryClient()

    const handleDetailsProduct = () => {
        setIsOpenDrawer(true)
    }

    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '25px', cursor: 'pointer'}} onClick={() => setIsModalOpenDelete(true)}/>
                <EditOutlined style={{ color: 'orange', fontSize: '25px', cursor: 'pointer'}} onClick={handleDetailsProduct}/>
            </div>
        )
    }

    
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        // setSearchText(selectedKeys[0]);
        // setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        // setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
          <div
            style={{
              padding: 8,
            }}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <Input
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{
                marginBottom: 8,
                display: 'block',
              }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Search
              </Button>
              <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Reset
              </Button>
              
            </Space>
          </div>
        ),
        filterIcon: (filtered) => (
          <SearchOutlined
            style={{
              color: filtered ? '#1677ff' : undefined,
            }}
          />
        ),
        onFilter: (value, record) =>
          record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
          if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
        },
        // render: (text) =>
        //   searchedColumn === dataIndex ? (
        //     <Highlighter
        //       highlightStyle={{
        //         backgroundColor: '#ffc069',
        //         padding: 0,
        //       }}
        //       searchWords={[searchText]}
        //       autoEscape
        //       textToHighlight={text ? text.toString() : ''}
        //     />
        //   ) : (
        //     text
        //   ),
      });

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
          ...getColumnSearchProps('name')
        },
        {
          title: 'Email',
          dataIndex: 'email',
          sorter: (a, b) => a.email.length - b.email.length,
          ...getColumnSearchProps('email')
        },
        {
          title: 'Address',
          dataIndex: 'address',
          sorter: (a, b) => a.address.length - b.address.length,
          ...getColumnSearchProps('address')
        },
        {
          title: 'Phone',
          dataIndex: 'phone',
        },
        {
            title: 'Admin',
            dataIndex: 'isAdmin',
            render: (text) => <span>{text? 'admin': ''}</span>,
        },
        {
          title: 'Action',
          dataIndex: 'Action',
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          render: renderAction,
        },
    ];
    const dataTable = users?.UserList?.length && users?.UserList?.map((user) => {
        return {...user, key: user._id}
    })

    useEffect(() => {
        if (isSuccessDelected && dataDeleted?.EC === 0) {
          message.success()
          handleCancelDelete()
        } else if (isErrorDeleted) {
          message.error()
        }
    }, [isSuccessDelected])

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setStateUserDetails({
          name: '',
          email: '',
          phone: '',
          isAdmin: false,
        })
        form.resetFields()
      };

    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.EC === 0) {
          message.success()
          handleCloseDrawer()
        } else if (isErrorUpdated) {
          message.error()
        }
    }, [isSuccessUpdated])

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false)
    }

    console.log('dataUpdated', dataUpdated)

    const handleDeleteUser = () => {
        mutationDeleted.mutate({ id: rowSelected}, {
          onSettled: () => {
            queryClient.invalidateQueries(['users'])
          }
        })
    }

    useEffect(() => {
        form.setFieldsValue(stateUserDetails);
    }, [stateUserDetails, form]);

    const handleOnchangeDetails = (e) => {
        setStateUserDetails({
          ...stateUserDetails,
          [e.target.name]: e.target.value
        })
    }

    const handleOnchangeAvatarDetails = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        setStateUserDetails({
          ...stateUserDetails,
          avatar: file.preview
        })
    }
    
    const onUpdateUser = () => {
        mutationUpdate.mutate({ id: rowSelected, ...stateUserDetails }, {
          onSettled: () => {
            queryClient.invalidateQueries(['users'])
          }
        })
      }

    console.log('stateUserDetails', stateUserDetails)

    return (
        <div>
            <WrapperHeader>
                <h2 style={{ display: 'flex', justifyContent: 'center', color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: '30px' }}>
                    QUẢN LÝ NGƯỜI DÙNG
                </h2>
                <div style={{ marginTop: '20px' }}>
                    <TableComponent columns={columns} isloading={isLoadingUser} data={dataTable} onRow={(record, rowIndex) =>{
                        return {
                            onClick: event => {
                                setRowSelected(record._id)
                            }
                        }
                    }}/>
                </div>

                <DrawerComponent title='Chi tiết người dùng' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="50%">
                    <LoadingComponent isLoading={isLoadingUpdate || isLoadingUpdated}>

                    <FormStyle
                        name="basic"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 19 }}
                        onFinish={onUpdateUser}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                        <Input style={{ color: '#fff', fontWeight: '600'}} disabled={true} value={stateUserDetails.name} onChange={handleOnchangeDetails} name="name" />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                        <Input style={{ color: '#fff', fontWeight: '600'}} disabled={true} value={stateUserDetails.email} onChange={handleOnchangeDetails} name="email" />
                        </Form.Item>

                        <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[{ required: true, message: 'Please input your  phone!' }]}
                        >
                        <Input style={{ color: '#fff', fontWeight: '600'}} disabled={true} value={stateUserDetails.phone} onChange={handleOnchangeDetails} name="phone" />
                        </Form.Item>

                        <Form.Item
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: 'Please input your  address!' }]}
                        >
                        <Input style={{ color: '#fff', fontWeight: '600'}} disabled={true} value={stateUserDetails.address} onChange={handleOnchangeDetails} name="address" />
                        </Form.Item>

                        <Form.Item
                            label="IsAdmin"
                            name="isAdmin"
                            rules={[{ required: true, message: 'Please select if the user is an admin!' }]}
                        >
                            <Radio.Group value={stateUserDetails.isAdmin} onChange={handleOnchangeDetails} name="isAdmin">
                                <Radio value={true}>True</Radio>
                                <Radio value={false}>False</Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item
                        label="Avatar"
                        name="avatar"
                        rules={[{ required: true, message: 'Please input your image!' }]}
                        >
                            <div>
                                <Upload 
                                    listType="picture" 
                                    onChange={handleOnchangeAvatarDetails} 
                                    maxCount={1}
                                    disabled={true}
                                    // fileList={fileList} 
                                >
                                    {/* <Button type="primary">Select file</Button> */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                                        <ButtonUpload >Select File</ButtonUpload>
                                        {stateUserDetails?.avatar && (
                                            <img src={stateUserDetails?.avatar} style={{
                                                height: '150px',
                                                width: '150px',
                                                borderRadius: '30px',
                                                border: '2px solid rgb(241, 94, 44)',
                                                objectFit: 'cover',
                                                marginLeft: '10px'
                                            }} alt="avatar" />
                                        )}
                                    </div>
                                </Upload>
                                    
                            </div>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                          <ButtonAntD type="primary" htmlType="submit">
                              Apply
                          </ButtonAntD>
                        </Form.Item>
                    </FormStyle>
                    </LoadingComponent>
                </DrawerComponent>

                <ModelComponent 
                    title="Xóa người dùng" 
                    open={isModalOpenDelete} 
                    onCancel={handleCancelDelete} 
                    onOk={handleDeleteUser}
                    confirmLoading={isLoadingDeleted} 
                >
                    <LoadingComponent isLoading={isLoadingDeleted}>
                        <div>Bạn có chắc xóa tài khoản {rowSelected} này không?</div>
                    </LoadingComponent>
                </ModelComponent>

            </WrapperHeader>
        </div>
    );
};

export default AdminProduct;
