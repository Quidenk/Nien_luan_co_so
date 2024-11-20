import React, { useEffect } from 'react'
import { FormStyle, WrapperRegister } from './style'
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
    <div style={{ height: '100vh'}}>
        <WrapperRegister>
          <FormStyle
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: 'Please input your confirm password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Đăng ký
              </Button>
            </Form.Item>
          </FormStyle>
        </WrapperRegister>
    </div>
    </LoadingComponent>
  )
}

export default SignUpPage
