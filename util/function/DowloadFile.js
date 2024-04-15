const getFileNameFromUri = (uri) => {
    const parts = uri.split('/');
    const fileName = parts[parts.length - 1];
    return fileName;
};


export {
    getFileNameFromUri,
} 
