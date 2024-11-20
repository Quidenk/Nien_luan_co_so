
import { Radio } from "antd";
import styled  from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
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
`

export const WrapperStyleHeader = styled.div`
  background: rgb(255, 255, 255);
  padding: 9px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  span {
    color: rgb(36, 36, 36);
    font-weight: 400;
    font-size: 13px;
  }
`

export const WrapperValue = styled.div`
    background: rgb(240, 248, 255);
    border: 1px solid rgb(194, 225, 255);
    padding: 10px;
    width: fit-content;
    border-radius: 6px;
    margin-top: 4px;
    color: #000;
    font-size: 15px;
`

export const WrapperContainer = styled.div`
    width: 100%;
    backdrop-filter: blur(17px);
    background: rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    // width: 40%;
    color: rgb(255, 255, 255);
    font-size: 18px;
`

export const WrapperListOrder = styled.div`

`

export const WrapperItemOrder = styled.div`
  display: flex;
  align-items: center;
  padding: 9px 16px;
  margin-top: 12px;
  justify-content: center
`

export const WrapperPriceDiscount = styled.span`
  color: #999;
  font-size: 12px;
  text-decoration: line-through;
  margin-left: 4px;
`
export const WrapperCountOrder  = styled.div`
  display: flex;
  align-items: center;
  width: 84px;
  border: 1px solid #ccc;
  border-radius: 4px;
`

export const WrapperRight = styled.div`
  width: 320px;
  margin-left: 20px;
  display: flex ;
  flex-direction: column; 
  gap: 10px; 
  align-items: center
`

export const WrapperInfo = styled.div`
    color: #fff;
    padding: 17px 20px;
    background: transparent;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
    width: 100%
`

export const WrapperItemOrderInfo = styled.div`
    padding: 17px 20px;
    backdrop-filter: blur(17px);
    background: rgba(0, 0, 0, 0.5);
    border-bottom: 1px solid #f5f5f5;
    display: flex;
    flex-direction: column;
    overflow: scroll;
    overflow-x: hidden;
    max-height: 160px;
`

export const WrapperTotal = styled.div`
  display: flex;
   align-items: flex-start; 
   justify-content: space-between;
    padding: 17px 20px;
    background: #fff ;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
`

export const Lable = styled.span`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
`

export const WrapperRadio = styled(Radio.Group)`
  margin-top: 6px;
  background: rgb(240, 248, 255);
  border: 1px solid rgb(194, 225, 255);
  width: 500px;
  border-radius: 4px;
  height: 100px;
  padding: 16px;
  font-weight: normal;
  display:flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
`
