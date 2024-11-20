import React, { Fragment, useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from './routes/index'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import BackGround from './assets/images/bg.jpg'
import axios from './util/axios.customzie'
import { AuthContext } from './components/context/auth.context'
import { Spin } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { isJsonString } from './utils'
import { jwtDecode } from 'jwt-decode';
import { GetProfileUserApi } from './util/api'
import { updateUser } from './redux/slides/userSlide'



function App() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false)
    const user = useSelector((state) => state.user)
    // const { setAuth, appLoading, setAppLoading } = useContext(AuthContext);

    // useEffect(() => {
    //     const fetchAccount = async () => {
    //         setAppLoading(true);

    //         const res = await axios.get('/v1/api/user');
    //         if(res){
    //             setAuth({
    //                 isAutheticated: true,
    //                 user: {
    //                     email: res.email,
    //                     name: res.name,
    //                     phone: res.phone,
    //                     address: res.address,
    //                     avatar: res.avatar,
    //                 }
    //             })
    //         }

    //         setAppLoading(false);
    //     }

    //     fetchAccount()
    // }, [])

    useEffect(() => {
        setIsLoading(true)
        const { storageData, decoded } = handleDecoded()
        // console.log('storageData, decoded: ', storageData, decoded)
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, storageData)
        }
        setIsLoading(false)
    }, [])

    const handleDecoded = () => {
        let storageData = user?.access_token || localStorage.getItem('access_token')
        let decoded = {}
        if (storageData && isJsonString(storageData) && !user?.access_token) {
        storageData = JSON.parse(storageData)
        decoded = jwtDecode(storageData)
        }
        return { decoded, storageData }
    }

    const handleGetDetailsUser = async (id, token) => {
        let storageRefreshToken = localStorage.getItem('refresh_token')
        const refreshToken = JSON.parse(storageRefreshToken)
        const res = await GetProfileUserApi(id)
        dispatch(updateUser({ ...res[0], access_token: token, refreshToken: refreshToken}))
      }

  return (
    <div style={{ padding: '30px',backgroundImage: `url(${BackGround})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', maxHeight: '200vh'}}>
        <Router> 
            <Routes>
                {routes.map((route) => {
                    const Page = route.page
                    const Layout = route.showHeader ? DefaultComponent : Fragment
                    return (
                        <Route path={route.path} element={
                            <Layout>
                                <Page/>
                            </Layout>
                        }/>

                    )
                })}
            </Routes>
        </Router>
    </div>
  )
}

export default App;