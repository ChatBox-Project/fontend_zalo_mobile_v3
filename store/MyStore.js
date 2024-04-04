import AsyncStorage from '@react-native-async-storage/async-storage';

const getUser = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('my-key');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error(e)
    }
};

const saveUserRegister = async (user) => {
    try {
        const jsonValue = JSON.stringify(user);
        await AsyncStorage.setItem('userRegister', jsonValue);
    } catch (e) {
        console.error(e)
    }
};

const getUserRegister = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('userRegister');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error(e)
    }
};

const saveTokenRegister = async (value) => {
    try {
        await AsyncStorage.setItem('tokenRegister', value);
    } catch (e) {
        console.error(e)
    }
};

const getTokenRegister = async () => {
    try {
        const value = await AsyncStorage.getItem('tokenRegister');
        if (value !== null) {
            return value;
        }
    } catch (e) {
        console.error(e)
    }
};

const saveTokenAccess = async (value) => {
    try {
        await AsyncStorage.setItem('tokenAccess', value);
    } catch (e) {
        console.error(e)
    }
};

const getTokenAccess = async () => {
    try {
        const value = await AsyncStorage.getItem('tokenAccess');
        if (value !== null) {
            return value;
        }
    } catch (e) {
        console.error(e)
    }
};

const saveAccountInformation = async (user) => {
    try {
        const jsonValue = JSON.stringify(user);
        await AsyncStorage.setItem('user', jsonValue);
    } catch (e) {
        console.error(e)
    }
};

const removeKey = async (key) => {
    try {
        const result = await AsyncStorage.removeItem("tokenAccess");
        return result
    } catch (e) {
        console.error(e)
    }
}

export {
    getUser,
    saveTokenRegister,
    saveUserRegister,
    getUserRegister,
    saveTokenAccess,
    getTokenAccess,
    getTokenRegister,
    saveAccountInformation,
    removeKey
}