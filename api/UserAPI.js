import axios from "axios"

function GetUserByPhone(phone, token) {
    const getUserByPhone = `http://10.0.2.2:3333/api/users/search/${phone}`
    return axios.get(getUserByPhone, {
        headers: {
            token
        }
    })
}

function GetUserByID(userID) {
    const getUserByID = `http://10.0.2.2:3333/api/users/${userID}`
    return axios.get(getUserByID)
}

export {
    GetUserByPhone,
    GetUserByID
}