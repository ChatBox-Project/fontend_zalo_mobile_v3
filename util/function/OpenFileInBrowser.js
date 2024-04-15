import { Linking } from 'react-native';

const openUrlInBrowser = (url) => {
    try {
        Linking.openURL(url);
    } catch (error) {
        console.error('Error opening URL:', error);
    }
};

export default openUrlInBrowser;
