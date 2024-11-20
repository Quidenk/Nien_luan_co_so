import axios from './axios.customzie'


const createUserApi = (name, email, password) => {
    const URL_API = "/v1/api/register";
    const data = {
        name, email, password
    }
    return axios.post(URL_API, data)
}

const LogInUserApi = ( email, password ) => {
    const URL_API = "/v1/api/sign-in";
    const data = {
        email, password
    }
    return axios.post(URL_API, data)
}

const GetAllUserApi = () => {
    const URL_API = "/v1/api/user";
    return axios.get(URL_API)
}

const GetTypeProduct = () => {
    const URL_API = "/v1/api/get-type";
    return axios.get(URL_API)
}

const GetProfileUserApi = (id) => {
    const URL_API = `/v1/api/profile-user/${id}`;
    return axios.get(URL_API)
}

const UpdataUserApi = (id, data) => {
    const URL_API = `/v1/api/update-user/${id}`;
    return axios.put(URL_API, data)
}

const DeleteUserApi = (id) => {
    const URL_API = `/v1/api/delete-user/${id}`;
    return axios.delete(URL_API)
}

export {
    createUserApi,
    LogInUserApi,
    GetAllUserApi,
    UpdataUserApi,
    GetProfileUserApi,
    DeleteUserApi,
    GetTypeProduct,
}