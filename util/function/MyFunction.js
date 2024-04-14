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
    var endPoint = uri.substring(viTriCuoi + 1).trim()
    return endPoint
}







export {
    convertBase64ToBuffer,
    createParams
}