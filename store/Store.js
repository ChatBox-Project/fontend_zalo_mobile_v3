import AsyncStorage from '@react-native-async-storage/async-storage';

const saveToken = async (value) => {
    await AsyncStorage.setItem('token', value);
};

const getToken = async () => {
    const value = await AsyncStorage.getItem('token');
    return value
};

const saveEmail = async (value) => {
    await AsyncStorage.setItem('email', value);
};

const getEmail = async () => {
    const value = await AsyncStorage.getItem('email');
    return value
};

const saveUser = async (value) => {
    const jsonValue = JSON.stringify(value);
    const data = await AsyncStorage.setItem('user', jsonValue);
    return data
};

const getUser = async () => {
    const jsonValue = await AsyncStorage.getItem('user');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
};

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