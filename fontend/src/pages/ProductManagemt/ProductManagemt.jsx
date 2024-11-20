import { notification, Table } from 'antd';
import React, { useEffect, useState } from 'react'

const ProductManagemt = () => {
    const [dataSource, setDataSource] = useState([]);
    
    useEffect(() => {
        const fetchUser = async () => {
            const res = await GetUserApi()
            console.log(">>> check res: ", res)
            if(!res?.message){
                setDataSource(res)
            }else {
              notification.error ({
                message: "Unauthorized",
                description: res.message
              })
            }
        }
        fetchUser();
    }, [])
    
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

export default ProductManagemt
