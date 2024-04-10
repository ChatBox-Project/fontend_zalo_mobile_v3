import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ChatSingle from '../../util/chat_single/ChatSingle';
import { getTokenAccess } from '../../store/MyStore';
import { GetAllChatBox } from '../../api/ChatBoxAPI';
import { showMessage } from 'react-native-flash-message';

function ChatScreen({ navigation }) {

    const [chats, setChats] = React.useState([])

    React.useEffect(() => {
        getAllChatBox()
    }, [])

    async function getAllChatBox() {
        try {
            const tokenAccess = await getTokenAccess()
            const id = setInterval(() => {
                runGetChatBoxs = async () => {
                    try {
                        const reqChatBox = await GetAllChatBox(tokenAccess)
                        const chatBoxs = reqChatBox.data.metadata.chatBox
                        setChats(chatBoxs)
                    } catch (error) {
                        console.error(error)
                        showMessage({
                            message: "Thông Báo !",
                            description: err.message,
                            type: "danger"
                        })
                    }
                }

                runGetChatBoxs()
            }, 2000);

            return () => {
                clearInterval(id)
            }
        } catch (error) {
            console.error(error)
            showMessage({
                message: "Thông Báo !",
                description: err.message,
                type: "danger"
            })
        }
    }


    return (
        <View style={styles.container} >
            <FlatList
                showsVerticalScrollIndicator={false}
                style={{
                    width: "100%",
                }}
                data={chats}
                renderItem={(chatBoxs) => {
                    return (
                        <TouchableOpacity
                            onPress={() => { navigation.push("ChatWindow", { chatBox: chatBoxs.item }) }}
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