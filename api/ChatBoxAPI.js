import axios from "axios";
const getAllChatBox = "http://10.0.2.2:3333/api/chat/"

function GetAllChatBox(token) {
    return axios.get(getAllChatBox, {
        headers: {
            token
        }
    })
}

export {
    GetAllChatBox
}