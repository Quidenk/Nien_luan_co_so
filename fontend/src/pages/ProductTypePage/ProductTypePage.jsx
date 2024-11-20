import React, { useEffect, useRef, useState } from 'react'
import { BreadcrumbStyle, ProductsComponentStyle, WrapperBreadcrumbStyle, WrapperButtonMore, WrapperMenuStyle } from './style'
import { Breadcrumb, Col, Pagination, Row } from 'antd'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import Slider1 from '../../assets/images/test.jpg'
import CardProductComponent from '../../components/CardProductComponent/CardProductComponent'
import NarbavComponent from '../../components/NavbarComponent/NarbavComponent'
import { useQuery } from '@tanstack/react-query'
import { GetProductApi, getProductType } from '../../util/productService'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
import { useDebounce } from '../../hooks/useDebounce'
import { GetTypeProduct } from '../../util/api'
import TypeProduct from '../../components/TypeProductComponent/TypeProductComponent'
import ButtonInputComponent from '../../components/ButtonInputComponent/ButtonInputComponent'
import { searchProduct } from '../../redux/slides/productSlide'


const ProductsTypePage = () => {
  const search_Product = useSelector((state) => state?.product?.search)
  const searchDebounce = useDebounce(search_Product, 500)

  const navigate = useNavigate()
  const { state }  = useLocation()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [panigate, setPanigate] = useState({
      page: 0,
      limit: 10,
      total: 1,
  })

  const fetchProductType = async (type, page, limit) => {
    setLoading(true)
    const res = await getProductType(type, page, limit)
    if(res) {
        setLoading(false)
        setProducts(res?.result)
        console.log('res: ', res)
        setPanigate({...panigate, total: res?.totalPage})
    }else {
        setLoading(false)
    }
  }

  console.log('searchProduct: ', searchProduct)

  useEffect(() =>{
    if(state){
        fetchProductType(state, panigate.page, panigate.limit)
        console.log('panigate', panigate)
    }
  }, [state, panigate.page, panigate.limit])

  const onChange = (current, pageSize) => {
    setPanigate({...panigate, page: current - 1, limit: pageSize})    
  }

  const [search,setSearch] = useState('')
  const dispatch = useDispatch()

  const onSearch = (e) => {
    console.log('e.target.value', e.target.value)
    setSearch(e.target.value)
    dispatch(searchProduct(e.target.value))
  }

  // useEffect(() =>{
  //   const reset = (() =>{
  //     setSearch(search)
  //   }, 3000) 
  // }, [search])

  return (
    // <div><span>product {state} page</span></div>
    <LoadingComponent isLoading={loading}>
      <ProductsComponentStyle style={{ overflow: 'auto'}}>
        <Row style={{ border: '1px solid #fff', minHeight: '200vh'}}>

          <Col style={{ padding: '10px'}} span={18} push={6}>
            <ButtonInputComponent 
                  style={{ width: '100%'}}
                  size="large"
                  bordered={false}
                  textButton="Tìm Kiếm"
                  placeholder="Input Search Text..."
                  onChange={onSearch}
              />
            <WrapperBreadcrumbStyle style={{ marginTop: '10px' }}>
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

            <div style={{ padding: '10px', marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px'}}>
              {products?.filter((pro) => {
                  if(searchDebounce === '') {
                      return pro
                  }else if(pro?.name?.toLowerCase()?.includes(searchDebounce?.toLowerCase())) {
                      return pro
                  }
              })?.map((product) => {
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
              {/* <WrapperButtonMore
                textbutton={isPreviousData ? 'Load more' : "Xem thêm"} type="outline" styleButton={{
                  border: `1px solid ${products?.total === products?.data?.length ? '#f5f5f5' : '#9255FD'}`, color: `${products?.total === products?.result?.length ? '#f5f5f5' : '#9255FD'}`,
                  width: '240px', height: '38px', borderRadius: '4px'
                }}
                disabled={products?.total === products?.result?.length || products?.totalPage === 1}
                // disabled={true}
                styleTextButton={{ fontWeight: 500, color: products?.total === products?.data?.length && '#fff'}}
                
                onClick={() => setLimit((prev) => prev + 6)}
              /> */}
              {/* panigate?.total */}
              <Pagination 
                defaultCurrent={panigate.page + 1}
                total={panigate.total}          // Tổng số bản ghi
                pageSize={10}       // Số lượng bản ghi trên mỗi trang  
                onChange={onChange} 
                style={{ textAlign: 'center', marginTop: '10px' }} 
              />
            </div>
          </Col>
          
          <Col style={{ padding: '10px'}} span={6} pull={18}>
              <NarbavComponent style={{ position: 'sticky'}}/> 
          </Col>

        </Row>
      </ProductsComponentStyle>
    </LoadingComponent>
  )
}

export default ProductsTypePage
