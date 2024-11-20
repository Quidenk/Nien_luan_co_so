import React, { useEffect, useState } from 'react'
import { Cart, SelectionStyle, UIXCAB, WrapperColHeader, WrapperHeader } from './style'
import { Badge, Row } from 'antd';
import {
  ShoppingCartOutlined,
} from '@ant-design/icons';
import AccountHeaderComponent from '../AccountHeaderComponent/AccountHeaderComponent';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';


const HeaderComponent = () => {
  const navigate = useNavigate()
  const order = useSelector((state) => state.order)
  // const [search,setSearch] = useState('')
  // const dispatch = useDispatch()

  // const onSearch = (e) => {
  //   console.log('e.target.value', e.target.value)
  //   setSearch(e.target.value)
  //   dispatch(searchProduct(e.target.value))
  // }

  // useEffect(() =>{
  //   const reset = (() =>{
  //     setSearch(search)
  //   }, 3000) 
  // }, [search])

  const [currentIndex, setCurrentIndex] = useState(0);

  // Tự động chuyển slide sau mỗi 2 giây
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const slides = [
    "BUY 2 GET 10% OFF - ÁP DỤNG VỚI TẤT CẢ BASIC TEE",
    "HÀNG 2 TUẦN NHẬN ĐỔI - GIÀY NỬA NĂM BẢO HÀNH",
    "FREE SHIPPING VỚI HOÁ ĐƠN TỪ 500K !"
  ];

  return (
    <div style={{marginBottom: '20px'}}>
        <WrapperHeader>
          <Row style={{ height: '100%'}}>
            <WrapperColHeader  span={7}>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', fontSize: '18px', fontWeight: '600'}}>
                    <SelectionStyle onClick={()=>{navigate('/products')}}>SẢN PHẨM</SelectionStyle>
                    <div style={{ fontSize: '12px', fontWeight: '0'}}>|</div>
                    <SelectionStyle onClick={()=>{navigate('/promotion')}}>SALE OFF</SelectionStyle>
                    <div style={{ fontSize: '12px', fontWeight: '0'}}>|</div>
                    <SelectionStyle onClick={()=>{navigate('/discover')}}>DISCOVER</SelectionStyle>
                </div>
            </WrapperColHeader>

            <WrapperColHeader span={10}>
                <UIXCAB style={{ fontSize: '35px', fontWeight: '1000', cursor: 'pointer'}} onClick={()=>{navigate('/')}}>UIXCAB</UIXCAB>
            </WrapperColHeader>

            <WrapperColHeader span={7}>
                <Badge count={order?.orderItems?.length} size="small">
                  <Cart onClick={() => navigate('/order')}/>
                </Badge>
                <AccountHeaderComponent/>
            </WrapperColHeader>
          </Row>
      </WrapperHeader>

      <div style={{    
        backdropFilter: "blur(20px)",
        background: 'rgba(0, 0, 0, 0.1)',
        width: '100%',
        borderRadius: '4px',
      }}>     
        <div style={styles.container}>
          <button style={styles.button} onClick={prevSlide}>&lt;</button>
            <div style={styles.slide}>
              {slides[currentIndex]}
            </div>
          <button style={styles.button} onClick={nextSlide}>&gt;</button>
        </div>
      </div>
    </div>   
  )
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '30px',
    padding: '10px 0',
    maxWidth: '600px',
    margin: '0 auto'
  },
  slide: {
    flex: 1,
    textAlign: 'center',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333'
  },
  button: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer'
  }
};

export default HeaderComponent