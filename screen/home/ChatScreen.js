import React from 'react'
import { StyleSheet, View } from 'react-native';

function ChatScreen({ navigation }) {

    const [chats, setChats] = React.useState([])


    return (
        <View style={styles.container} >

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

export default ChatScreen