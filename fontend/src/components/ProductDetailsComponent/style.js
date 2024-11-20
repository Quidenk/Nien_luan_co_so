import { Breadcrumb } from "antd";
import styled from "styled-components";

export const Wrapper = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border: 1px solid #fff;
    backdrop-filter: blur(17px);
    background-color: rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e5e5;
    border-radius: 7px;
    overflow: auto;
`

export const ImgProductDiv = styled.div`
    width: 80%;
    height: 450px;
`

export const ImgProduct = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.5);
`

export const SmallImgProductDiv = styled.div`
    padding: 10px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 5px;
`

export const SmallImgProduct = styled.img`
    height: 130px;
    object-fit: contain;
    border-radius: 2px;
`


export const OrderDiv = styled.div`
    border: 1px solid #fff;
    backdrop-filter: blur(17px);
    background-color: rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e5e5;
    border-radius: 7px;
    overflow: auto;
    width: 60%;
    color: rgb(255, 255, 255);
    font-size: 18px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 20px;
`


export const NameProduct = styled.span`
    font-size: 35px;
    font-weight: 600;
`

export const RateProduct = styled.span`
    display: flex;
    justify-content: space-between;
    color: rgb(255 255 255 / 57%);
`

export const DivPrice = styled.span`
    background: rgba(0, 0, 0, 0.5);
    padding: 10px;
    border-radius: 5px;
`

export const PriceProduct = styled.span`
    font-size: 30px;
    color: rgb(241, 94, 44);
    font-weight: 700;
`

export const SelectProduct = styled.div`
    display: flex;
    justify-content: left;
    gap: 20px;
    font-size: 20px;
    font-weight: 500;
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

export const InfoProductDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 50px;
`


export const InfoProduct = styled.div`
    font-size: 20px;
    border-radius: 5px;
    height: 45px;
    backdrop-filter: blur(20px);
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
    cursor: pointer;
    padding: 10px 20px;
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