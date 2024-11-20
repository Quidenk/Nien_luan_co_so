import { Modal } from 'antd'
import React from 'react'

const ModelComponent = ({ title = 'Model', isOpen = false, children, ...rests }) => {
  return (
    <div>
        <Modal title={title} open={isOpen} {...rests} footer={null} > 
            {children}
        </Modal>
    </div>
  )
}

export default ModelComponent
