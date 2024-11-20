import { FireFilled, MenuOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { ButtonControl, ContentCard, FooterCard, NewsCard, TitleCard } from './style'
import { Card } from './style'
import { useNavigate } from 'react-router'
import ButtonInputComponent from '../ButtonInputComponent/ButtonInputComponent'
import { useDispatch } from 'react-redux'
import { searchProduct } from '../../redux/slides/productSlide'
import TypeProduct from '../TypeProductComponent/TypeProductComponent'
import { GetTypeProduct } from '../../util/api'


const NarbavComponent = () => {
    const navigate = useNavigate();
    // const [search,setSearch] = useState('')
    // const dispatch = useDispatch()
    // const onSearch = (e) => {
    //     console.log('e.target.value', e.target.value)
    //     setSearch(e.target.value)
    //     dispatch(searchProduct(e.target.value))
    // }

    const [typeProducts, setTypeProducts] = useState([])
    const fetchTypeProduct = async() => {
        const res = await GetTypeProduct()
        if(res) {
          setTypeProducts(res)
        }
    }

    useEffect(() => {
        fetchTypeProduct()
    }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px'}}>
        {/* <ButtonInputComponent 
             style={{ 
                width: '100%'
            }}
            size="large"
            bordered={false}
            textButton="Tìm Kiếm"
            placeholder="Input Search Text..."
            onChange={onSearch}
        /> */}

      <NewsCard style={{  overflow: 'auto', height: '200px'  }}>
        <span style={{ fontSize: '20px', position: 'sticky'}}><FireFilled style={{ color: 'red'}} /> News </span>
        <Card>
            <FooterCard>
                <ContentCard>
                    <TitleCard>New York</TitleCard>
                    <div>The city that never sleep.</div>
                </ContentCard>
            </FooterCard>
        </Card>
        <Card>
            <FooterCard>
                <ContentCard>
                    <TitleCard>New York</TitleCard>
                    <div>The city that never sleep.</div>
                </ContentCard>
            </FooterCard>
        </Card>
      </NewsCard>

      <NewsCard style={{ alignItems: 'center', backgroundColor: 'transparent', backdropFilter: 'none' }}>
            {typeProducts.map((item) => {
                return (
                    <ButtonControl > 
                        <TypeProduct name={item} key={item}/>
                    </ButtonControl>
                )
              })}
            {/* <ButtonControl onClick={() => {navigate("/")}}> 
                Home
            </ButtonControl>
            <ButtonControl onClick={() => navigate("/products")}> 
                Products
            </ButtonControl>
            <ButtonControl onClick={() => {navigate("/promotion")}}> 
                Sale Off
            </ButtonControl>
            <ButtonControl onClick={() => {navigate("/discover")}}> 
                Discover
            </ButtonControl> */}
      </NewsCard>
    </div>
  )
}

export default NarbavComponent
