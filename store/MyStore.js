import AsyncStorage from '@react-native-async-storage/async-storage';

const getUserInformation = async () => {
    const jsonValue = await AsyncStorage.getItem("user");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
};

const saveUserRegister = async (user) => {
    const jsonValue = JSON.stringify(user);
    await AsyncStorage.setItem('userRegister', jsonValue);
};

const getUserRegister = async () => {
    const jsonValue = await AsyncStorage.getItem('userRegister');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
};

const saveTokenRegister = async (value) => {
    await AsyncStorage.setItem('tokenRegister', value);
};

const getTokenRegister = async () => {
    const value = await AsyncStorage.getItem('tokenRegister');
    if (value !== null) {
        return value;
    }
};

const saveTokenAccess = async (value) => {
    return await AsyncStorage.setItem('tokenAccess', value);
};

const getTokenAccess = async () => {
    const value = await AsyncStorage.getItem('tokenAccess');
    if (value !== null) {
        return value;
    }
};

const saveUserInformation = async (user) => {
    const jsonValue = JSON.stringify(user);
    await AsyncStorage.setItem('user', jsonValue);
};

const removeKey = async (key) => {
    const result = await AsyncStorage.removeItem("tokenAccess");
    return result
}

export {
    getUserInformation,
    saveTokenRegister,
    saveUserRegister,
    getUserRegister,
    saveTokenAccess,
    getTokenAccess,
    getTokenRegister,
    saveUserInformation,
    removeKey
}