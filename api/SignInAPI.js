import axios from "axios";

const apiRegister = "http://10.0.2.2:3333/api/auth/register"
const apiLogin = "http://10.0.2.2:3333/api/auth/login"
const apiVerifyOTP = "http://10.0.2.2:3333/api/otp/verify"
const apiGenerateOTP = "http://10.0.2.2:3333/api/otp/generate"
const createProfile = "http://10.0.2.2:3333/api/users/create"
const GetAccount = "http://10.0.2.2:3333/api/users/getAccount"
const updateUser = "http://10.0.2.2:3333/api/users"

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
    return axios.post(apiVerifyOTP, data)
}

function CreateProfile(token, user) {
    return axios.post(createProfile, user, {
        headers: {
            token
        }
    })
}

function getAccount(token) {
    return axios.get(GetAccount, {
        headers: {
            token
        }
    })
}

function UpdateUser(token, data) {
    return axios.patch(updateUser, data, {
        headers: {
            token
        }
    })
}

export { Register, Login, generateOTP, verifyOTP, CreateProfile, getAccount, UpdateUser }