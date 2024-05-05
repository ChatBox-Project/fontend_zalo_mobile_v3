import AsyncStorage from '@react-native-async-storage/async-storage';

// luu token vao storage
const saveToken = async (value) => {
    await AsyncStorage.setItem('token', value);
};

// lay token tu storage
const getToken = async () => {
    const value = await AsyncStorage.getItem('token');
    return value
};

// luu email vao storage
const saveEmail = async (value) => {
    await AsyncStorage.setItem('email', value);
};

// lay email tu storage
const getEmail = async () => {
    const value = await AsyncStorage.getItem('email');
    return value
};

// luu thong tin user vao storage
const saveUser = async (value) => {
    const jsonValue = JSON.stringify(value);
    const data = await AsyncStorage.setItem('user', jsonValue);
    return data
};

// lay thong tin user tu storage
const getUser = async () => {
    const jsonValue = await AsyncStorage.getItem('user');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
};

// xoa key trong storage
const removeKey = async (key) => {
    const result = await AsyncStorage.removeItem(key);
    return result
}

export {
    saveToken,
    saveEmail,
    getEmail,
    removeKey,
    getToken,
    saveUser,
    getUser
}