import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ChatSingle from '../../util/chat_single/ChatSingle';
import { getTokenAccess } from '../../store/MyStore';
import { GetAllChatBox } from '../../api/ChatBoxAPI';

function ChatScreen({ navigation }) {

    const [chats, setChats] = React.useState([])

    React.useEffect(() => {
        getTokenAccess()
            .then(tokenAccess => {

                const id = setInterval(() => {
                    // console.log(1)
                    GetAllChatBox(tokenAccess)
                        .then(req => {
                            // console.log(req)
                            const chatBox = req.data.metadata.chatBox
                            setChats(chatBox)
                        }).catch(err => {
                            console.error(err)
                        })
                }, 2000);

                return () => {
                    clearInterval(id)
                }
            }).catch(err => {
                console.error(err)
            })
    }, [])


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
                            onPress={() => { navigation.push("ChatWindow", { chatBoxId: chatBox.item.id }) }}
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