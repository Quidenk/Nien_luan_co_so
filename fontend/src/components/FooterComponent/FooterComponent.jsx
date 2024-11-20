import React from 'react'
import { ColStyle, MapStyle, WrapperFooter } from './style'
import { Row } from 'antd'

const FooterComponent = () => {
  return (
    <WrapperFooter style={{ color: '#fff'}}>
        <Row style={{ height: '100%'}}>
            <ColStyle style={{ marginRight: '10px' }} span={20}>
                <MapStyle src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3058.847550227907!2d105.76916295382193!3d10.031020792038023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0883d2192b0f1%3A0x4c90a391d232ccce!2zVHLGsOG7nW5nIEPDtG5nIE5naOG7hyBUaMO0bmcgVGluIHbDoCBUcnV54buBbiBUaMO0bmcgKENUVSk!5e0!3m2!1svi!2s!4v1700709535623!5m2!1svi!2s" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
                </MapStyle>
            </ColStyle>

            <ColStyle span={4}>

            </ColStyle>
        </Row>
    </WrapperFooter>
  )
}

export default FooterComponent
