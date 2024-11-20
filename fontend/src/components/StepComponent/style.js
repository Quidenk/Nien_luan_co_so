import { Steps } from "antd";
import styled from "styled-components";
const { Step } = Steps;


export const CustomStep = styled(Step)`
    background: #000;
  .ant-steps-item-icon {
    background-color: rgb(241, 94, 44);
    border-color: rgb(241, 94, 44);
  }

  .ant-steps .ant-steps-item-process>.ant-steps-item-container>.ant-steps-item-content>.ant-steps-item-title {
    color: #fff;
  }
`