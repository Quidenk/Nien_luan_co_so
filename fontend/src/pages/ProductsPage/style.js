import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const ProductsComponentStyle = styled.div`
    border: 1px solid #e5e5e5;
    border-radius: 7px;
    backdrop-filter: blur(17px);
    background-color: rgba(0, 0, 0, 0.3);
    height: 100vh; 
    color: #fff;
`

export const WrapperButtonMore = styled(ButtonComponent)`
    &:hover {
        color: #fff;
        background: #9255FD;
        span {
            color: #fff;
        }
    }
    width: 100%;
    color: #9255FD;
    text-align: center;
    cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointers'}
`

export const WrapperMenuStyle = styled.div`
    font-size: 20px;
    border: 1px solid #fff;
    border-radius: 40px;
    width: 100%;
    padding: 10px 0px;
    backdrop-filter: blur(20px);
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    font-weight: 600;
    gap: 40px;
`