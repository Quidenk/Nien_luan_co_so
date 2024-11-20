import { Table } from "antd";
import styled from "styled-components";

export const CustomTable = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: rgb(241, 94, 44, 0.7); /* Màu nền tiêu đề */
    color: #fff; /* Màu chữ tiêu đề */
  }

  .ant-table-tbody > tr > td {
    background-color: transparent !important; /* Màu nền của các hàng */
    color: #000; /* Màu chữ của các hàng */
  }

  .ant-table-tbody > tr:hover {
    background-color: rgb(241, 94, 44, 0.7); /* Màu nền khi hover */
  }
`;