const User = require("../models/user");
require('dotenv').config()
const bcrypt = require('bcrypt');
const { name } = require("ejs");
const jwt = require('jsonwebtoken')
const saltRounds = 10

const createUserService = async (name, email, password) => {
    try {
        //check user exist
        const user = await User.findOne({email});
        if(user) {
            console.log(`>>> user exist, ${email} đã tồn tại `)
            return {
                EC: 1,
                EM: 'Email tồn tại'
            };;
        }
        //hash user password
        const hashPassword = await bcrypt.hash(password, saltRounds)
        //save user password into DB
        let result = await User.create({
            name: name,
            email: email,
            password: hashPassword,
            role: "QUYANH",
        })
        return {
            EC: 0,
            EM: 'SUCCESS CREATE ACCOUNT',
            result,
        };;

    } catch (error) {
        console.log(error);
        return {
            EC: 2,
            EM: 'ERROR'
        };
    }
}

const loginService = async ( email, password) => {
    try{
        //fetch user by email
        const user = await User.findOne({ email: email })
        if (user){
            console.log(">>> check user: ", user)
            //compare user
            const isMatchPassword = await bcrypt.compare(password, user.password)
            if(!isMatchPassword) {
                return {
                    EC: 2, 
                    EM: "Email/Password không hợp lệ"
                }
            }else {
                //create an access  token
                const payload = {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    isAdmin: user.isAdmin,
                }


                const access_token = jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    {
                        expiresIn: process.env.JWT_EXPIRE
                    }
                )

                const refresh_token = jwt.sign(
                    payload, 
                    'refresh_token',
                    {
                        expiresIn: '365d',
                    }
                )
                return {
                    EC: 0,
                    access_token,
                    refresh_token,
                    user: {
                        email: user.email,
                        name: user.name,
                        isAdmin: user.isAdmin,
                    }
                };
            }
        }else {
            return {
                EC: 1,
                EM: "Email/Password không hợp lệ"
            }
        }
    }catch (error) {
        console.log(error);
        return null;
    }
}

const getProfileUserService = async (id) => {
    try{
        const result = await User.find({ _id: id }).select('-password');
        return result
    }catch (error) {
        console.log(error);
        return null;
    }
}

const updateUserService = async(id, data) => {
    try{
        const checkUser = await User.findOne({
            _id: id
        })
        console.log('>>> user need update: ', checkUser)
        if(checkUser){
            const updataUser = await User.findByIdAndUpdate(id, data, { new: true})
            return {
                EC: 0,
                updataUser,
            };
        }else{
            return {
                EC: 1,
                EM: "Email/Password không hợp lệ"
            }
        }
    }catch (error) {
        console.log(error);
        return null;
    }
}

const getUserListService = async() => {
    try{
        const UserList = await User.find()
        return {
            EC: 0,
            UserList,
        }
    }catch (error) {
        console.log(error);
        return null;
    }
}

const deleteUserService = async(id) => {
    try{

        const deletedUser = await User.find({
            _id: id,
        })
        if(deletedUser){
            await User.findByIdAndDelete({ _id: id})
            return {
                EC: 0,
                EM: `Đã xóa user ${id}`
            }
        }else{
            return {
                EC: 1,
                EM: "Email/Password không hợp lệ"
            }
        }
    }catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    createUserService,
    getUserListService,
    loginService,
    getProfileUserService,
    updateUserService,
    deleteUserService,
}