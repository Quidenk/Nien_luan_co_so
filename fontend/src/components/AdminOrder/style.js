import { Button } from "antd";
import styled from "styled-components";


export const WrapperHeader = styled.div`
    backdrop-filter: blur(17px);
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    color: #fff;
    padding: 15px;
`

export const ButtonAntD = styled(Button)`
    background-color: rgb(241, 94, 44) !important; /* Màu nền */
    border-color: rgb(241, 94, 44) !important;    /* Màu viền */
    color: #fff !important;             /* Màu chữ */
    transition: all 0.3s ease; /* Hiệu ứng chuyển đổi mượt */
`


export const WrapperStyleContent = styled.div`
  display:flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  color: #fff;
  margin-bottom: 40px;
`

export const WrapperProduct = styled.div`
//   display:flex;
//   align-items:flex-start;
//   margin-top: 10px;

    flex:1;
    display: flex;
    align-items: center;
    // justify-content: space-between;
`

export const WrapperNameProduct = styled.div`
  display:flex;
  align-items: flex-start;
  width: 45%;
`

export const WrapperItem = styled.div`
  width: 100px;
  font-weight: bold;
  &:last-child {
    font-size: 20px;
    color: #f15e2c;
  }
`
export const WrapperItemLabel = styled.div`
  width: 200px;
  &:last-child {
    font-weight: bold;
  }
`

export const WrapperAllPrice = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: end;
`

export const Lable = styled.div`
    font-size: 25px;
    color: #fff;
    font-weight: bold;
    margin-bottom: 20px;
`