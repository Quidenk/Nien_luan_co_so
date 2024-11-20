import { Table } from 'antd'
import React from 'react'
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import { CustomTable } from './style';

const TableComponent = (props) => {
    const {selectionType = 'checkbox', isloading=false, data= [], columns=[]} = props
    // const [selectionType, setSelectionType] = useState('checkbox');

    

      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
          disabled: record.name === 'Disabled User',
          // Column configuration not to be checked
          name: record.name,
        }),
    };

    console.log('<>><>>', data)
  return (
    <LoadingComponent isLoading={isloading}>
      <div>
          <CustomTable 
              rowSelection={{
              type: selectionType,
              ...rowSelection,
              }}
              columns={columns}
              dataSource={data}
              {...props}
        />
      </div>
    </LoadingComponent>
  )
}

export default TableComponent
