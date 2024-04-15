import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

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
            <TouchableOpacity onPress={isPlaying ? pauseAudio : playAudio}>
                <Text>{isPlaying ? 'Pause' : 'Play'} Audio</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 200,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AudioMessage;
