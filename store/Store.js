import AsyncStorage from '@react-native-async-storage/async-storage';

const saveTokenRegister = async (value) => {
    await AsyncStorage.setItem('token', value);
};

export {
    saveTokenRegister
}