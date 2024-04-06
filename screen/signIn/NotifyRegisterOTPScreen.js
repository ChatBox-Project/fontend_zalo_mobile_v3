import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function NotifyRegisterOTPScreen({ navigation }) {

    const [chats, setChats] = React.useState([1])

    return (
        <View style={styles.container} >
            <Text>Hello</Text>
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

export default NotifyRegisterOTPScreen