

const getFileNameFromUri = (uri) => {
    // Tách uri thành mảng các phần bằng dấu /
    const parts = uri.split('/');
    // Lấy phần cuối cùng của mảng, đó chính là tên tệp
    const fileName = parts[parts.length - 1];
    return fileName;
};


const downloadFileFromUri = async (uri) => {
    const fileName = getFileNameFromUri(uri);
    return await downloadFileToDownloads(uri, fileName);
};



export {
    getFileNameFromUri,
    downloadFileFromUri
} 
