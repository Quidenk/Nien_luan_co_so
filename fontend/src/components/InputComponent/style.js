import { Input } from "antd";
import styled from "styled-components";

export const InputStyle = styled(Input)`
    align-items: center;
    font-family: "Odibee Sans", sans-serif;
    font-size: 17px;
    background-color: transparent;
    width: 100%;
    
    &::placeholder {
        color: #s5s5s5;
        font-size: 15px;
    }
`