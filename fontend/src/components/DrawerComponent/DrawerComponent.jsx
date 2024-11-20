import { Button, Drawer } from 'antd'
import React from 'react'

const DrawerComponent = ({ title = 'Drawer', placement = 'right', isOpen = false, children, ...rests }) => {
  return (
    <div>
        {/* <Button type="primary" onClick={showDrawer}>
            Open
        </Button> */}
        <Drawer style={{backdropFilter: 'blur(17px)', backgroundColor: 'rgba(0, 0, 0, 0.3)', color: '#fff'}} title={title} placement={placement} open={isOpen} {...rests}>
            {children}
        </Drawer>
    </div>
  )
}

export default DrawerComponent
