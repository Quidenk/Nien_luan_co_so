import { ShoppingCartOutlined } from "@ant-design/icons";
import { Col } from "antd";
import Search from "antd/es/input/Search";
import styled from "styled-components";


export const WrapperHeader = styled.div`
    border-radius: 15px;
    backdrop-filter: blur(17px);
    background-color: rgba(0, 0, 0, 0.3);
    height: 75px; 
    color: #fff;
    margin-bottom: 10px;
`

export const WrapperColHeader = styled(Col)`
    display: flex;
    justify-content: center;
    gap: 20px;
    align-items: center;
    font-family: "Odibee Sans", sans-serif;
    font-size: 27px;
    padding: 10px;
`

export const WrapperSearchHeader = styled(Search)`
    & .ant-btn-primary {
        background-color: #000;
    }
`

export const SelectionStyle = styled.div`
  transition: all 0.3s ease; /* Hiệu ứng chuyển đổi mượt */

  &:hover {
    font-size: 20px; /* Kích thước khi hover */
    color: rgb(241, 94, 44); /* Màu chữ khi hover */
  }
`;

export const UIXCAB = styled.div`
  transition: all 0.3s ease; /* Hiệu ứng chuyển đổi mượt */

  &:hover {
    color: rgb(241, 94, 44); /* Màu chữ khi hover */
  }
`;


export const Cart = styled(ShoppingCartOutlined)`
  font-size: 27px; /* Kích thước mặc định */
  color: #fff; /* Màu mặc định */
  transition: all 0.3s ease; /* Hiệu ứng chuyển đổi mượt */

  &:hover {
    font-size: 30px; /* Tăng kích thước khi hover */
    color: rgb(241, 94, 44); /* Đổi màu khi hover */
  }
`;
