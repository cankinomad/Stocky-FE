import axios from "axios"

// const BASE_URL = "http://34.42.171.2";
const BASE_URL = "http://localhost";
// const BASE_URL = "http://api-gateway-service:80";
const CREATE = `${BASE_URL}/storage/create`
const UPDATE = `${BASE_URL}/storage/update`
const DELETE = `${BASE_URL}/storage/delete/`
const GETNAME = `${BASE_URL}/storage/get-name/`
const GETALL = `${BASE_URL}/storage/get-all`

class StorageService{

    create(data){
        return axios.post(CREATE, data);
    }
    update(data){
        return axios.put(UPDATE, data);
    }
    delete(storageId){
        return axios.delete(DELETE+storageId);
    }
    getName(storageId){
        return axios.get(GETNAME+storageId);
    }
    getAll(){
        return axios.get(GETALL);
    }
}

export default new StorageService();