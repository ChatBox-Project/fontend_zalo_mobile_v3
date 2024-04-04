import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ChatSingle from '../../util/chat_single/ChatSingle';

function ChatScreen({ navigation }) {

    const [chats, setChats] = React.useState([1])

    return (
        <View style={styles.container} >
            <FlatList
                showsVerticalScrollIndicator={false}
                style={{
                    width: "100%",
                }}
                data={chats}
                renderItem={() => {
                    return (
                        <TouchableOpacity
                            onPress={() => { navigation.push("ChatWindow") }}
                        >
                            <ChatSingle />
                        </TouchableOpacity>
                    )
                }}
            />
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