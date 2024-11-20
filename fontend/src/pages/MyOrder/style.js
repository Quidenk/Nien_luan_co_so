import styled  from "styled-components";

export const Wrapper = styled.div`
    background: transparent;
    max-height: 400px; /* Đặt chiều cao tối đa để xuất hiện thanh cuộn */
    overflow-y: auto; /* Bật thanh cuộn dọc */
    max-height: 400px;
    height: 400px;

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

export const Lable = styled.div`
    font-size: 25px;
    color: #fff;
    font-weight: bold;
    margin-bottom: 20px;
`

export const WrapperStyleHeader = styled.div`
  background: rgb(255, 255, 255);
  padding: 9px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  span {
    color: rgb(36, 36, 36);
    font-weight: 400;
    font-size: 13px;
  }
`
export const WrapperStyleHeaderDilivery = styled.div`
  background: rgb(255, 255, 255);
  padding: 9px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  span {
    color: rgb(36, 36, 36);
    font-weight: 400;
    font-size: 13px;
  };
  margin-bottom: 4px;
`

export const WrapperContainer = styled.div`
  width: 100%;
  background-color: #f5f5fa;
`

export const WrapperLeft = styled.div`
  width: 910px;
`

export const WrapperListOrder = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 20px;
`
export const WrapperFooterItem = styled.div`
  display: flex;
  flex-direction : column;
  gap: 10px;
  border-top: 1px solid rgb(235, 235, 240);
  width: 100%;
  align-items:flex-end;
  padding-top: 10px;
`

export const WrapperHeaderItem = styled.div`
  display: flex;
  align-items:flex-start;
  height: 90px;
  width: 100%;
`

export const WrapperItemOrder = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    box-shadow: 0 12px 12px #000;
    margin-bottom: 20px;
    border-radius: 20px;
    backdrop-filter: blur(10px);
    background: rgba(0, 0, 0, 0.2);
    padding: 30px;
    font-size: 15px;
`

export const WrapperStatus = styled.div`
  display: flex;
  align-item: flex-start;
  width: 100%;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(235, 235, 240);
  flex-direction:column;
  color: #fff;
  font-size: 17px;
`

export const WrapperLabel = styled.div`
  color: #fff;
  font-size: 25px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 15px;
`