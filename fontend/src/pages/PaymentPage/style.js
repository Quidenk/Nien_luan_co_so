import { Breadcrumb, Checkbox, Radio } from 'antd';
import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    background: transparent;
    overflow: auto;
    overflow-x: hidden;
`

export const shippingAddress = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    background: transparent;
`

export const OrderDiv = styled.div`
    backdrop-filter: blur(17px);
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid #e5e5e5;
    border-radius: 7px;
    width: 40%;
    color: rgb(255, 255, 255);
    font-size: 18px;
    padding: 20px;
    height: 250px;
`

export const OrderProduct = styled.div`
    width: 100%;
    color: rgb(255, 255, 255);
    backdrop-filter: blur(17px);
    background-color: rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e5e5;
    border-radius: 7px;
    height: 175px;
`

export const AllSelect = styled.span`
    font-size: 15px;
    font-weight: 500;
    width: 100%;
    color: rgb(255, 255, 255);
    backdrop-filter: blur(17px);
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid #e5e5e5;
    border-radius: 7px;
    height: 30px;
`

export const PaymentMethod = styled.div`
    width: 100%;
    color: rgb(255, 255, 255);
    backdrop-filter: blur(17px);
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid #e5e5e5;
    border-radius: 7px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 35px;
`

export const NameProduct = styled.span`
    font-size: 35px;
    font-weight: 600;
    width: 260;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

export const RateProduct = styled.span`
    display: flex;
    justify-content: space-between;
    color: rgb(255 255 255 / 57%);
`

export const OptionSelect = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

export const ButtonSale = styled.div`
    font-size: 25px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    border-radius: 5px;

    &:hover {
        box-shadow: 0px 20px 20px #00000040;
        transform: scale(1.02);
    }
`

export const DivPrice = styled.span`
    background: rgba(0, 0, 0, 0.5);
    padding: 10px;
    border-radius: 5px;
`

export const PriceProduct = styled.span`
    font-size: 20px;
    color: rgb(241, 94, 44);
    font-weight: 700;
`

export const WrapperInfo = styled.div`
    padding: 17px 20px;
    border-bottom: 1px solid #f5f5f5;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
    background: transparent;
`

export const WrapperTotal = styled.div`
    display: flex;
    align-items: flex-start; 
    justify-content: space-between;
    padding: 17px 20px;
    background: transparent;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
    color: #fff;
`

export const WrapperBreadcrumbStyle = styled.div`
    border: 1px solid #e5e5e5;
    border-radius: 15px;
    backdrop-filter: blur(17px);
    background-color: rgba(0, 0, 0, 0.1);
    width: 20%;
    display: flex;
    padding: 10px;
    padding-left: 30px;
`

export const BreadcrumbStyle = styled(Breadcrumb)`
    & .ant-breadcrumb-link {
        color: #fff;
    }

`

export const CustomCheckbox = styled(Checkbox)`
    padding: 4px;
    .ant-checkbox-checked .ant-checkbox-inner {
        background-color: #9255FD;
        border-color: #9255FD;
    }
    .ant-checkbox:hover .ant-checkbox-inner {
        border-color: #9255FD;
    }
`

export const Lable = styled.div`
    font-size: 20px;
    color: rgb(241, 94, 44);
    font-weight: bold;
    backdrop-filter: blur(10px);
    background: rgba(0, 0, 0, 0.01);
    width: 90%;
    padding: 15px;
`

export const WrapperRadio = styled(Radio.Group)`
    margin-top: 6px;
    color: rgb(255, 255, 255);
    height: 100px;
    padding: 16px;
    font-weight: normal;
    display:flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
`

export const RadioStype = styled(Radio)`
    color: #fff;
    font-weight: 600;
    
    .ant-radio-checked .ant-radio-inner{
        border-color: rgb(241, 94, 44);
        background-color: rgb(241, 94, 44);
    }
`