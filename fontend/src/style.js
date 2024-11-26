import styled from "styled-components";
import BackGround from './assets/images/bg.jpg'

export const BackgroundStyle =styled.div`
    background-image: url(${BackGround});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    min-height: 100vh; /* Đảm bảo chiếm toàn bộ chiều cao màn hình */
    height: 100%; /* Chiều cao tối đa có thể */
    // display: flex; /* Để căn giữa phần tử con nếu cần */
    // flex-direction: column; /* Nếu có nhiều phần tử con */
`