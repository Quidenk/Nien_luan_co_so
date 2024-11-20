import { Input } from 'antd'
import React from 'react'
import { InputStyle } from './style'

const InputComponent = ({size, placeholder, bordered, style, ...rests }) => {
  return (
    <InputStyle 
        size={size} 
        placeholder={placeholder} 
        bordered={bordered} 
        style={style}
        {...rests} 
    />
  )
}

export default InputComponent