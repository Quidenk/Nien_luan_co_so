import React, { useEffect, useRef, useState } from 'react'
import { ProductsComponentStyle, WrapperButtonMore, WrapperMenuStyle } from './style'
import { Col, Row } from 'antd'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import Slider1 from '../../assets/images/banner_sale_off.jpg'
import CardProductComponent from '../../components/CardProductComponent/CardProductComponent'
import NarbavComponent from '../../components/NavbarComponent/NarbavComponent'
import { useQuery } from '@tanstack/react-query'
import { GetProductApi } from '../../util/productService'
import { useDispatch, useSelector } from 'react-redux'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
import { useDebounce } from '../../hooks/useDebounce'
import { GetTypeProduct } from '../../util/api'
import TypeProduct from '../../components/TypeProductComponent/TypeProductComponent'
import { useNavigate } from 'react-router'
import ButtonInputComponent from '../../components/ButtonInputComponent/ButtonInputComponent'
import { searchProduct } from '../../redux/slides/productSlide'


const ProductsPage = () => {
  const search_Product = useSelector((state) => state?.product?.search)
  const searchDebounce = useDebounce(search_Product, 1000)
  // const [stateProduct, setStateProduct] = useState([])
  const [loading, setLoading] = useState(false)
  const [limit, setLimit] = useState(10)
  // const refSearch = useRef()
  // const navigate = useNavigate();
  const [typeProducts, setTypeProducts] = useState([])
  // const location = useLocation()
  // const {state} = location

  // console.log('state', state)

  const fetchTypeProduct = async() => {
    const res = await GetTypeProduct()
    if(res) {
      setTypeProducts(res)
    }
  }

  useEffect(() => {
    fetchTypeProduct()
  }, [])

  const fetchProductAll = async (context) => {
    console.log('context: ', context)
    const limit = context?.queryKey && context?.queryKey[1]
    const search = context?.queryKey && context?.queryKey[2]
    const res = await GetProductApi(search, limit)
    // console.log('res: ', res)
    return res
  }

  const { data: products, isPending:isLoading, isPreviousData } = useQuery({
    queryKey: ['products', limit, searchDebounce],
    queryFn: fetchProductAll,
    retry: 3, 
    retryDelay: 1000,
    keepPreviousData: true,
  });
  
  // Log kiểm tra giá trị của isPreviousData
  // console.log(isPreviousData);

  // console.log('isPreviousData', isPreviousData, isLoading)

  // console.log('products: ', products)

  const [search, setSearch] = useState('')
  const dispatch = useDispatch()

  const onSearch = (e) => {
    console.log('e.target.value', e.target.value)
    setSearch(e.target.value)
    dispatch(searchProduct(e.target.value))
  }

  // useEffect(() =>{
  //   const reset = setup(() =>{
  //     setSearch(search)
  //   }, 3000) 
  // }, [search])

  return (
    <LoadingComponent isLoading={isLoading || loading}>

      <ProductsComponentStyle style={{ overflow: 'auto' }}>
        <Row style={{ border: '1px solid #fff', minHeight: '200vh'}}>

          <Col style={{ padding: '10px'}} span={18} push={6}>
            <SliderComponent arrImage={[ Slider1, Slider1, Slider1, Slider1 ]}/>
              <ButtonInputComponent 
                  style={{ width: '100%' }}
                  size="large"
                  bordered={false}
                  textButton="Tìm Kiếm"
                  placeholder="Input Search Text..."
                  onChange={onSearch}
                />
           

            <div style={{ padding: '10px', marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px'}}>
              {products?.result?.map((product) => {
                  return (
                    <div>
                      <CardProductComponent key={product._id} 
                                          countInStock={product.countInStock} 
                                          description={product.description} 
                                          image={product.image} 
                                          name={product.name}
                                          price={product.price}
                                          rating={product.rating}
                                          type={product.type}
                                          id={product._id}
                      />
                    </div>
                  )
              })}
            </div>

            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
              <WrapperButtonMore
                textbutton={isPreviousData ? 'Load more' : "Xem thêm"} type="outline" styleButton={{
                  border: `1px solid ${products?.total === products?.data?.length ? '#f5f5f5' : '#9255FD'}`, color: `${products?.total === products?.result?.length ? '#f5f5f5' : '#9255FD'}`,
                  width: '240px', height: '38px', borderRadius: '4px'
                }}
                disabled={products?.total === products?.result?.length || products?.totalPage === 1}
                // disabled={true}
                styleTextButton={{ fontWeight: 500, color: products?.total === products?.data?.length && '#fff'}}
                
                onClick={() => setLimit((prev) => prev + 6)}
              />
            </div>
          </Col>

          <Col style={{ padding: '10px'}} span={6} pull={18}>
              <NarbavComponent style={{ position: 'sticky' }}/> 
          </Col>

        </Row>
      </ProductsComponentStyle>
    </LoadingComponent>
  )
}

export default ProductsPage
