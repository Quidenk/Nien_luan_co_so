import { Menu } from "antd";
import styled from "styled-components";

export const ProductsComponentStyle = styled.div`
    border: 1px solid #e5e5e5;
    border-radius: 7px;
    backdrop-filter: blur(17px);
    background-color: rgba(0, 0, 0, 0.3);
    height: 100vh; 
    color: #fff;
`

export const NewsCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    border: 1px solid #fff;
    padding: 15px;
    backdrop-filter: blur(17px);
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 30px;
`

export const ButtonControl = styled.div`
    font-size: 20px;
    border: 1px solid #fff;
    border-radius: 40px;
    width: 90%;
    height: 45px;
    backdrop-filter: blur(20px);
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    cursor: pointer;
`

export const MenuStyle = styled(Menu)`
    color: #fff !important;
    background-color: transparent !important;

    .ant-menu-item {
        color: #fff; /* Màu chữ */
        background: #1e1e1e; /* Màu nền */
    }

    .ant-menu-item:hover {
        color: #fff; /* Màu nền khi hover */
        border-color: rgb(241, 94, 44); /* Màu chữ khi hover */
    }

    .ant-menu-item-selected {
        background: rgb(241, 94, 44); /* Màu nền khi được chọn */
        color: #fff; /* Màu chữ khi được chọn */
    }
`