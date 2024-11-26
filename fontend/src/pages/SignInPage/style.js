import { Button, Form, Input } from "antd"
import styled from "styled-components"

export const WrapperLogIn = styled.div`
    float: right;
    width: 40%;
    background: #fff;
    border-radius: 5px;
    padding: 20px;

`

export const LoginStyle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const FormStyle = styled(Form)`
    .ant-form-item-label > label {
        color: #fff !important; /* Đặt màu chữ cho label trong Form */
    }
`

export const ButtonAntD = styled(Button)`
    background-color: rgb(241, 94, 44) !important; /* Màu nền */
    border-color: rgb(241, 94, 44) !important;    /* Màu viền */
    color: #fff !important;             /* Màu chữ */
    transition: all 0.3s ease; /* Hiệu ứng chuyển đổi mượt */
`
export const InputStyle = styled(Input)`
    background-color: rgba(0, 0, 0, 0.04) !important;
    color: #fff !important;

    &:hover{
        border-color: rgb(241, 94, 44) !important ;
    }
`
export const LinkStyle = styled.span`
    color: #fff;
    border-bottom: 1px solid #fff;
    transition: 1s;
    
    &:hover {
        color: rgb(241, 94, 44) !important ;
        cursor: pointer;
        border-color: rgb(241, 94, 44) !important ;
    }
`
