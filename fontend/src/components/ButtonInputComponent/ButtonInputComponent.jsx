import React, { useState } from 'react'
import { SearchOutlined } from '@ant-design/icons';
import InputComponent from '../InputComponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import { useNavigate } from 'react-router';


const ButtonInputComponent = (props) => {
  const {
    size, placeholder, textbutton,
    bordered, backgroundColorInput = '#fff',
    backgroundColorButton = 'rgba(255, 255, 255, 0.3)',
    colorButton = '#fff'
  } = props
  // const {inputValue, setInputValue} = useState('')
  // const navigate = useNavigate()

  // const handleNavigate = (e) => {
  //   console.log("e.target.value", e.target.value);
  //   const search = e.target.value
  //   navigate('/products', {state: search})
  // }

  return (
    <div style={{ display: 'flex', border: '1px solid #fff', width: '100%', borderRadius: '20px'}}>
      <InputComponent
        size={size}
        placeholder={placeholder}
        bordered={bordered}
        style={{ backgroundColor: backgroundColorInput }}
        // value={inputValue} // giá trị của input
        // onChange={handleNavigate} // cập nhật giá trị input vào state
        {...props}
      />
      <ButtonComponent
        size={size}
        styleButton={{ background: backgroundColorButton, border: !bordered && 'none' }}
        icon={<SearchOutlined color={colorButton} style={{ color: '#fff' }} />}
        textbutton={textbutton}
        styleTextButton={{ color: colorButton }}
      />
  </div>
  )
}

export default ButtonInputComponent
