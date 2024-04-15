import React from 'react';
import { TouchableOpacity } from 'react-native';
import openUrlInBrowser from '../function/OpenFileInBrowser';
import { Image } from 'react-native-elements';

const ImageMessage = ({ currentMessage }) => {
    const { image } = currentMessage;

    return (
        <TouchableOpacity
            style={{ width: 160, height: 100 }}
            onPress={() => { openUrlInBrowser(image) }}
        >
            <Image
                source={{ uri: image }}
                style={{ width: 150, height: 100, borderRadius: 10, marginHorizontal: 5, marginBottom: 5 }}
            />
        </TouchableOpacity>
    );
};

export default ImageMessage;
