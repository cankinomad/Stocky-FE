import axios from "axios"

// const BASE_URL = "http://34.42.171.2";
const BASE_URL = "http://localhost";
// const BASE_URL = "http://localhost:80";
const UPDATE = `${BASE_URL}/user/update`
const CHANGE_PASSWORD = `${BASE_URL}/user/change-password`
const DELETE = `${BASE_URL}/user/delete`
const INFORMATION= `${BASE_URL}/user/user-information/`

class UserService{

    update(data){
        return axios.put(UPDATE, data);
    }

    changePassword(data){
        return axios.put(CHANGE_PASSWORD, data);
    }

    delete(userId){
        return axios.delete(DELETE, userId);
    }

    information(token){
        return axios.get(INFORMATION+token)
    }

}

export default new UserService();