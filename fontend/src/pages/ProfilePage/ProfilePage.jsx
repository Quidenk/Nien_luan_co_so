import React, { useContext, useEffect, useState } from 'react'
import { ButtonAntD, ButtonStyle, ButtonUpload, FormStyle, InputStyle, Profile, Wrapper, WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel } from './style'
import { AuthContext } from '../../components/context/auth.context';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import DrawerComponent from '../../components/DrawerComponent/DrawerComponent';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import { Button, Form, Input, message, Radio, Upload } from 'antd';
import { GetProfileUserApi, UpdataUserApi } from '../../util/api';
import { useMutationHooks } from '../../hooks/useMutationHook';
import { useQueryClient } from '@tanstack/react-query';
import { getBase64 } from '../../utils';

const ProfilePage = () => {
    const user = useSelector((state) => state.user)
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const queryClient = useQueryClient()
    const [stateUserDetails, setStateUserDetails] = useState({
        name: '',
        email: '',
        phone: '',
        isAdmin: false,
        avatar: '',
        address: ''
    })
    console.log('user', user)

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

    const { data: dataUpdated, isPending: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate


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
          message.success("Cập nhật thông tin thành công.")
          handleCloseDrawer()
        } else if (isErrorUpdated) {
          message.error("Cập nhật thông tin thất bại.")
        }
    }, [isSuccessUpdated])

    const handleDetailsProduct = () => {
        setIsOpenDrawer(true)
    }

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

    useEffect(() => {
        fetchGetDetailsUser(user?.id)
    }, [])

    useEffect(() => {
        if (isOpenDrawer) {
          setIsLoadingUpdate(true)
          fetchGetDetailsUser(user?.id)
        }
    }, [isOpenDrawer])

    //   useEffect(() => {
    //     if (rowSelected && isOpenDrawer) {
    //       setIsLoadingUpdate(true)
    //       fetchGetDetailsUser(rowSelected)
    //     }
    // }, [rowSelected, isOpenDrawer])

    useEffect(() => {
        form.setFieldsValue(stateUserDetails);
    }, [stateUserDetails, form]);

    const handleOnchangeDetails = (e) => {
        setStateUserDetails({
          ...stateUserDetails,
          [e.target.name]: e.target.value
        })
    }

    const onUpdateUser = () => {
        mutationUpdate.mutate({ id: user?.id, ...stateUserDetails }, {
          onSettled: () => {
            queryClient.invalidateQueries(['users'])
          }
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

  return (
    <div>
        <WrapperContentProfile>
            <div>
                {/* Avatar Section */}
                <WrapperInput style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
                    {/* <WrapperLabel htmlFor="avatar" style={{ color: 'white', fontWeight: 'bold' }}>Avatar</WrapperLabel> */}
                    <img
                        src={user?.avatar || "default-avatar-url.png"}
                        alt="User Avatar"
                        style={{
                            width: '300px',
                            height: '300px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: '3px solid rgba(0, 0, 0)'
                        }}
                    />
                </WrapperInput>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '70%'}}>
                <div>
                    <WrapperHeader style={{ display: 'flex', color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: '30px' }}>
                        THÔNG TIN NGƯỜI DÙNG
                    </WrapperHeader>
                </div>
                <Profile>
                    <WrapperInput>
                        <WrapperLabel style={{ fontSize: '30px' }}>{user?.name}</WrapperLabel>
                        <span>{user?.email}</span>
                    </WrapperInput>

                    <WrapperInput>
                        <WrapperLabel style={{ fontSize: '30px' }}>Điện thoại: </WrapperLabel>
                        <span>{user?.phone}</span>
                    </WrapperInput>

                    <WrapperInput>
                        <WrapperLabel style={{ fontSize: '30px' }}>Địa chỉ: </WrapperLabel>
                        <span>{`${user?.city}, ${user?.address}`}</span>
                    </WrapperInput>
                </Profile>

                <ButtonStyle onClick={handleDetailsProduct}>
                    Cập nhật
                </ButtonStyle>
            </div>
        </WrapperContentProfile>

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
                <FormStyle.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
                >
                <Input  value={stateUserDetails.name} onChange={handleOnchangeDetails} name="name" />
                </FormStyle.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                <Input value={stateUserDetails.email} onChange={handleOnchangeDetails} name="email" />
                </Form.Item>

                <Form.Item
                label="Phone"
                name="phone"
                rules={[{ required: true, message: 'Please input your  phone!' }]}
                >
                <Input value={stateUserDetails.phone} onChange={handleOnchangeDetails} name="phone" />
                </Form.Item>

                <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true, message: 'Please input your  address!' }]}
                >
                <Input value={stateUserDetails.address} onChange={handleOnchangeDetails} name="address" />
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
    </div>
  )
}

export default ProfilePage
