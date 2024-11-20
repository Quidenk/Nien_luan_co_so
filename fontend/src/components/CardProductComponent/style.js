import styled from "styled-components";

export const CardProductList = styled.div`
    display: 'flex';
    justify-content: 'space-between';
    color: '#000';
`

export const CardProduct = styled.div`
    width: 220px;
    border-radius: 20px;
    overflow: hidden;
    color: #000;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
    

    &:hover {
        box-shadow: 0px 20px 20px #00000040;
        transform: scale(1.02);
    }
`
export const CardProductSpan = styled.div`
    background: #fff;
    width: 100%;
    height: 100px;
    font-size: 18px;
    font-weight: 400;
    padding: 5px 10px;
    display: flex;
    gap: 5px;
    flex-direction: column;
`