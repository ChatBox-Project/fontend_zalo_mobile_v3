import React from 'react'
import { Button, Clipboard, StyleSheet, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { BottomSheet, ListItem } from 'react-native-elements';
import { GiftedChat } from 'react-native-gifted-chat'
import { getTokenAccess, getUserInformation } from '../../store/MyStore';
import { CreateMessage, GetAllMessage, RemoveMessage } from '../../api/ChatBoxAPI';
import { showMessage } from 'react-native-flash-message';
import { GetUserInformation, GetUserInformationById } from '../../api/SignInAPI';

function ChatWindow({ navigation, route }) {

    const chatBox = route.params.chatBox

    const [userSender, setUserSender] = React.useState({})
    const [image, setImage] = React.useState(null);
    const [isVisible, setIsVisible] = React.useState(false);
    const [messages, setMessages] = React.useState([])
    const [userRecieverIformation, setUserReciverInformation] = React.useState({})

    React.useEffect(() => {
        navigation.setOptions({
            headerTitle: `${userRecieverIformation?.name ? userRecieverIformation?.name : ""}`
        });

    }, [userRecieverIformation])

    React.useEffect(() => {
        const startGetUserReciverInformation = async () => {
            const tokenAccess = await getTokenAccess()
            const reqUserInformationNew = await GetUserInformation(tokenAccess)
            const userInformation = reqUserInformationNew.data.metadata.user
            var userReciever = (userInformation.id == chatBox.user1_id) ? chatBox.user2_id : chatBox.user1_id
            const reqUserReciever = await GetUserInformationById(userReciever, tokenAccess)
            setUserReciverInformation(reqUserReciever.data.metadata.user)
        }
        startGetUserReciverInformation()
        getAllMessage()
    }, [])

    async function getAllMessage() {
        try {
            const tokenAccess = await getTokenAccess()
            const userInformation = await getUserInformation(tokenAccess)
            setUserSender(userInformation)
            if (tokenAccess) {
                const id = setInterval(() => {
                    const runGetAllMessage = async () => {
                        const reqMessages = await GetAllMessage(chatBox.id, tokenAccess)
                        // console.log(reqMessages.data)
                        setMessages(
                            convertFormartMessage(reqMessages.data)
                        )
                    }
                    runGetAllMessage()
                }, 2000);

                return () => {
                    clearInterval(id)
                }
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

    function convertFormartMessage(messages) {
        return messages.map(message => {
            if (userSender.id === message.senderId) {
                return {
                    _id: message.id,
                    text: message.contentMessage,
                    createdAt: message.createDateTime,
                    user: {
                        _id: message.senderId,
                    },
                }
            }
            return {
                _id: message.id,
                text: message.contentMessage,
                createdAt: message.createDateTime,
                user: {
                    _id: message.senderId,
                    name: 'React Native',
                    avatar: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep-5.jpg',
                },
            }
        })
    }

    const onSend = React.useCallback((messages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        )
    }, [])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const list = [
        {
            title: 'Gửi File',
            onPress: () => pickImage(),
        },
        {
            title: 'Cancel',
            containerStyle: { backgroundColor: 'red' },
            titleStyle: { color: 'white' },
            onPress: () => setIsVisible(false),
        },
    ];


    async function sendMessageText(message) {

        const messageSend = {
            "messageType": "string",
            "contentMessage": message
        }

        try {
            const tokenAccess = await getTokenAccess()
            await CreateMessage(chatBox.id, tokenAccess, messageSend)
            console.log("send text ok !")
        } catch (error) {
            console.error(error)
            showMessage({
                message: "Thông Báo !",
                description: error.message,
                type: "danger"
            })
        }
    }

    async function removeMessage(messageId) {
        try {
            const tokenAccess = await getTokenAccess()
            await RemoveMessage(chatBox.id, messageId, tokenAccess)
            showMessage({
                message: "ĐÃ XÓA TIN NHẮN",
                type: "success"
            })
        } catch (error) {
            console.error(error)
            showMessage({
                message: "Thông Báo !",
                description: error.message,
                type: "danger"
            })
        }
    }

    // async function updateMessage(messageId) {
    //     try {
    //         const tokenAccess = await getTokenAccess()
    //         await RemoveMessage(chatBox.id, messageId, tokenAccess)
    //         showMessage({
    //             message: "ĐÃ XÓA TIN NHẮN",
    //             type: "success"
    //         })
    //     } catch (error) {
    //         console.error(error)
    //         showMessage({
    //             message: "Thông Báo !",
    //             description: error.message,
    //             type: "danger"
    //         })
    //     }
    // }

    async function onLongPressChat(context, message) {
        if (message.text) {
            const options = [
                'Copy Text',
                'Remove',
                'Update',
                'Cancel',
            ];
            const cancelButtonIndex = options.length - 1;
            context.actionSheet().showActionSheetWithOptions({
                options,
                cancelButtonIndex,
            },
                (buttonIndex) => {
                    switch (buttonIndex) {
                        case 0:
                            Clipboard.setString(message.text);
                            break;
                        case 1:
                            removeMessage(message._id)
                            break;
                    }
                });
        }
    }


    return (
        <View style={styles.container} >
            <GiftedChat
                alwaysShowSend={true}
                messages={messages}
                onSend={
                    (messages) => {
                        // console.log(messages)
                        onSend(messages)
                        sendMessageText(messages[0].text)
                    }
                }
                onLongPress={(context, message) => {
                    onLongPressChat(context, message)
                }}
                user={{
                    _id: userSender.id,
                }}
            />
            <Button
                title='Tùy chọn'
                onPress={() => { setIsVisible(true) }}
            />
            <BottomSheet modalProps={{}} isVisible={isVisible}>
                {list.map((l, i) => (
                    <ListItem
                        key={i}
                        containerStyle={l.containerStyle}
                        onPress={l.onPress}
                    >
                        <ListItem.Content>
                            <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </BottomSheet>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
});

export default ChatWindow