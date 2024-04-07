import axios from "axios";

const apiRegister = "http://10.0.2.2:3333/api/auth/register"
const apiLogin = "http://10.0.2.2:3333/api/auth/login"
const apiVerifyOTP = "http://10.0.2.2:3333/api/otp/verify"
const apiGenerateOTP = "http://10.0.2.2:3333/api/otp/generate"
const updateAllProfile = "http://10.0.2.2:3333/api/users"
const getAccountInformation = "http://10.0.2.2:3333/api/users/getAccount"
const updateUser = "http://10.0.2.2:3333/api/users"
const getUserInformation = "http://10.0.2.2:3333/api/users"

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

function UpdateAllProfile(token, profile) {
    return axios.post(updateAllProfile, profile, {
        headers: {
            token
        }
    })
}

function GetAccountInformation(token) {
    return axios.get(getAccountInformation, {
        headers: {
            token
        }
    })
}

function GetUserInformation(token) {
    return axios.get(getUserInformation, {
        headers: {
            token
        }
    })
}

function UpdateUserProfile(token, data) {
    return axios.patch(updateUser, data, {
        headers: {
            token
        }
    })
}



export {
    Register,
    Login,
    generateOTP,
    verifyOTP,
    UpdateAllProfile,
    GetAccountInformation,
    UpdateUserProfile,
    GetUserInformation
}