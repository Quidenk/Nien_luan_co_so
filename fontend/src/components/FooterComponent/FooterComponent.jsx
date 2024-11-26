import React from 'react'
import { ColStyle, InfoCol, LinkStyle, MapStyle, RowStyle, TitleInfo, WrapperFooter } from './style'
import { Row } from 'antd'

const FooterComponent = () => {
  return (
    <WrapperFooter style={{ color: '#fff'}}>
        <RowStyle style={{ height: '100%'}}>
            <ColStyle style={{ marginRight: '10px', alignItems: 'center' }} span={20}>
                <MapStyle src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3058.847550227907!2d105.76916295382193!3d10.031020792038023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0883d2192b0f1%3A0x4c90a391d232ccce!2zVHLGsOG7nW5nIEPDtG5nIE5naOG7hyBUaMO0bmcgVGluIHbDoCBUcnV54buBbiBUaMO0bmcgKENUVSk!5e0!3m2!1svi!2s!4v1700709535623!5m2!1svi!2s" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
                </MapStyle>
            </ColStyle>

            <ColStyle style={{ padding: '10px' }} span={4}>
                <InfoCol style={{ maxWidth: '300px'}}>
                    <TitleInfo>GENERAL TRADING FASHIONS ONE MEMBER COMPANY LIMITED</TitleInfo>
                    <span><span style={{ fontWeight: '600' }}>Office:</span> 163 Phan Dang Luu, Ward 1, Phu Nhuan District, Ho Chi Minh City, Viet Nam</span><br/>
                    <span><span style={{ fontWeight: '600' }}>E-commerce Warehouse:</span> TBS Logistics Tan Van, Binh Duong Province, Viet Nam</span><br/>
                    <span><span style={{ fontWeight: '600' }}>Hotline:</span> 1900 63 64 01</span><br/>
                    <span><span style={{ fontWeight: '600' }}>Business Code:</span>  0314635071, register changes on April 20, 2020</span><br/>
                </InfoCol>

                <InfoCol>
                    <TitleInfo>About Supersports</TitleInfo><br/>
                    <LinkStyle>About Us</LinkStyle><br/>
                    <LinkStyle>Store Locations</LinkStyle><br/>
                    <LinkStyle>Contact Us</LinkStyle><br/>
                    <LinkStyle>Terms & Conditions</LinkStyle><br/>
                </InfoCol>

                <InfoCol>
                    <TitleInfo>Support</TitleInfo><br/>
                    <LinkStyle>Delivery Policy</LinkStyle><br/>
                    <LinkStyle>Returns & Exchanges</LinkStyle><br/>
                    <LinkStyle>Installment policy</LinkStyle><br/>
                    <LinkStyle>Privacy Policy</LinkStyle><br/>
                    <LinkStyle>Help & FAQs</LinkStyle><br/>
                </InfoCol>

                <InfoCol>
                    <TitleInfo>Group Business</TitleInfo><br/>
                    <LinkStyle>Nguyen Kim</LinkStyle><br/>
                    <LinkStyle>Big C</LinkStyle><br/>
                </InfoCol>

                <InfoCol>
                    <TitleInfo>PAYMENT METHODS</TitleInfo><br/>
                    
                </InfoCol>

            </ColStyle>
        </RowStyle>
    </WrapperFooter>
  )
}

export default FooterComponent
