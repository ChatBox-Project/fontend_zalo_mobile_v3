import axios from "axios";

const register = "http://10.0.2.2:3333/api/auth/register"
const login = "http://10.0.2.2:3333/api/auth/login"

function Register(account) {
    return axios.post(register, account)
}

function Login(account) {
    console.log(account)
    return axios.post(login, account)
}

export { Register, Login }