import * as FileSystem from 'expo-file-system';
import { BUCKET } from '../../config/Config';
const Buffer = require('buffer/').Buffer

// chuyen uri -> base64 -> buffer
async function convertBase64ToBuffer(uri) {
    const imageData = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
    });

    const buffer = Buffer.from(imageData, 'base64');

    return buffer
}

// tao params cho upload file len s3
const createParams = async (file) => {

    const buffer = await convertBase64ToBuffer(file)
    const endPoint = getEndPoint(file)

    const params = {
        Bucket: BUCKET,
        Key: `file${Date.now().toString()}.${endPoint}`,
        Body: buffer,
        ContentType: file.mimeType
    }

    return params
}

// lay duoi file
const getEndPoint = (uri) => {
    var viTriCuoi = uri.lastIndexOf(".")
    if (viTriCuoi !== -1) {
        var endPoint = uri.substring(viTriCuoi + 1).trim()
        return endPoint
    }
    return ""
}


const getMessageType = (message, userNow) => {
    // console.log(userNow._id)
    // console.log(message.authorId)
    let typeMessage = {}
    if (userNow._id == message.authorId) {
        typeMessage = {
            _id: message._id,
            createdAt: message.updatedAt,
            user: {
                _id: message.authorId,
            },
        }
    } else {
        typeMessage = {
            _id: message._id,
            createdAt: message.updatedAt,
            user: {
                _id: message.authorId,
                name: 'React Native',
                avatar: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep-5.jpg',
            },
        }
    }
    // console.log(message)
    const contentMessage = message.content
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

// lay ten file tu uri
const getFileNameFromUri = (uri) => {
    const parts = uri.split('/');
    const fileName = parts[parts.length - 1];
    return fileName;
};


export {
    convertBase64ToBuffer,
    createParams,
    getEndPoint,
    getMessageType,
    getFileNameFromUri
}