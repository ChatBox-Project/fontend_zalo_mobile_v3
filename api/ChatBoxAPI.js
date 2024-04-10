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

function GetAllMessage(idChatBox, tokenAccess) {
    const createMessage = `http://10.0.2.2:3333/api/chat/${idChatBox}/messages`
    return axios.get(createMessage, {
        headers: {
            token: tokenAccess
        }
    })
}

function RemoveMessage(boxChatId, messageId, tokenAccess) {
    const removeMessage = `http://10.0.2.2:3333/api/chat/${boxChatId}/messages/${messageId}`
    return axios.delete(removeMessage, {
        headers: {
            token: tokenAccess
        }
    })
}

export {
    GetAllChatBox,
    CreateMessage,
    GetAllMessage,
    RemoveMessage
}