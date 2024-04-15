import * as FileSystem from 'expo-file-system';
import { BUCKET } from '../../config/Config';
var Buffer = require('buffer/').Buffer

async function convertBase64ToBuffer(uri) {
    const imageData = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
    });

    const buffer = Buffer.from(imageData, 'base64');

    return buffer
}

const createParams = async (file) => {

    const buffer = await convertBase64ToBuffer(file.uri)
    const endPoint = getEndPoint(file.uri)

    const params = {
        Bucket: BUCKET,
        Key: `file${Date.now().toString()}.${endPoint}`,
        Body: buffer,
        ContentType: file.mimeType
    }

    return params
}

const getEndPoint = (uri) => {
    var viTriCuoi = uri.lastIndexOf(".")
    if (viTriCuoi !== -1) {
        var endPoint = uri.substring(viTriCuoi + 1).trim()
        return endPoint
    }
    return ""
}


const getMessageType = (message, userNow) => {
    let typeMessage = {}
    if (userNow.id === message.authorId) {
        typeMessage = {
            _id: message.id,
            createdAt: message.createDateTime,
            user: {
                _id: message.authorId,
            },
        }
    }
    typeMessage = {
        _id: message.id,
        createdAt: message.createDateTime,
        user: {
            _id: message.authorId,
            name: 'React Native',
            avatar: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep-5.jpg',
        },
    }
    // console.log(message)
    const contentMessage = message.messageContent
    const endPoint = getEndPoint(contentMessage)

    switch (endPoint) {
        case "jpg":
        case "jpeg":
            typeMessage = {
                ...typeMessage,
                image: contentMessage
            }
            break;
        case "mp3":
            typeMessage = {
                ...typeMessage,
                audio: contentMessage
            }
            break;
        default:
            typeMessage = {
                ...typeMessage,
                text: contentMessage
            }
    }

    return typeMessage
}




export {
    convertBase64ToBuffer,
    createParams,
    getEndPoint,
    getMessageType
}