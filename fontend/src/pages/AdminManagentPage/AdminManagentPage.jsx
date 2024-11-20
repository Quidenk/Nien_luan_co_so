import { Menu } from 'antd';
import React from 'react';
import { getItem } from '../../utils';
import { ProductOutlined, UserAddOutlined } from '@ant-design/icons';
import { useState } from 'react';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
import { MenuStyle } from './style';


const AdminManagentPage = () => {
  const items = [
    getItem('Người dùng', 'user', <UserAddOutlined/>),
    getItem('Sản phẩm', 'product', <ProductOutlined/>)
  ];


  const [keySelected, setKeySelected] = useState('user')
  
  const renderPage = (key) => {
    switch(key) {
      case 'user':
        return (
          <AdminUser/>
        )
      case 'product':
        return (
          <AdminProduct/>
        )
      default: 
        return <></>
    }
  }

  const handleOnClick = ({ key }) => {
    setKeySelected(key)
  }
      
  console.log('keySelected', keySelected)

  return (
    <div style={{ }}>
      <HeaderComponent />
      <div style={{ display: 'flex'}}>
          <MenuStyle
            theme="dark" // Tùy chọn: "light" hoặc "dark"
            mode="inline"
            style={{
              width: 256,
            }}
            items ={items}
            onClick={handleOnClick}
            defaultSelectedKeys={['user']} // Chọn mặc định "Người dùng"          
          />
          <div style = {{ flex: 1}}>
              {renderPage(keySelected)}
          </div>
      </div>
    </div>
  )
}

export default AdminManagentPage;