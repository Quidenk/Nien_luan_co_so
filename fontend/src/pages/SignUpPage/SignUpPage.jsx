import React, { useEffect } from 'react'
import { ButtonAntD, FormStyle, InputStyle, LinkStyle, LoginStyle, WrapperRegister } from './style'
import { Button, Form, Input, message, notification } from 'antd'
import { createUserApi } from '../../util/api';
import { useNavigate } from 'react-router';
import { useMutationHooks } from '../../hooks/useMutationHook';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';

const SignUpPage = () => {
  const navigate = useNavigate()

  const mutation = useMutationHooks(
    ({name, email, password}) => createUserApi(name, email, password)
)

  const { data, isPending: isLoading, isSuccess, isError } = mutation

  useEffect(() => {
    if (isSuccess) {
      notification.success({
        message: "SUCCESS CREATE USER"
      });
      navigate("/sign-in");
    } else if (isError) {
      notification.error({
        message: "ERROR CREATE USER",
        description: "error"
      })
    }
  }, [isSuccess, isError])

  const onFinish = async (values) => {
    const {name, email, password, confirmPassword} = values;
    // console.log('values: ', values)
    if (password === confirmPassword){
      // console.log('password == confirmPassword', password, confirmPassword)
      mutation.mutate({name, email, password})
    }else {
      notification.error({
        message: "Confirm password incorrect",
        description: "error"
      })
    } 
      // mutation.mutate({})
    // const res = await createUserApi(name, email, password);

    // if (res) {
    //   notification.success({
    //     message: "CREATE USER"
    //   });
    //   navigate("/sign-in");
    // }else {
    //   notification.error({
    //     message: "CREATE USER",
    //     description: "error"
    //   })
    // }


    // console.log('>> Success:', values);
  };

  return (
    <LoadingComponent isLoading={isLoading}>
    <LoginStyle style={{ height: '100vh' }}>
    <WrapperRegister style={{backdropFilter: 'blur(17px)', backgroundColor: 'rgba(0, 0, 0, 0.3)', color: '#fff'}}>
          
          <FormStyle
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 20 }}
          onFinish={onFinish}
          autoComplete="on"
          // form={form}
    >
          <div style={{ fontSize: '30px', fontWeight: '600', color: '#fff', display: 'flex', justifyContent: 'center', marginBottom: '20px'}}>
              ĐĂNG KÝ TÀI KHOẢN
          </div>
          
          <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
          >
          <InputStyle style={{ color: '#fff', fontWeight: '600'}} name="name" />
          </Form.Item>

          <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
          >
          <InputStyle style={{ color: '#fff', fontWeight: '600'}} name="email" />
          </Form.Item>

          <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
          >
          <InputStyle style={{ color: '#fff', fontWeight: '600'}} name="password" />
          </Form.Item>

          <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              rules={[{ required: true, message: 'Please input your confirm password!' }]}
          >
          <InputStyle style={{ color: '#fff', fontWeight: '600'}} name="confirmPassword" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 5, span: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <LinkStyle  onClick={() => {navigate('/sign-in')}}>Tôi đã có tài khoản.</LinkStyle>
              </div>
              
              <div>
                <ButtonAntD type="default" htmlType="submit">
                    Sinup
                </ButtonAntD>
              </div>
              </div>
          </Form.Item>
      </FormStyle>
        </WrapperRegister>
        </LoginStyle>    
      </LoadingComponent>

  )
}

export default SignUpPage
