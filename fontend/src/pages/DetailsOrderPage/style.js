import styled from "styled-components"

// export const Wrapper = styled.div`
//     background: transparent;
//     padding: 50px;
    
// `

export const Wrapper = styled.div`
    background: transparent;
    padding: 50px;
    max-height: 400px; /* Đặt chiều cao tối đa để xuất hiện thanh cuộn */
    overflow-y: auto; /* Bật thanh cuộn dọc */
    max-height: 400px;
    height: 450px;
    border-radius: 20px;
    backdrop-filter: blur(10px);
    background: rgba(0, 0, 0, 0.2);
    font-size: 15px;

    /* Tùy chỉnh thanh cuộn */
    ::-webkit-scrollbar {
        width: 8px; /* Độ rộng của thanh cuộn */
    }

    ::-webkit-scrollbar-track {
        background: #f15e2c; /* Màu nền của rãnh */
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #f15e2c; /* Màu của thanh kéo */
        border-radius: 10px;
        border: 2px solid #f15e2c; /* Khoảng cách giữa thanh kéo và rãnh */
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: #f15e2c; /* Màu khi di chuột qua thanh kéo */
    }
`


export const WrapperOrder = styled.div`
    margin-bottom: 20px;
    border-radius: 20px;
    backdrop-filter: blur(10px);
    background: rgba(0, 0, 0, 0.2);
    padding: 30px;
    font-size: 15px;
`

export const WrapperHeaderUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const WrapperInfoUser = styled.div`
  .name-info {
    font-size: 15px;
    color: rgb(36, 36, 36);
    font-weight: bold;
    text-transform: uppercase;
  }
  .address,.phone-info,.delivery-info,.delivery-fee,.payment-info {
    color: rgba(0, 0, 0, 0.65);
    font-size: 15px;
    margin-top: 8px;
  }
  .name-delivery {
    color: rgb(234, 133, 0); 
    font-weight: bold;
    text-transform: uppercase;
  }
  .status-payment {
    margin-top: 8px;
    color: rgb(234, 133, 0); 
  }
`

export const WrapperLabel = styled.div`
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 15px;
`
export const WrapperContentInfo = styled.div`
    height: 80px;
    width: 320px;
    border-radius: 6px;
    padding: 10px;
    border-radius: 2px;
    backdrop-filter: blur(10px);
    background: rgba(0, 0, 0, 0.2);
    color: #fff;
    & span{
        color: #fff;
    }
`

export const WrapperStyleContent = styled.div`
  display:flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  color: #fff;
`

export const WrapperProduct = styled.div`
//   display:flex;
//   align-items:flex-start;
//   margin-top: 10px;

    flex:1;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const WrapperNameProduct = styled.div`
  display:flex;
  align-items: flex-start;
  width: 670px;
`

export const WrapperItem = styled.div`
  width: 200px;
  font-weight: bold;
  &:last-child {
    font-size: 20px;
    color: #f15e2c;
  }
`
export const WrapperItemLabel = styled.div`
  width: 200px;
  &:last-child {
    font-weight: bold;
  }
`

export const WrapperAllPrice = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: end;
`

export const Lable = styled.div`
    font-size: 25px;
    color: #fff;
    font-weight: bold;
    margin-bottom: 20px;
`