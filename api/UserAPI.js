import axios from "axios"

function GetUserByPhone(phone, token) {
    const getUserByPhone = `http://localhost:3333/api/users/search/${phone}`
    return axios.get(getUserByPhone, {
        headers: {
            token
        }
    })
}

export {
    GetUserByPhone
}