import axios from "axios";

const getAllChatBox = "http://10.0.2.2:3333/api/chat/"

function GetAllChatBox(token) {
    return axios.get(getAllChatBox, {
        headers: {
            token
        }
    })
}

function CreateMessage(idChatBox, tokenAccess, messages) {
    const createMessage = `http://10.0.2.2:3333/api/chat/${idChatBox}/messages`
    return axios.post(createMessage, messages, {
        headers: {
            token: tokenAccess
        }
    })
}

export {
    GetAllChatBox,
    CreateMessage
}