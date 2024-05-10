import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import openUrlInBrowser from '../function/OpenFileInBrowser';
import {getFileNameFromUri} from "../function/MyFunction";

const AudioMessage = ({ currentMessage }) => {
    const { audio } = currentMessage;

    return (
        <TouchableOpacity
            onPress={() => { openUrlInBrowser(audio) }}
            style={styles.container}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name='file-audio' size={25} />
                <Text style={{ marginHorizontal: 10 }}>
                    {getFileNameFromUri(audio)}
                </Text>
            </View>
            <Text style={{ fontWeight: 'bold', color: "red" }}>Open</Text>
        </TouchableOpacity>
    );
};

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

export default AudioMessage;
