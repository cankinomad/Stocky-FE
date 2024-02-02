import axios from "axios"

// const BASE_URL = 'http://34.42.171.2';
const BASE_URL = "http://localhost";
// const BASE_URL = "http://api-gateway-service:80";
const CREATE = `${BASE_URL}/category/create`
const UPDATE = `${BASE_URL}/category/update`
const DELETE = `${BASE_URL}/category/delete/`
const GETNAME = `${BASE_URL}/category/get-name/`
const GETALL = `${BASE_URL}/category/get-all`
const GETITSELF = `${BASE_URL}/category/get-itself/`

class CategoryService{

    create(data){
        console.log(data)
        return axios.post(CREATE, data);
    }
    update(data){
        return axios.put(UPDATE, data);
    }

    delete(categoryId){
        return axios.delete(DELETE+categoryId);
    }
     getName(categoryId){
        return axios.get(GETNAME, categoryId)
    }
    async getAll(){
        return await axios.get(GETALL)
    }
    getItself(categoryId){
        return axios.get(GETITSELF+categoryId)
    }

}

export default new CategoryService();