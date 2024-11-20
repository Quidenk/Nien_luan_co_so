const { refreshTokenService } = require("../middleware/auth")
const { createUserService, loginService, getUserService, getUserListService, updateUserService, deleteUserService, getProfileUserService } = require("../services/userService")


const createUser = async (req, res) => {
    const {name, email, password} = req.body
    const data = await createUserService(name, email, password)
    return res.status(200).json(data)
}

const logIn = async (req, res) => {
    const { email, password } = req.body;
    const data = await loginService( email, password )
    return res.status(200).json(data)
}

const getUser = async (req, res) => {
    const data = await getUserListService()
    return res.status(200).json(data)
}

const getAccount = async (req, res) => {
    const userId = req.params.id
    const account = await getProfileUserService(userId)
    return res.status(200).json(account)
}

const updateUser = async (req, res) => {
    const userId = req.params.id
    const data = req.body
    const updatedUser = await updateUserService(userId, data)
    return res.status(200).json(updatedUser)
}

const deleteUser = async (req, res) => {
    const userId = req.params.id
    // const token = req.headers
    // console.log('>>> token: ', token)
    const deletedUser = await deleteUserService(userId)
    return res.status(200).json(deletedUser)
}

const refreshToken = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const newToken = await refreshTokenService(token)
    return res.status(200).json(newToken)
}

module.exports = {
    createUser,
    logIn,
    getUser,
    getAccount,
    updateUser,
    deleteUser,
    refreshToken,
}