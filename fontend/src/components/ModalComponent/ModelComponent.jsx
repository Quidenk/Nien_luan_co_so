import { Modal } from 'antd'
import React from 'react'

const ModelComponent = ({ title = 'Model', isOpen = false, footer, children, ...rests }) => {
  return (
    <div>
        <Modal title={title} open={isOpen} footer={footer} {...rests} > 
            {children}
        </Modal>
    </div>
  )
}

export default ModelComponent
