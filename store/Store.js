import AsyncStorage from '@react-native-async-storage/async-storage';

const saveToken = async (value) => {
    await AsyncStorage.setItem('token', value);
};

const saveEmail = async (value) => {
    await AsyncStorage.setItem('email', value);
};

const getEmail = async () => {
    const value = await AsyncStorage.getItem('email');
    return value
};

const removeKey = async (key) => {
    const result = await AsyncStorage.removeItem(key);
    return result
}

export {
    saveToken,
    saveEmail,
    getEmail,
    removeKey
}