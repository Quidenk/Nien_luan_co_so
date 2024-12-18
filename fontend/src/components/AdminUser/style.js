import { Button, Form } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.div`
    backdrop-filter: blur(17px);
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    color: #fff;
    padding: 15px;
`

export const ButtonAdd= styled.div`
    font-size: 20px;
    border: 1px solid #fff;
    border-radius: 15px;
    width: 100px;
    height: 100px;
    backdrop-filter: blur(17px);
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    cursor: pointer;
    boder-style: dashed;
`

export const ButtonUpload = styled(Button)`
    background-color: #fff !important; /* Màu nền */
    border-color: rgb(241, 94, 44) !important;    /* Màu viền */
    color: rgb(241, 94, 44) !important;             /* Màu chữ */
    // transition: all 0.3s ease; /* Hiệu ứng chuyển đổi mượt */

    &:hover{
        background-color: rgb(241, 94, 44) !important;
        color: #fff !important;             /* Màu chữ */
    }
`

export const ButtonAntD = styled(Button)`
    background-color: rgb(241, 94, 44) !important; /* Màu nền */
    border-color: rgb(241, 94, 44) !important;    /* Màu viền */
    color: #fff !important;             /* Màu chữ */
    transition: all 0.3s ease; /* Hiệu ứng chuyển đổi mượt */
`

export const FormStyle = styled(Form)`
    .ant-form-item-label > label {
        color: #fff !important; /* Đặt màu chữ cho label trong Form */
    }
`