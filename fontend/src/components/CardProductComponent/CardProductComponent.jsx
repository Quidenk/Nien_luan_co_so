import React from 'react'
import Card from '../../assets/images/bg.jpg'
import { Rate } from 'antd'
import { CardProduct, CardProductSpan } from './style'
import { useNavigate } from 'react-router'
import { convertPrice } from '../../utils'

const CardProductComponent = (props) => {
  const { countInStock, description, image, name, price, rating, type, id} = props
  const navigate = useNavigate()
  const handleDetailsProduct = (id, name) => {
    navigate(`/product-details/${id}`, { state:name })
  }
  
  return (
    <CardProduct 
    style={{ width: '220px', borderRadius: '20px', overflow: 'hidden'}}
    onClick={() =>  handleDetailsProduct(id, name)}
    >
        <img style={{ width: '100%'}} src={image}/>
        <CardProductSpan>
            <span 
              style={{overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'}}
            >
              {name}
            </span>
            <Rate style={{ fontSize: '10px', margin: '3px 0 0 0'}} allowHalf defaultValue={rating}/>
            <span style={{ marginTop: '15px', color: 'rgb(241, 94, 44)', fontWeight: '600', display: 'flex', justifyContent: 'end', marginRight: '20px'}}>{convertPrice(price)}<sup>₫</sup></span>
        </CardProductSpan>
    </CardProduct>
  )
}

export default CardProductComponent
