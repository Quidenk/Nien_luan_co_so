import styled from "styled-components";

export const Wrapper = styled.div`
  font-family: Arial, sans-serif;
  color: #333;
`;

export const HeroSection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: space-around;
  align-items: center;
  padding: 15px;
  background-color: rgba(0, 0, 0, 0.6);
  margin: 15px 0;
  border-radius: 8px;
`;

export const MainImage = styled.img`
  width: 40%;
//   border-radius: 10px;
  object-fit: cover;
  max-width: 100%;
  height: auto;
  object-fit: contain;
`;

export const InfoProduct = styled.div`
    font-size: 20px;
    border-radius: 5px;
    height: 45px;
    backdrop-filter: blur(20px);
    background-color: rgb(241, 94, 44, 0.7);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
    cursor: pointer;
    padding: 10px 20px;
`

export const InfoProductDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 50px;
`

export const OrderDiv = styled.div`
    border: 1px solid #fff;
    backdrop-filter: blur(17px);
    background-color: rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e5e5;
    border-radius: 7px;
    overflow: auto;
    color: rgb(255, 255, 255);
    font-size: 18px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 10px;
`