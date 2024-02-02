import axios from "axios"

// const BASE_URL = "http://34.42.171.2";
const BASE_URL = "http://localhost";
// const BASE_URL = "http://api-gateway-service:80";
const CREATE = `${BASE_URL}/product/create`
const UPDATE = `${BASE_URL}/product/update`
const PRODUCT_BY_STORAGE = `${BASE_URL}/product/product-by-storage/`
const PRODUCT_BY_CATEGORY = `${BASE_URL}/product/product-by-category/`
const ALL_PRODUCTS = `${BASE_URL}/product/all-products`
const DELETE = `${BASE_URL}/product/delete/`

class ProductService{

    create(data){
        return axios.post(CREATE, data);
    }
   async update(data){
        return await axios.put(UPDATE, data);
    }

    delete(productId){
        return axios.delete(DELETE+productId);
    }

    productByStorage(storageId){
        return axios.get(PRODUCT_BY_STORAGE+ storageId);
    }

    async productByCategory(categoryId){
        return await axios.get(PRODUCT_BY_CATEGORY+ categoryId);
    }

    getAll(){
        return axios.get(ALL_PRODUCTS);
    }

}

export default new ProductService();