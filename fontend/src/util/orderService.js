import axios from './axios.customzie'

const CreateOrder = (data) => {
    // console.log("data in service: ", data)
    const URL_API = `/v1/api/create-order/${data?.user}`;
    return axios.post(URL_API, data)
}

const GetOrderApi = (id) => {
    // console.log("id in service: ", id)
    const URL_API = `/v1/api/get-all-order/${id}`;
    return axios.get(URL_API)
}

const GetAllOrderApi = () => {
    // console.log("id in service: ", id)
    const URL_API = `/v1/api/get-all-order`;
    return axios.get(URL_API)
}

const GetDetailOrderApi = (id) => {
    // console.log("id in service: ", id)
    const URL_API = `/v1/api/get-details-order/${id}`;
    return axios.get(URL_API)
}

const CancelOrderApi = (id, orderItems, userId) => {
    const data = {orderItems, orderId: id}
    const URL_API = `/v1/api/cancel-order/${userId}`;
    return axios.delete(URL_API, {data})
}

const ConfirmOrderApi = (id, orderItems, userId) => {
    const data = {orderItems, orderId: id}
    const URL_API = `/v1/api/confirm-order/${userId}`;
    return axios.delete(URL_API, {data})
}

export {
    CreateOrder,
    GetOrderApi,
    GetDetailOrderApi,
    CancelOrderApi,
    GetAllOrderApi,
    ConfirmOrderApi,
}