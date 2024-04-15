import * as FileSystem from 'expo-file-system';

const downloadFile = async (uri, filename) => {
    const downloadDest = `${FileSystem.documentDirectory}${filename}`;

    try {
        const { uri: fileUri } = await FileSystem.downloadAsync(uri, downloadDest);
        console.log('File downloaded to:', fileUri);
        return fileUri; // Trả về đường dẫn của tệp sau khi tải xuống thành công
    } catch (error) {
        console.error('Error downloading file:', error);
        return null; // Trả về null nếu có lỗi trong quá trình tải xuống
    }
};

const getFileNameFromUri = (uri) => {
    // Tách uri thành mảng các phần bằng dấu /
    const parts = uri.split('/');
    // Lấy phần cuối cùng của mảng, đó chính là tên tệp
    const fileName = parts[parts.length - 1];
    return fileName;
};


const downloadFileFromUri = async (uri) => {
    const fileName = getFileNameFromUri(uri);
    return await downloadFile(uri, fileName);
};



export default downloadFileFromUri;
