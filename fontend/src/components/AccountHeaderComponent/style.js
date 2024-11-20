import styled from "styled-components";
import { Menu } from 'antd'

export const AccountHeaderStyle = styled(Menu)`
    background-color: transparent;
    border: 2px solid #fff;
    border-radius: 30px;

    &:where {
        color: #000;
    }
    
    .ant-menu-light>.ant-menu.ant-menu-root.ant-menu-vertical{
        border-inline-end: 1px solid #fff;
    }
`