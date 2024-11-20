import { Button, Form } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.span`
    color: #000;
    font-size: 18px;
    margin: 4px 0;
` 

export const WrapperContentProfile = styled.div`
    display: flex;
    flex-direction: row;
    border-radius: 10px;
    justify-content: space-evenly;
    gap: 20px;
    padding: 0 100px;
    margin-top: 40px;
`

export const WrapperLabel = styled.label`
    color: #fff;
    font-size: 20px;
    line-height: 30px;
    font-weight: 600;
`

export const WrapperInput = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    color: #fff;
    font-size: 20px;
`

export const InputStyle = styled.input`
    align-items: center;
    font-family: "Odibee Sans", sans-serif;
    font-size: 18px;
    background-color: transparent;
    border: none;
    width: 300px;
    color: #f15e2c;
    &::placeholder {
        color: #s5s5s5;
        font-size: 20px;
    }

    &:focus {
        outline: none;
    }
`

// export const ButtonStyle = styled.div`
//     font-size: 25px;
//     font-weight: 600;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     color: #fff;
//     border-radius: 5px;
//     background-color: #f15e2c;
//     font-size: 18px;
//     padding: 10px;
// `

export const Profile = styled.div`
    display: flex;
    flex-direction: row;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    justify-content: space-between;
    height: 90px;
    width: 100%;
    padding: 10px 40px;
    // margin-top: 50px;
`
export const ButtonStyle = styled.button`
    width: 30%;
    margin-top: 20px;
    padding: 10px 20px;
    background-color: rgb(255, 255, 255, 0.2);
    color: rgb(241, 94, 44, 0.7);
    border: 1px solid rgb(241, 94, 44);
    border-radius: 20px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    transition: all 0.3s ease; /* Hiệu ứng chuyển đổi mượt */

    
    &:hover {
        background-color: rgb(241, 94, 44);
        color: rgba(255, 255, 255);
    }
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