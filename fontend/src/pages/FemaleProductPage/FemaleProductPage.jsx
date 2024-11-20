import React, { useState } from 'react'
import { ProductsComponentStyle } from './style'
import { Col, Row } from 'antd'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import Slider1 from '../../assets/images/test.jpg'
import CardProductComponent from '../../components/CardProductComponent/CardProductComponent'
import NarbavComponent from '../../components/NavbarComponent/NarbavComponent'
import { useQuery } from '@tanstack/react-query'
import { GetFemaleProduct, GetMaleProduct, GetProductApi } from '../../util/productService'

const ManProductsPage = () => {
    // const [queryParam, setQueryParam] = useState('');

  
  const fetchFemaleProduct = async () => {
    const res = await GetFemaleProduct()
    return res
  }

  // const { data, isLoading} = useQuery(['product', fetchProductAll])
  const { data: products } = useQuery({
    queryKey: 'products',
    queryFn: fetchFemaleProduct,
  });
  
  console.log('>>> products: ', products)

  return (
    <ProductsComponentStyle style={{ overflow: 'auto' }}>
      <Row style={{ border: '1px solid #fff', minHeight: '200vh'}}>

        <Col style={{ padding: '10px'}} span={18} push={6}>
          <SliderComponent arrImage={[ Slider1, Slider1, Slider1, Slider1 ]}/>

          <div style={{ padding: '10px', marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px'}}>
            {products?.allProductfilter?.map((product) => {
                return (
                  <CardProductComponent key={product._id} 
                                        countInStock={product.countInStock} 
                                        description={product.description} 
                                        image={product.image} 
                                        name={product.name}
                                        price={product.price}
                                        rating={product.rating}
                                        type={product.type}
                  />
                )
            })}
          </div>
        </Col>

        <Col style={{ padding: '10px'}} span={6} pull={18}>
            <NarbavComponent style={{ position: 'sticky'}}/>
        </Col>

      </Row>
    </ProductsComponentStyle>
  )
}

export default ManProductsPage
