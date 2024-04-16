import React from 'react'
import { Clipboard, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import * as DocumentPicker from "expo-document-picker";
import { BottomSheet, ListItem, Input, Button } from 'react-native-elements';
import { GiftedChat } from 'react-native-gifted-chat'
import { getTokenAccess } from '../../store/MyStore';
import { CreateMessage, GetAllMessage, RemoveMessage, UpdateMessage } from '../../api/ChatBoxAPI';
import { showMessage } from 'react-native-flash-message';
import { GetUserInformation, GetUserInformationById } from '../../api/SignInAPI';
import Icon from 'react-native-vector-icons/Entypo';
import { BLUE } from '../../screen/colors/Colors';
import { upateImageToS3 } from '../../aws/MyAWS';
import { getMessageType } from '../function/MyFunction';
import AudioMessage from '../message_type/AudioMessage';
import AnyMessage from '../message_type/AnyMessage';
import ImageMessage from '../message_type/ImageMessage';


function ChatWindow({ navigation, route }) {

    const chatBox = route.params.chatBox

    const [userSender, setUserSender] = React.useState({})
    const [userRecieverIformation, setUserReciverInformation] = React.useState({})
    const [isVisible, setIsVisible] = React.useState(false);
    const [messages, setMessages] = React.useState([])
    const [modalVisible, setModalVisible] = React.useState(false);
    const [messageUpdate, setMessageUpdate] = React.useState("")
    const [messageUpdateId, setMessageUpdateId] = React.useState("")

    React.useEffect(() => {
        navigation.setOptions({
            headerTitle: `${userRecieverIformation?.name ? userRecieverIformation?.name : ""}`
        });

    }, [userRecieverIformation])

    React.useEffect(() => {
        const startGetUserReciverInformation = async () => {
            try {
                const tokenAccess = await getTokenAccess()
                const reqUserInformationNew = await GetUserInformation(tokenAccess)
                const userInformation = reqUserInformationNew.data.metadata.user
                setUserSender(userInformation)
                const userReciever = (userInformation.id == chatBox.members[0].user_id) ? chatBox.members[1].user_id : chatBox.members[0].user_id
                const reqUserReciever = await GetUserInformationById(userReciever, tokenAccess)
                setUserReciverInformation(reqUserReciever.data.metadata.user)
                // console.log(reqUserReciever.data.metadata.user)


                // lấy tất cả message
                if (tokenAccess) {
                    const id = setInterval(() => {
                        const runGetAllMessage = async () => {
                            const reqMessages = await GetAllMessage(chatBox._id, tokenAccess)
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
                console.log(error)
                showMessage({
                    message: "Thông Báo !",
                    description: error.response.data.message,
                    type: "danger"
                })
            }

        }
        startGetUserReciverInformation()
    }, [])

    function convertFormartMessage(messages) {
        return messages.map(message => {
            return getMessageType(message, userSender)
        })
    }

    const onSend = React.useCallback((messages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        )
    }, [])

    const UploadFile = () => {
        const pickDocument = async () => {
            let result = await DocumentPicker.getDocumentAsync({});

            if (result) {
                const file = result.assets[0]
                await sendMessageFile(file)
                setIsVisible(!isVisible)
            }
        };

        pickDocument()
    }

    const list = [
        {
            title: 'Gửi File',
            onPress: () => { UploadFile() }
        },
        {
            title: 'Cancel',
            containerStyle: { backgroundColor: BLUE },
            titleStyle: { color: 'white' },
            onPress: () => setIsVisible(false),
        },
    ];

    async function sendMessageText(message) {

        const messageSend = {
            "messageType": "text",
            "messageContent": message
        }

        try {
            const tokenAccess = await getTokenAccess()
            await CreateMessage(chatBox.id, tokenAccess, messageSend)
            console.log("send text ok !")
        } catch (error) {
            console.log(error)
            showMessage({
                message: "Thông Báo !",
                description: error.response.data.message,
                type: "danger"
            })
        }
    }

    async function sendMessageFile(file) {
        try {
            const data = await upateImageToS3(file)
            const tokenAccess = await getTokenAccess()
            await CreateMessage(chatBox.id, tokenAccess, { messageType: file.mimeType, messageContent: data.Location })
            showMessage({
                message: "Thông Báo !",
                description: "Gửi tin nhắn thành công",
                type: "success",
            });
        } catch (error) {
            console.log(error)
            showMessage({
                message: "Thông Báo !",
                description: error.response.data.message,
                type: "danger",
            });
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
            console.log(error)
            showMessage({
                message: "Thông Báo !",
                description: error.response.data.message,
                type: "danger"
            })
        }
    }

    function showModal(messageId) {
        setModalVisible(true)
        setMessageUpdateId(messageId)
    }

    async function startUpdateMessage(messageId) {
        try {
            const tokenAccess = await getTokenAccess()
            await UpdateMessage(chatBox.id, messageId, tokenAccess, messageUpdate)
            showMessage({
                message: "CẬP NHẬT TIN NHẮN THÀNH CÔNG",
                type: "success"
            })
            setMessageUpdate("")
        } catch (error) {
            console.log(error)
            showMessage({
                message: "Thông Báo !",
                description: error.response.data.message,
                type: "danger"
            })
            setMessageUpdate("")
        }
    }

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
                        case 2:
                            showModal(message._id)
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
                renderMessageAudio={(props) => <AudioMessage {...props} />}
                renderMessageText={(props) => <AnyMessage {...props} />}
                renderMessageImage={(props) => <ImageMessage {...props} />}
                user={{
                    _id: userSender.id,
                }}
            />
            <Button
                onPress={() => { setIsVisible(true) }}
                icon={
                    <Icon name="dots-three-horizontal" color="white" size={15} />
                }
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

            {/* thanh cập nhật thông tin message */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Nhập nội dung cần cập nhật</Text>
                        <Input
                            placeholder='Tin nhắn mới'
                            style={{ fontSize: 16 }}
                            onChangeText={setMessageUpdate}
                            value={messageUpdate}
                        />
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: "100%"
                        }}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    startUpdateMessage(messageUpdateId, messageUpdate)
                                    setModalVisible(!modalVisible)
                                }}>
                                <Text style={styles.textStyle}>Cập nhật</Text>
                            </Pressable>
                            <Button
                                title='Hủy'
                                buttonStyle={{
                                    borderRadius: 20,
                                    padding: 10,
                                    elevation: 2,
                                    backgroundColor: "gray"
                                }}
                                onPress={() => {
                                    setModalVisible(!modalVisible)
                                }}>
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>
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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        width: "80%",
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default ChatWindow