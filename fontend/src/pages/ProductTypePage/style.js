import { Breadcrumb } from "antd";
import styled from "styled-components";

export const ProductsComponentStyle = styled.div`
    border: 1px solid #e5e5e5;
    border-radius: 7px;
    backdrop-filter: blur(17px);
    background-color: rgba(0, 0, 0, 0.3);
    height: 100vh; 
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