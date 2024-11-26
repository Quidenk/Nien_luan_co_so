import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Anh from '../../assets/images/shoe1.jpg'
import {Wrapper, Navbar, Logo, NavLinks, NavLink, Icons, SearchIcon, Title, MainText, HeroSection, CartIcon, Category, ProductCategories, MainImage, Subtitle, Button, CategoryLabel, CTAButtons, CategoryImage, Text } from './style'
import Img1 from '../../assets/images/hpage7.jpg'
import Img2 from '../../assets/images/hpage5.jpg'
import Img3 from '../../assets/images/hpage6.jpg'
import Img4 from '../../assets/images/hpage8.jpg'
import ImgDiscover from '../../assets/images/discover3.jpg'
import Banner from '../../assets/images/banner_sale_off.jpg'
import { useNavigate } from 'react-router';


const HomePage = () => {
  const navigate = useNavigate()
  const slides = [
    "BUY 2 GET 10% OFF - ÁP DỤNG VỚI TẤT CẢ BASIC TEE",
    "HÀNG 2 TUẦN NHẬN ĐỔI - GIÀY NỬA NĂM BẢO HÀNH",
    "FREE SHIPPING VỚI HOÁ ĐƠN TỪ 500K !"
  ];

  
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

  return (
    <Wrapper>

      {/* <div style={{    
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
      </div>    */}

      {/* <Navbar>
        <Logo>SHOE STORE</Logo>
        <NavLinks>
          <NavLink>Nam</NavLink>
          <NavLink>Nữ</NavLink>
          <NavLink>Trẻ em</NavLink>
          <NavLink>Giảm giá</NavLink>
          <NavLink>Khám phá</NavLink>
        </NavLinks>
        <Icons>
          <SearchIcon>🔍</SearchIcon>
          <CartIcon>🛒</CartIcon>
        </Icons>
      </Navbar> */}
      <HeroSection>
        <MainText style={{ gap: '15px'}}>
            <Text>
              <div 
                style={{ display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'start',
                        gap: 'inherit' }}
              >
              <span style={{fontSize: '30px', fontWeight: '1000'}}>
                FOR <br/>
                EVERYONE BUT <br/>
                NOTANYONE <br/>
              </span>

              <button 
                style={{
                  width: '30%',
                  fontWeight: '600',
                  marginTop: '20px',
                  padding: '10px 20px',
                  backgroundColor: '#f15e2c',
                  color: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '20px',
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: '0',
                }}
                onClick={() => {navigate('/products')}}
              >
                SẢN PHẨM
              </button>
              </div>

              <span style={{ fontSize: '15px', fontWeight: '300', marginBottom: '-20px'}}>
              "We establish personal relationships with our boutiques <br/>
              to ensure each one is vetted for a stress-free shopping experience."
              </span>
            </Text>
           <div style={{ 
              display: 'flex', 
              flexDirection: 'row', 
              justifyContent: 'space-around',
              alignItems: 'normal',
              gap: '20px',
            }}>
              <img style={{ maxWidth: '30%', height: 'auto', borderRadius: '5px'}} src={Img2} alt="Product Poster"></img>
              <img style={{ maxWidth: '30%', height: 'auto', borderRadius: '5px'}} src={Img3} alt="Product Poster"></img>
              <img style={{ maxWidth: '30%', height: 'auto', borderRadius: '5px'}} src={Img4} alt="Product Poster"></img>
           </div>
        </MainText>
        <MainImage src={Img1} alt="Product Poster" />
      </HeroSection>
      <HeroSection >
        <MainText>
          <Title style={{ margin: '10px 0'}}>SỰ KÌ DIỆU TỪ THIẾT KẾ ĐẾN CÔNG NGHỆ</Title>
          
          <div 
            style={{  
              overflow: 'hidden', // Ẩn phần nội dung tràn
              display: '-webkit-box', // Hỗ trợ giới hạn số dòng
              WebkitBoxOrient: 'vertical', // Định hướng theo chiều dọc
              WebkitLineClamp: 5, // Giới hạn số dòng hiển thị (ở đây là 3)
              textOverflow: 'ellipsis', // Hiển thị "..." khi nội dung bị cắt
              // lineHeight: '1.5em', // Khoảng cách giữa các dòng
              // maxHeight: '4.5em', // Giới hạn chiều cao (số dòng * lineHeight)
              wordBreak: 'break-word', // Ngắt từ khi quá dài
            }}
          >
            <Subtitle>Khám phá cấu tạo giày mang đến những điều thú vị không ngờ, khi mỗi chi tiết đều ẩn chứa một câu chuyện thiết kế và công nghệ. Phần đế giày, chẳng hạn, không chỉ được làm từ cao su hay EVA để tăng độ bền và giảm sốc, mà còn có thể tích hợp công nghệ chống trơn trượt hay hỗ trợ chuyển động. Lớp lót bên trong không đơn thuần là để tạo cảm giác thoải mái, mà còn được thiết kế để thấm hút mồ hôi và ngăn mùi. Thậm chí, phần upper (thân giày) được tạo nên từ da, vải, hoặc vật liệu tái chế, vừa thời trang vừa bền vững. Mỗi đôi giày là sự kết hợp khéo léo giữa nghệ thuật, khoa học và sự sáng tạo.</Subtitle>
          </div>
          <button 
            style={{
              width: '30%',
              fontWeight: '600',
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#f15e2c',
              color: 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '20px',
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
            onClick={() => {navigate('/discover')}}
          >
            KHÁM PHÁ
          </button>
        </MainText>
        <MainImage style={{ height: '30%', width: '30%', height: 'auto', borderRadius: '5px'}} src={ImgDiscover} alt="dicover image" />
      </HeroSection>
      <HeroSection style={{ padding: '0', position: 'relative' }}>
        <MainImage 
          style={{ 
            width: '100%', 
            height: 'auto', 
            borderRadius: '5px' 
          }} 
          src={Banner} 
          alt="discover image" 
        />
        <button 
          style={{
            position: 'absolute', // Định vị tương đối với thẻ cha
            top: '58px', // Cách đáy 20px
            right: '20px', // Cách phải 20px
            width: '30%',
            fontWeight: '600',
            padding: '10px 20px',
            backgroundColor: '#FFF',
            color: '#000',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '20px',
          }}
          onClick={() => {navigate('/promotion')}}
        >
          SĂN SALE THÔI !!
        </button>
      </HeroSection>
    </Wrapper>
  );
};

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

export default HomePage;