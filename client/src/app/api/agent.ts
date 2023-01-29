import axios, { AxiosError, AxiosResponse } from "axios";

axios.defaults.baseURL = 'http://localhost:5000/api/';
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(response => {
    return response
}, (error: AxiosError) => {
    console.log('caught by interceptor');
    return Promise.reject(error.response);
})

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}


const Catalog = {
    list: (orderBy: string = '', searchTerm: string = '', brands: string = '', types: string = '') => requests.get(`products?orderBy=${orderBy}&searchTerm=${searchTerm}&brands=${brands}&types=${types}`),
    details: (id: number) => requests.get(`products/${id}`),
    fetchFilters: () => requests.get('products/filters')
}

const Basket = {
    get: () => requests.get('basket'),
    addItem: (productId: number, quantity = 1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
    removeItem: (productId: number, quantity = 1) => requests.delete(`basket?productId=${productId}&quantity=${quantity}`),
}

const agent = {
    Catalog,
    Basket
}

export default agent;
