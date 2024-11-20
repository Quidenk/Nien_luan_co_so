import React from 'react'
import { ButtonSale, DivPrice, ImgProduct, ImgProductDiv, InfoProduct, InfoProductDiv, NameProduct, OptionSelect, OrderDiv, PriceProduct, RateProduct, SelectProduct, SmallImgProduct, SmallImgProductDiv, Wrapper } from './style'

import { InputNumber, Select } from 'antd'
import { CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { GetProductDetailApi } from '../../util/productService'
import { useNavigate, useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'
import ProductDetailsComponent from '../../components/ProductDetailsComponent/ProductDetailsComponent'

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  return (
    <ProductDetailsComponent idProduct={id} />
  )
}

export default ProductDetailPage
