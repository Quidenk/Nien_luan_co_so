import axios from './axios.customzie'


const GetProductApi = (search, limit) => {
    if (search && search.length > 0) {
        const URL_API = `/v1/api/get-product?filter=name&filter=${search}&limit=${limit}`;
        return axios.get(URL_API)
    }else  {
        const URL_API = `/v1/api/get-product?limit=${limit}`;
        return axios.get(URL_API)
    }
    
}

const getProductType = (type, limit, page) => {
    if (type) {
        const URL_API = `/v1/api/get-product?filter=type&filter=${type}&limit=${limit}&page=${page}`;
        return axios.get(URL_API)
    }
}

// export const getProductType = async (type, page, limit) => {
//     if (type) {
//         const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?filter=type&filter=${type}&limit=${limit}&page=${page}`)
//         return res.data
//     }
// }

const GetFemaleProduct = () => {
    const URL_API = `/v1/api/get-product?filter=type&filter=female`;
    return axios.get(URL_API)
}

const GetProductDetailApi = (id) => {
    const URL_API = `/v1/api/get-one-product/${id}`;
    return axios.get(URL_API)
}

const CreateProductApi = (data) => {
    const URL_API = "/v1/api/create-product";
    return axios.post(URL_API, data)
}

const UpdataProductApi = (id, data) => {
    const URL_API = `/v1/api/updata-product/${id}`;
    return axios.put(URL_API, data)
}

const DeleteProductApi = (id) => {
    const URL_API = `/v1/api/remove-product/${id}`;
    return axios.delete(URL_API)
}


export {
    GetProductApi,
    getProductType,
    GetFemaleProduct,
    GetProductDetailApi,
    CreateProductApi,
    UpdataProductApi,
    DeleteProductApi,
}