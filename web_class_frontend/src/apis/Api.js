import axios from "axios";

//creating an instance of axios
const Api = axios.create({
    baseURL: "http://localhost:9090",
    withCredentials: true,
    headers: {
        "Content-Type": "multipart/form-data"
    }
});

//creating test api
export const testApi = () => Api.get('/test')

//creating register api
export const registerUserApi=(data)=>Api.post('/api/user/create',data)

//create login Api
export const loginUserApi=(data)=>Api.post('/api/user/login',data)


//create product api
export const createProductApi = (data) => Api.post('/api/product/create', data)

//fetch all products
export const getAllProducts = () => Api.get('/api/product/get_all_products')


export const loginApi = () => Api.get('/login')
//http://localhost:5000/test