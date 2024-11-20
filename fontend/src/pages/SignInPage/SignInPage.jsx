import React, { useContext, useEffect } from 'react';
import { FormStyle, WrapperLogIn } from './style';
import { Button, Form, Input, notification } from 'antd';
import { GetProfileUserApi, LogInUserApi } from '../../util/api';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../components/context/auth.context';
import { useDispatch, useSelector } from 'react-redux';
import { useMutationHooks } from '../../hooks/useMutationHook';
import { jwtDecode } from 'jwt-decode';
import { updateUser } from '../../redux/slides/userSlide';


const SignInPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user  = useSelector((state) => state.user)
  // const { auth, setAuth } = useContext(AuthContext)
      
  // const dispatch = useDispatch();

  // const onFinish = async (values) => {
  //   const { email, password } = values;

  //   const res = await LogInUserApi( email, password );

  //   console.log('access Token: ', res.access_token)

  //   if (res && res.EC === 0) {
  //     localStorage.setItem('access_token', res.access_token)
  //     notification.success({
  //       message: "LOGIN SUCCESS",
  //       description: 'success'
  //     });
  //     setAuth({
  //       isAutheticated: true,
  //       user: {
  //           email: res?.user?.email ?? "",
  //           name: res?.user?.name ?? "",
  //           phone: res?.user?.phone ?? "",
  //           address: res?.user?.address ?? "",
  //           avatar: res?.user?.avatar ?? "",
  //         }
  //     })

  //     const userData = {
  //       email: res?.user?.email ?? "",
  //       name: res?.user?.name ?? "",
  //       phone: res?.user?.phone ?? "",
  //       address: res?.user?.address ?? "",
  //       avatar: res?.user?.avatar ?? "",
  //       access_token: res?.access_token,
  //   };

  //   dispatch(updateUser(userData));

  //     navigate("/");
  //   }else {
  //     notification.error({
  //       message: "LOGIN LOSSER",
  //       description: res?.EM ?? "error"
  //     })
  //   }


  //   console.log('>> Success:', values);
  // };
  // const onFinishFailed = (errorInfo) => {
  //   console.log('Failed:', errorInfo);
  // };
  const mutation = useMutationHooks(
    ({ email, password }) => LogInUserApi(email, password)
  )
  const { data, isPending: isLoading, isSuccess, isError} = mutation

  useEffect(() => {
    if (data?.EC == 0) {
      notification.success({
        message: "SUCCESS LOGN IN"
      });
      if(location?.state) {
        navigate(location?.state)
      }else {
        navigate('/')
      }
      localStorage.setItem('access_token', JSON.stringify(data?.access_token))
      localStorage.setItem('refresh_token', JSON.stringify(data?.refresh_token))
      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token)
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, data?.access_token)
        }
    }}else if(data?.EC == 1 || data?.EC == 2){
      notification.error({
        message: "ERROR LOGN IN"
      });
      navigate('/sign-in')
    }
  }, [isSuccess, isError])

  const handleGetDetailsUser = async (id, token) => {
    const storage = localStorage.getItem('refresh_token')
    const refreshToken = JSON.parse(storage)
    const res = await GetProfileUserApi(id)
    console.log('res: ', res)
    dispatch(updateUser({ ...res[0], access_token: token, refreshToken}))
  }

  const onFinish = (values) => {
    const { email, password } = values;
    console.log('values: ', values)
    mutation.mutate({ email, password })
    
  }

  return (
    <div>
        <div style={{ height: '100vh'}}>
        <WrapperLogIn>
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

            <Form.Item>
              <Button type="primary" htmlType="submit">
                LogIn
              </Button>
            </Form.Item>
          </FormStyle>
        </WrapperLogIn>
      </div>
    </div>
  )
}

export default SignInPage
