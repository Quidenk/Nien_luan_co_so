import Slider from "react-slick";
import styled from "styled-components";


export const SliderStyle = styled(Slider)`
    .slick-dots.custom-dots {
        bottom: 15px; /* Dời dots xuống một chút */
    }

    .slick-dots.custom-dots li button:before {
        font-size: 10px;
        color: #bbb; /* Màu mặc định */
    }

    .slick-dots.custom-dots li.slick-active button:before {
        color: #1890ff; /* Màu khi được chọn */
    }
` 