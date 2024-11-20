import styled from "styled-components";

export const InputComponentStyle = styled.div`
    border: 1px solid #fff;
    border-radius: 30px;
    background-color: rgba(255, 255, 255, 0.3);
    display: flex;
    gap: 10px;
    padding: 5px 10px;
    // justify-content: center;
    width: 80%;
`

export const InputStyle = styled.input`
    align-items: center;
    font-family: "Odibee Sans", sans-serif;
    font-size: 20px;
    background-color: transparent;
    border: none;
    width: 90%;
    &::placeholder {
        color: #s5s5s5;
        font-size: 15px;
    }

    &:focus {
        outline: none;
    }
    
`