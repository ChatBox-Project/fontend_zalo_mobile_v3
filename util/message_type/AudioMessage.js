import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { getFileNameFromUri } from '../function/DowloadFile';
import Icon from 'react-native-vector-icons/FontAwesome6';

const AudioMessage = ({ currentMessage }) => {
    const { audio } = currentMessage;
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    const playAudio = async () => {
        const { sound } = await Audio.Sound.createAsync({ uri: audio });
        setSound(sound);

        await sound.playAsync();
        setIsPlaying(true);
    };

    const pauseAudio = async () => {
        await sound.pauseAsync();
        setIsPlaying(false);
    };

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name='file-audio' size={25} />
                <Text style={{ marginHorizontal: 10 }}>
                    {getFileNameFromUri(audio)}
                </Text>
            </View>
            <TouchableOpacity
                onPress={isPlaying ? pauseAudio : playAudio}
            >
                <Text style={{ fontWeight: 'bold', color: "red" }}>{isPlaying ? 'Pause' : 'Play'}</Text>
            </TouchableOpacity>
        </View>
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
