import React, { useEffect, useState } from 'react'
import { GetProductDetailApi } from '../../util/productService';
import { useQuery } from '@tanstack/react-query';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import { BreadcrumbStyle, ButtonSale, DivPrice, ImgProduct, ImgProductDiv, InfoProduct, InfoProductDiv, NameProduct, OptionSelect, OrderDiv, PriceProduct, RateProduct, SelectProduct, SmallImgProduct, SmallImgProductDiv, Wrapper, WrapperBreadcrumbStyle } from './style';
import { InputNumber, message, Select } from 'antd';
import { CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ImgShoe from '../../assets/images/shoe1.jpg'
import ImgSmallShoe from '../../assets/images/shoe2.jpg'
import { useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addOrderProduct } from '../../redux/slides/orderSlide';
import { convertPrice } from '../../utils';

const ProductDetailsComponent = ({idProduct}) => {
    const {state} = useLocation()
    const [numProduct, setNumProduct] = useState(1)
    const [sizeProduct, setSizeProduct] = useState(null)
    const navigate = useNavigate()
    const [errorLimitOrder,setErrorLimitOrder] = useState(false)
    const [errorSizeOrder,setErrorSizeOrder] = useState(false)
    const user = useSelector((state) => state.user)
    const order = useSelector((state) => state.order)
    const location = useLocation()
    const dispatch = useDispatch()
    const fetchProductDetail = async(context) => {
        const id = context?.queryKey && context?.queryKey[1]
        if(id) {
          const res = await GetProductDetailApi(id);
          return res
        }
      }
    
      const { data: productDetails, isPending: isLoading} = useQuery({
        queryKey: ['product-details', idProduct],
        queryFn: fetchProductDetail,
        enabled: !!idProduct,
      });
        
      const handleChange = (value) => {
        setSizeProduct(value)
      };

      const onChange = (value) => {
        console.log('Giá trị số lượng:', value);
        setNumProduct(value); // Cập nhật state hoặc thực hiện hành động khác
      };
    

      useEffect(() => {
        const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id) 
        if((orderRedux?.amount + numProduct) <= orderRedux?.countInstock || (!orderRedux && productDetails?.countInStock > 0)) {
            setErrorLimitOrder(false)
        } else if(productDetails?.countInStock === 0){
            setErrorLimitOrder(true)
        }
      },[numProduct])

      

      // useEffect(() => {
      //   if(order.isSucessOrder) {
      //       message.success('Đã thêm vào giỏ hàng')
      //   }
      //   return () => {
      //       dispatch(resetOrder())
      //   }
      // }, [order.isSucessOrder])


      const handleAddOrderProduct = () => {
        if(!user?.id) {
            navigate('/sign-in', {state: location?.pathname})
            return;
        }
        if (!sizeProduct) {
          setErrorSizeOrder(true); // Hiển thị thông báo lỗi nếu chưa chọn kích thước
          return;
        }
        const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id)
        if((orderRedux?.amount + numProduct) <= orderRedux?.countInstock || (!orderRedux && productDetails?.countInStock > 0)) {
            dispatch(addOrderProduct({
                orderItem: {
                    name: productDetails?.name,
                    amount: numProduct,
                    image: productDetails?.image[0],
                    size: productDetails?.size,
                    sizeSelected: sizeProduct,
                    price: productDetails?.price,
                    product: productDetails?._id,
                    discount: productDetails?.discount,
                    countInStock: productDetails?.countInStock
                }
            }))
        } else {
            setErrorLimitOrder(true)
        }
        
    }

  const [isOpenDisc, setIsOpenDisc] = useState(false);
  const [isOpenRegu, setIsOpenRegu] = useState(false);
  const [isOpenGua, setIsOpenGua] = useState(false);

  // const toggleText = (option) => {
  //   if (option == 'info'){
  //     setIsOpen(prevState => !prevState);
  //   }
  // };

      console.log('productdetail', productDetails)

      // Chuyển đổi mảng size thành options
      const sizeOptions = productDetails?.size.map((item) => ({
        value: item,
        label: item,
      }));

      return (
        <LoadingComponent isLoading={isLoading}>
          <div style={{ height: '100vh', display: 'flex', gap: '3%'}}>

              <Wrapper >
                  <WrapperBreadcrumbStyle>
                      <BreadcrumbStyle separatorColor='#fff'
                          items={[
                            {
                              title: <a onClick={() => navigate("/products")}>Products</a>,
                            },
                            {
                              title: `${state}`,
                            },
                          ]}
                        />
                  </WrapperBreadcrumbStyle>

                  <ImgProductDiv>
                      <ImgProduct src={productDetails?.image[0]}/>
                  </ImgProductDiv>
    
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '10px'}}>
                      <SmallImgProductDiv>
                          <SmallImgProduct src={productDetails?.image}/>
                      </SmallImgProductDiv>
                  </div>
              </Wrapper>
    
              <OrderDiv>
                  <div>
                    <NameProduct>{productDetails?.name}</NameProduct>
                    <RateProduct>
                      <span>Mã sản phẩm: ALP2401</span>
                      <span>Tình trạng: {productDetails?.countInStock}</span>
                    </RateProduct>
                  </div>
    
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '70px'}}>
                    <span> Giá: </span>
                    <DivPrice>
                      <PriceProduct>{convertPrice(productDetails?.price)} VND</PriceProduct>
                    </DivPrice>
                  </div>
    
                  <SelectProduct style={{ gap: '150px'}}>
                    <OptionSelect>
                      <span> Kích thước </span>
                      <Select
                        defaultValue=""
                        style={{ width: 120 }}
                        onChange={handleChange}
                        // options={[
                        //   { value: 'jack', label: 'Jack' },
                        //   { value: 'lucy', label: 'Lucy' },
                        //   { value: 'Yiminghe', label: 'yiminghe' },
                        // ]}
                        options={sizeOptions} // Gắn danh sách options từ size
                      />
                      {errorSizeOrder && <div style={{color: '#f15e2c'}}>Vui lòng chọn size.</div>}
                    </OptionSelect>
                    
    
                    <OptionSelect>
                    <span> Số lượng </span>
                      <InputNumber min={1} max={productDetails?.countInStock} defaultValue={productDetails?.countInStock === 0 ? 0 : 1} onChange={onChange} />
                      {errorLimitOrder && <div style={{color: '#f15e2c'}}>Sản phẩm hết hàng.</div>}
                    </OptionSelect>

                    
                  </SelectProduct>
    
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '3%'}}>
                    {/* <ButtonSale 
                      style={{ width: '100%', height: '70px', backgroundColor: '#f15e2c'}}
                      
                    > 
                      Mua ngay 
                    </ButtonSale> */}
                    <ButtonSale 
                      style={{ width: '100%', height: '70px', backgroundColor: '#f15e2c'}}
                      onClick={handleAddOrderProduct}
                    >
                      <ShoppingCartOutlined />
                    </ButtonSale>

                    
                  </div>
    
                  <InfoProductDiv>
                      <div>
                        <InfoProduct onClick={() =>{setIsOpenDisc(prevState => !prevState)}} style={{ cursor: 'pointer' }}> 
                          THÔNG TIN SẢN PHẨM 
                            <CaretDownOutlined />
                        </InfoProduct>
                        {isOpenDisc && <div style={{ padding: '10px 20px', backgroundColor: 'rgba(0, 0, 0, 0.1)', borderRadius: '5px'}}>{productDetails?.description}</div>}
                      </div>
                      <div>
                        <InfoProduct onClick={() =>{setIsOpenRegu(prevState => !prevState)}} style={{ cursor: 'pointer' }}> 
                          QUY ĐỊNH ĐỔI SẢN PHẨM
                            <CaretDownOutlined />
                        </InfoProduct>
                          {isOpenRegu && <div style={{ padding: '10px 20px', backgroundColor: 'rgba(0, 0, 0, 0.1)', borderRadius: '5px'}}>
                            - Chỉ đổi hàng 1 lần duy nhất, mong bạn cân nhắc kĩ trước khi quyết định.<br/><br/>
                            - Thời hạn đổi sản phẩm khi mua trực tiếp tại cửa hàng là 07 ngày, kể từ ngày mua. Đổi sản phẩm khi mua online là 14 ngày, kể từ ngày nhận hàng.<br/><br/>
                            - Sản phẩm đổi phải kèm hóa đơn. Bắt buộc phải còn nguyên tem, hộp, nhãn mác.<br/><br/>
                            - Sản phẩm đổi không có dấu hiệu đã qua sử dụng, không giặt tẩy, bám bẩn, biến dạng.<br/><br/>
                            - Ananas chỉ ưu tiên hỗ trợ đổi size. Trong trường hợp sản phẩm hết size cần đổi, bạn có thể đổi sang 01 sản phẩm khác:<br/><br/>
                              + Nếu sản phẩm muốn đổi ngang giá trị hoặc có giá trị cao hơn, bạn sẽ cần bù khoảng chênh lệch tại thời điểm đổi (nếu có).<br/><br/>
                              + Nếu bạn mong muốn đổi sản phẩm có giá trị thấp hơn, chúng tôi sẽ không hoàn lại tiền.<br/><br/>
                            - Trong trường hợp sản phẩm - size bạn muốn đổi không còn hàng trong hệ thống. Vui lòng chọn sản phẩm khác.<br/><br/>
                            - Không hoàn trả bằng tiền mặt dù bất cứ trong trường hợp nào. Mong bạn thông cảm.<br/><br/>
                            - Không áp dụng chính sách đổi hàng với các sản phẩm đang áp dụng chương trình Sale Off từ 40% trở lên.<br/><br/>
                          </div>}
                      </div>
                      <div>
                        <InfoProduct onClick={() =>{setIsOpenGua(prevState => !prevState)}} style={{ cursor: 'pointer' }}> 
                          BẢO HÀNH THẾ NÀO ?
                            <CaretDownOutlined />
                        </InfoProduct>
                          {isOpenGua && <div style={{ padding: '10px 20px', backgroundColor: 'rgba(0, 0, 0, 0.1)', borderRadius: '5px'}}>
                            Mỗi đôi giày Ananas trước khi xuất xưởng đều trải qua nhiều khâu kiểm tra. Tuy vậy, trong quá trình sử dụng, nếu nhận thấy các lỗi: gãy đế, hở đế, đứt chỉ may,...trong thời gian 6 tháng từ ngày mua hàng, mong bạn sớm gửi sản phẩm về Ananas nhằm giúp chúng tôi có cơ hội phục vụ bạn tốt hơn. Vui lòng gửi sản phẩm về bất kỳ cửa hàng Ananas nào, hoặc gửi đến trung tâm bảo hành Ananas ngay trong trung tâm TP.HCM trong giờ hành chính:<br/>
                            <br/>
                            Địa chỉ: 5C Tân Cảng, P.25, Q.Bình Thạnh , TP. Hồ Chí Minh.<br/><br/>
                            Hotline: 028 2211 0067<br/><br/>
                          </div>}
                      </div>
                  </InfoProductDiv>
              </OrderDiv>
          </div>
        </LoadingComponent>
  )
}

export default ProductDetailsComponent
