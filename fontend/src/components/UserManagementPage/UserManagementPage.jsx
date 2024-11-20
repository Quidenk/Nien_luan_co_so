import { notification, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { GetUserApi } from '../../util/api';
import { GetProductApi } from '../../util/productService';

const UserManagementComponent = ({ dataSource }) => {

    
    const columns = [
        {
          title: 'Id',
          dataIndex: '_id',
        },
        {
          title: 'Email',
          dataIndex: 'email',
        },
        {
          title: 'Name',
          dataIndex: 'name',
        },
        {
            title: 'Role',
            dataIndex: 'role',
        },
    ];
    
    
    return (
    <div style={{ padding: '30px' }}>
      <Table 
        dataSource={dataSource} 
        columns={columns}
        bordered
      /> 
    </div>
  )
}

export default UserManagementComponent
