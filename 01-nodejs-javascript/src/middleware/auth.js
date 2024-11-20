const jwt = require("jsonwebtoken")
require('dotenv').config()


const auth = (req, res, next) => {
    
    const white_lists = ["/", "/register", "/sign-in"]

    if(white_lists.find(item => '/v1/api' + item === req.originalUrl)){
        next()
    }else {
        if(req?.headers?.authorization?.split(' ')?.[1]){
            const token = req.headers.authorization.split(' ')[1];
            
            //verify
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                req.user = {
                    email: decoded.email,
                    name: decoded.name,
                    createBy: "Anhtran"
                }
                // console.log(">>> check token: ", decoded)
                next()
            }catch(error) {
                return res.status(401).json({
                    message: "Token bị hết hạn/hoặc không hợp lệ"
                })
            }
        }else {
            //return exception
            return res.status(401).json({
                message: "Bạn chưa truyền Access Token ở header/hoặc token bị hết hạn."
            })
        }
    }
}

const authMiddleWare = (req, res, next) => {
    // console.log('>>> check token', req.headers.authorization)
    const token = req.headers.authorization.split(' ')[1]
    const userId = req.params.id
    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
        // console.log(user)
        if(err) {
            return res.status(404).json({
                EC: 2,
                message: 'Xác thực',
                status: 'ERROR'
            })
        }
        if (user.isAdmin || user.id === userId) {
            next()
        }else {
            return res.status(404).json({
                EC: 1,
                message: 'Xác thực',
                status: 'ERROR'
            })
        }
        console.log('>>> user :', user.isAdmin)
    })
}

const refreshTokenService = (token) => {
    const user = jwt.verify(token, 'refresh_token')
    
    console.log('>>user: ', user)

    const access_token = jwt.sign(
        payload = {
            id: user.id,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin,
        }, 
        'refresh_token',
        {
            expiresIn: '365d',
        }
    )

    return ({
        EC: 0,
        status: 'SUCCESS',
        message: 'Xác thực.',
        access_token,
    })
   
}



module.exports = {
    auth,
    authMiddleWare,
    refreshTokenService,
}