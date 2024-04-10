import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ChatSingle from '../../util/chat_single/ChatSingle';
import { getTokenAccess, getUserInformation } from '../../store/MyStore';
import { GetAllChatBox } from '../../api/ChatBoxAPI';
import { showMessage } from 'react-native-flash-message';

function ChatScreen({ navigation }) {

    const [chats, setChats] = React.useState([])
    const [userInformation, setUserInformation] = React.useState({})

    React.useEffect(() => {
        const startGetUserInformation = async () => {
            const tokenAccess = await getTokenAccess()
            const userInformation = await getUserInformation(tokenAccess)
            setUserInformation(userInformation)
        }
        startGetUserInformation()
        getAllChatBox()
    }, [])


    async function getAllChatBox() {
        try {
            const tokenAccess = await getTokenAccess()
            // console.log(tokenAccess)
            if (tokenAccess) {
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
                                description: error.message,
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
            console.error(error)
            showMessage({
                message: "Thông Báo !",
                description: error.message,
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
                            <ChatSingle chatBox={chatBox.item} userInformation={userInformation} />
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