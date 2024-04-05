import * as FileSystem from 'expo-file-system';

async function convertBase64ToBuffer(uri) {
    const imageInfo = await FileSystem.getInfoAsync(uri);
    const imageData = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
    });

    // Chuyển dữ liệu Base64 thành Buffer
    const buffer = Buffer.from(imageData, 'base64');

    return buffer
}

export {
    convertBase64ToBuffer
}