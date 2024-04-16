import axios from "axios"

function GetUserByPhone(phone, token) {
    const getUserByPhone = `http://10.0.2.2:3333/api/users/search/${phone}`
    return axios.get(getUserByPhone, {
        headers: {
            token
        }
    })
}

export {
    GetUserByPhone
}