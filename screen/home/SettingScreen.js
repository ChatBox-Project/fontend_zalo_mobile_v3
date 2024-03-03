import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function SettingScreen({ navigation }) {

    return (
        <View style={styles.container} >
            <Text>Loading....</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
});

export default SettingScreen