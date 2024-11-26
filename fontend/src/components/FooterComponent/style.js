import { Row } from "antd";
import styled from "styled-components";

export const WrapperFooter = styled.div`
    border-radius: 100px;
    background-color: rgba(255, 255, 255, 0.2);
    height: 250px; 
    color: #fff;
    margin-top: 20px;
    padding: 10px;
    backdrop-filter: blur(17px);
    background-color: rgba(0, 0, 0, 0.3);
`

export const MapStyle = styled.iframe`
    border: 1px solid #fff;
    border-radius: 120px 50px 50px 120px;
    width: 200px;
    height: 200px;
`

export const ColStyle = styled(Row)`
    display: flex;
    justify-content: center;
    gap: 50px;
`

export const InfoCol = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 200px;
    
`

export const TitleInfo = styled.span`
    font-size: 14px;
    font-weight: 600;
`

export const RowStyle = styled(Row)`
    display: flex;
    flex-direction: row;
    gap: 30px;
    flex-flow: unset !important;
`

export const LinkStyle = styled.span`
    transition: color 0.3s ease, text-decoration-color 0.3s ease;  /* Thêm transition mượt mà */

    &:hover {
        text-decoration: underline; /* Gạch dưới */
        text-decoration-color: rgb(241, 94, 44);  /* Màu gạch dưới */
        color: rgb(241, 94, 44); /* Màu khi hover (thay #f57c00 bằng màu bạn muốn) */
    }
`