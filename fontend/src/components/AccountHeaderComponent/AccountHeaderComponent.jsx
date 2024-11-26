import { UserOutlined } from '@ant-design/icons'
import React, { useContext, useEffect, useState } from 'react'
import { AccountHeaderStyle } from './style';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser } from '../../redux/slides/userSlide';
import LoadingComponent from '../LoadingComponent/LoadingComponent';


const AccountHeaderComponent = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    console.log('user: ', user)
    const onClick = (e) => {
        console.log('click ', e);
    };

    const navigate = useNavigate();

    const items = [
        {
            key: 'SubMenu',
            label: `Welcome ${user?.name}`,
            icon: <UserOutlined />,
            children: [
                
                ...(!user?.name == '' ? [
                    {
                        key: 'profile-user',
                        label: <span onClick={() => {                            
                            navigate("/profile-user");
                        }}>Thông tin cá nhân</span>,
                    },
                    (user?.isAdmin  && 
                        {
                            key: 'manage',
                            label: <span onClick={() => {                            
                                navigate("/manage");
                            }}>Trang quản lý</span>,
                        }
                    ),
                    {
                        key: 'details-order',
                        label: <span onClick={() => {                            
                            navigate(`/my-order`, { state : {
                                id: user?.id,
                              }
                            });
                        }}>Đơn hàng của tôi</span>,
                    },
                    {
                        key: 'logout',
                        label: <span onClick={() => {
                            localStorage.clear("access_token");
                            // setAuth({
                            //     isAutheticated: false,
                            //     user: {
                            //         email: "",
                            //         name: ""
                            //     }
                            // })
                            dispatch(resetUser())
                            navigate("/");
                        }}>Đăng xuất</span>,
                    },
                ] : [
                    {
                       key: 'login',
                       label: <Link to={"/sign-in"}>Đăng nhập</Link>,
                    },
                    {
                        key: 'login',
                        label: <Link to={"/sign-up"}>Đăng ký</Link>,
                    }
                ])
                
                
                
            ],
        },
    ]
    

    return (
        <AccountHeaderStyle
            onClick={onClick}
            style={{
                width: 200,
            }}
            mode="vertical"
            triggerSubMenuAction="click"
            items={items}
        />
  )
}

export default AccountHeaderComponent
