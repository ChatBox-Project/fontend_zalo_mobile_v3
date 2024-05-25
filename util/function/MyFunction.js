import * as FileSystem from 'expo-file-system';
import { BUCKET } from '../../config/Config';
import * as ImagePicker from "expo-image-picker";
const Buffer = require('buffer/').Buffer
import * as DocumentPicker from "expo-document-picker";

// chuyen uri -> base64 -> buffer
async function convertBase64ToBuffer(uri) {
    const imageData = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
    });

    const buffer = Buffer.from(imageData, 'base64');

    return buffer
}

// tao params cho upload file len s3
const createParams = async (file, mineType) => {

    const buffer = await convertBase64ToBuffer(file)
    const endPoint = getEndPoint(file)

    const params = {
        Bucket: process.env.EXPO_PUBLIC_BUCKET,
        Key: `file${Date.now().toString()}.${endPoint}`,
        Body: buffer,
        ContentType: mineType,
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

// lay loai tin nhan tư socket
const getMessageType = (myUserId, data) => {
    // console.log(myUserId)
    // console.log(data.type_message)

    let typeMessage = {}
    if (myUserId._id == data.sender._id) {
        typeMessage = {
            _id: data.key,
            createdAt: data.createdAt,
            user: {
                _id: data.sender._id,
                name: data.sender.username,
            },
        }
    } else {
        typeMessage = {
            _id: data.key,
            createdAt: data.createdAt,
            user: {
                _id: data.sender._id,
                name: data.sender.username,
                avatar: data.sender.profilePicture
            },
        }
    }

    const typemess = data.type_message

    switch (typemess) {
        case "image":
            typeMessage = {
                ...typeMessage,
                image: data.message
            }
            break;
        case "audio":
            typeMessage = {
                ...typeMessage,
                audio: data.message
            }
            break;
        default:
            typeMessage = {
                ...typeMessage,
                text: data.message
            }
    }
    // console.log(typeMessage)
    return typeMessage
}

// lay ten file tu uri
const getFileNameFromUri = (uri) => {
    const parts = uri.split('/');
    const fileName = parts[parts.length - 1];
    return fileName;
};


// chon anh tu thu vien
const pickImageFromLibrary = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    if (!result.canceled) {
        return result.assets[0]
    }
    return ""
};

// chon file tai lieu tu thu vien
const pickDocFromLibrary = async () => {
    // No permissions request is necessary for launching the image library
    let result = await DocumentPicker.getDocumentAsync({});

    if (!result.canceled) {
        return result.assets[0]
    }
    return ""
};

const checkIsUserChat = (user, chat) => {

}


export {
    convertBase64ToBuffer,
    createParams,
    getEndPoint,
    getMessageType,
    getFileNameFromUri,
    pickImageFromLibrary,
    pickDocFromLibrary
}