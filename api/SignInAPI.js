import axios from "axios";

const apiRegister = "http://10.0.2.2:3333/api/auth/register"
const apiLogin = "http://10.0.2.2:3333/api/auth/login"
const apiVerifyOTP = "http://10.0.2.2:3333/api/otp/verify"
const apiGenerateOTP = "http://10.0.2.2:3333/api/otp/generate"

function Register(account) {
    return axios.post(apiRegister, account)
}

function Login(account) {
    return axios.post(apiLogin, account)
}

function generateOTP(phoneNumber) {
    return axios.post(apiGenerateOTP, phoneNumber)
}

function verifyOTP(data) {
    console.log(data)
    return axios.get(apiVerifyOTP, data)
}

export { Register, Login, generateOTP, verifyOTP }