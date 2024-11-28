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