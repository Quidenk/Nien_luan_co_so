// import { Image } from 'antd';
// import React from 'react';
// import Slider from "react-slick";

// const SliderComponent = ({ arrImage }) => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     pauseOnHover: true,
//     arrows: false,
//     dotsClass: "slick-dots custom-dots",
//   };

//   return (
//     <div
//       style={{
//         border: '1px solid #ddd',
//         borderRadius: '15px',
//         overflow: 'hidden',
//         boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
//         margin: '20px auto',
//         maxWidth: '800px',
//         backgroundColor: '#f9f9f9',
//       }}
//     >
//       <Slider {...settings}>
//         {arrImage.map((img, index) => (
//           <div
//             key={index}
//             style={{
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               height: '400px', // Chiều cao cố định cho slider
//             }}
//           >
//             <img
//               src={img}
//               alt={`slider-img-${index}`}
//               style={{
//                 maxWidth: '100%',
//                 maxHeight: '100%',
//                 objectFit: 'contain', // Giữ nguyên tỉ lệ và căn giữa
//               }}
//             />
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default SliderComponent;



import React, { useState, useEffect } from "react";

const SliderComponent = ({ arrImage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Tự động chuyển slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Thời gian chuyển slide (ms)
    return () => clearInterval(interval); // Xóa interval khi component unmount
  }, [currentIndex]);

  // Chuyển đến slide tiếp theo
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % arrImage.length);
  };

  // Quay lại slide trước
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + arrImage.length) % arrImage.length);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "800px",
        height: "400px",
        margin: "20px auto",
        overflow: "hidden",
        borderRadius: "15px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Các slide */}
      <div
        style={{
          display: "flex",
          transition: "transform 0.5s ease-in-out",
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {arrImage.map((img, index) => (
          <div
            key={index}
            style={{
              minWidth: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f9f9f9",
            }}
          >
            <img
              src={img}
              alt={`slide-${index}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover", // Lấp đầy khung giữ tỷ lệ
              }}
            />
          </div>
        ))}
      </div>

      {/* Nút điều hướng */}
      <button
        onClick={prevSlide}
        style={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: "30px",
          height: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        {"<"}
      </button>
      <button
        onClick={nextSlide}
        style={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: "30px",
          height: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        {">"}
      </button>

      {/* Dấu chấm điều hướng */}
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "8px",
        }}
      >
        {arrImage.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: currentIndex === index ? "#000" : "#ccc",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SliderComponent;
