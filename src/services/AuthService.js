import axios from "axios"

// const BASE_URL = "http://34.42.171.2";
const BASE_URL = "http://localhost";
// const BASE_URL = "http://api-gateway-service:80";
const LOGIN = `${BASE_URL}/auth/login`
const REGISTER = `${BASE_URL}/auth/register`
const TOKENVALIDATION = `${BASE_URL}/auth/token-validation/`

class AuthService{

    async login(user){
        return await axios.post(LOGIN, user);
    }

    async register(data){
        return await axios.post(REGISTER,data);
    }
     isTokenValid(token){
        return axios.get(TOKENVALIDATION+token);
    }

}

export default new AuthService();