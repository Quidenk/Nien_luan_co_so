import styled from 'styled-components';
import imgNews from '../../assets/images/test.jpg';

export const Card = styled.div`
    position: relative;
    width: 90%;
    height: 200px;
    background-image: url(${imgNews});
    background-size: cover;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    border-radius: 30px;
    box-shadow: 0px 10px 20px #00000026;
    transition: 200ms cubic-bezier(0.5, 0.5, 0, 1);
    cursor: pointer;
    overflow: hidden;
    transition: transform 0.3s ease-in-out;
    alignItems: center;


    &:hover {
        box-shadow: 0px 20px 20px #00000040;
        transform: scale(1.02);
    }

    &:hover .footer {
        transform: translateY(0);
    }

    // &:after {
    //     content: '';
    //     position: absolute;
    //     top: 0;
    //     left: 0;
    //     width: 100%;
    //     height: 100%;
    // }
`;

export const FooterCard = styled.div`
    width: 100%;
    background: transparent; // Corrected background property
    color: #fff;
    font-family: 'Poppins', sans-serif;
    position: absolute;
    z-index: 1;
    bottom: 0;
    left: 0;
    box-shadow: 0px 0px 0px #000;
    backdrop-filter: blur(5px);
    background-color: rgba(0, 0, 0, 0.3); // Add a semi-transparent background   

    // transition: 200ms cubic-bezier(0.5, 0.5, 0, 1) 300ms; // Combined transition and transition-delay
    // transform: translateY(100%);
`;

export const ContentCard = styled.div`
    padding: 10px 30px;
    // z-index: 2; // Corrected z-index spelling;
`;

export const TitleCard = styled.div`
    font-size: 21px;
    font-weight: 600;
    padding: 0px 0px 10px 0px;
`;

export const NewsCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    backdrop-filter: blur(20px);
    background-color: rgb(100, 100, 100, 0.2);
    border-radius: 8px;
    padding: 10px;
`

export const ButtonControl = styled.div`
    font-size: 20px;
    border-radius: 40px;
    width: 90%;
    height: 45px;
    backdrop-filter: blur(20px);
    background-color: rgb(241, 94, 44, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        box-shadow: 0px 20px 20px #00000040;
        transform: scale(1.02);
    }
`