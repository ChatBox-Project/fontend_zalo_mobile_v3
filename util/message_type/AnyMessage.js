import React from 'react'
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {getEndPoint, getFileNameFromUri} from '../function/MyFunction';
import openUrlInBrowser from '../function/OpenFileInBrowser';

function AnyMessage({ currentMessage }) {


    const messageContent = currentMessage.text

    function isURL(text) {
        var urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        return urlPattern.test(text);
    }

    if (!isURL(messageContent)) {
        return (
            <Text style={{ fontSize: 16, paddingHorizontal: 10, paddingVertical: 5, color: "black" }}>{messageContent}</Text>
        )
    }

    switch (getEndPoint(messageContent)) {
        case "pdf":
            return (
                <TouchableOpacity
                    onPress={() => { openUrlInBrowser(messageContent) }}
                    style={styles.container}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name='file-pdf' size={25} />
                        <Text style={{ marginHorizontal: 10 }}>
                            {getFileNameFromUri(messageContent)}
                        </Text>
                    </View>
                    <Text style={{ fontWeight: 'bold', color: "red" }}>Open</Text>
                </TouchableOpacity>
            )
        default:
            return (
                <Text style={{ fontSize: 16, paddingHorizontal: 10, paddingVertical: 5, color: "black" }}>{messageContent}</Text>
            )

    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row'
    },
});

export default AnyMessage