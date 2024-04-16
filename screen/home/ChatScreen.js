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

    // console.log(chats)

    async function getAllChatBox() {
        try {
            const tokenAccess = await getTokenAccess()
            if (tokenAccess) {
                const id = setInterval(() => {
                    runGetChatBoxs = async () => {
                        try {
                            const reqChatBox = await GetAllChatBox(tokenAccess)
                            const chatBoxs = reqChatBox.data.metadata.conversations
                            setChats(chatBoxs)
                        } catch (error) {
                            console.log(error)
                            showMessage({
                                message: "Thông Báo !",
                                description: error.response.data.message,
                                type: "danger"
                            })
                        }
                    }

                    runGetChatBoxs()
                }, 2000);

                return () => {
                    clearInterval(id)
                }
            }

        } catch (error) {
            console.log(error)
            showMessage({
                message: "Thông Báo !",
                description: error.response.data.message,
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
                renderItem={(chatBox) => {
                    return (
                        <TouchableOpacity
                            onPress={() => { navigation.push("ChatWindow", { chatBox: chatBox.item }) }}
                        >
                            <ChatSingle chatBox={chatBox.item} />
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