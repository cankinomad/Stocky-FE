import axios from "axios"

// const BASE_URL = "http://34.42.171.2";
const BASE_URL = "http://localhost";
// const BASE_URL = "http://api-gateway-service:80";
const CREATE = `${BASE_URL}/unit/create`
const UPDATE = `${BASE_URL}/unit/update`
const DELETE = `${BASE_URL}/unit/delete/`
const GETNAME = `${BASE_URL}/unit/get-name/`
const GETALL = `${BASE_URL}/unit/get-all`

class UnitService{

    create(data){
        return axios.post(CREATE, data);
    }
    update(data){
        return axios.put(UPDATE, data);
    }
    delete(unitId){
        return axios.delete(DELETE+unitId);
    }
    getName(unitId){
        return axios.get(GETNAME+unitId);
    }

    getAll(){
        return axios.get(GETALL);
    }
}

export default new UnitService();