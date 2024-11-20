import { Row } from "antd";
import styled from "styled-components";

export const WrapperFooter = styled.div`
    border: 3px solid #fff;
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
    align-items: center;
`