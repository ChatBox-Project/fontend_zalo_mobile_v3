import React from 'react';
import {GiftedChat} from 'react-native-gifted-chat'
import getDetailConservation from "../api/conversation/get-detail-conservation";
import {getToken, getUser} from "../store/Store";
import {socket} from "../config/SocketClient";
import {getUserProfileById} from "../api";
import uuid from 'react-native-uuid';
import {Animated, Text, TouchableOpacity, View} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import {Avatar, BottomSheet, ListItem, Icon} from "react-native-elements";
import {
    getEndPoint,
    getFileNameFromUri,
    getMessageType,
    pickDocFromLibrary, pickImageFromLibrary,
} from "../util/function/MyFunction";
import {upateImageToS3} from "../config/AWS";
import AudioMessage from "../util/message_type/AudioMessage";
import ImageMessage from "../util/message_type/ImageMessage";
import {Dimensions} from 'react-native';
import outGroup from "../api/conversation/out-group";
import {showMessage} from "react-native-flash-message";
import RemoveGroup from "../api/conversation/remove-group";
import SaveMessage from "../api/message/save-message";
import GetMessageConversation from "../api/message/get-message-conversation";
import RecallMessage from "../api/message/recall-message";
import openUrlInBrowser from "../util/function/OpenFileInBrowser";

// import AnyMessage from "../util/message_type/AnyMessage";

function ChatMessageScreen({navigation, route}) {

    // chieu rong cua man hinh
    const {width, height} = Dimensions.get('window');
    // danh sach tin nhan
    const [messages, setMessages] = React.useState([])
    // thong tin cuoc tro chuyen
    const [detailConversation, setDetailConversation] = React.useState({})
    // thong tin nguoi dung đang đăng nhập
    const [user, setUser] = React.useState({})
    // hien thi gui file va anh
    const [isVisible, setIsVisible] = React.useState(false);
    // hien thi dang nhap van ban
    const [isTyping, setIsTyping] = React.useState(false);
    const translateX = React.useRef(new Animated.Value(width)).current;
    // hien thi menu tuy chon nhom
    const [isMenuVisible, setIsMenuVisible] = React.useState(true);
    // thong tin nguoi dung trong cuoc tro chuyen
    const [userChat, setUserChat] = React.useState({})
    const listMenu = [
        {
            title: 'Thêm thành viên',
            icon: 'person-add',
            onPress: () => {
                navigation.push("AddMember", {conservationId: route.params.conservationId})
            }
        },
        {
            title: 'Danh sách thành viên',
            icon: 'list',
            onPress: () => {
                navigation.push("ListMember", {conservationId: route.params.conservationId})
            }
        },
        {
            title: 'Rời nhóm',
            icon: 'exit-to-app',
            onPress: async () => {
                try {
                    const myUser = await getUser()
                    const token = await getToken()
                    outGroup(route.params.conservationId, myUser._id, token)
                    navigation.push("Index")
                    showMessage({
                        message: "Thông báo",
                        description: `Bạn đã rời nhóm ${detailConversation?.label}`,
                        type: "success",
                    })
                } catch (e) {
                    console.log(e)
                }
            }
        },
    ]
    const listMenuAdminGroup = [
        {
            title: 'Đổi tên nhóm',
            icon: 'edit',
            onPress: () => {
                navigation.push("RenameGroup", {conservationId: route.params.conservationId})
            }
        },
        {
            title: 'Giải tán nhóm',
            icon: 'delete',
            onPress: async () => {
                try {
                    const token = await getToken()
                    await RemoveGroup(route.params.conservationId, user._id, token)
                    navigation.push("Index")
                    showMessage({
                        message: "Thông báo",
                        description: `Bạn đã giải tán nhóm ${detailConversation?.label}`,
                        type: "success",
                    })
                } catch (e) {
                    console.log(e)
                }
            }
        },
    ]

    // hien thi menu
    const translateMenu = () => {
        Animated.timing(translateX, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }

    // an menu
    const translateMenu1 = () => {
        Animated.timing(translateX, {
            toValue: width,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }

    React.useEffect(() => {
        // neu la nhom thi hien thi nut menu
        if (route.params.isGroup === true) {
            navigation.setOptions({
                headerRight: () => (
                    <TouchableOpacity
                        onPress={() => {
                            isMenuVisible ? translateMenu() : translateMenu1()
                            setIsMenuVisible(!isMenuVisible)
                        }}
                        style={{marginRight: 10}}
                    >
                        <Entypo name={"menu"} size={30} color={"white"}/>
                    </TouchableOpacity>
                ),
            });
        }
    }, [isMenuVisible])

    // danh sach menu
    const list = [
        {
            title: 'Gửi ảnh',
            containerStyle: {backgroundColor: 'white'},
            titleStyle: {color: 'black'},
            onPress: () => {
                setIsVisible(false)
                sendMessageImageOnSocket()
            }
        },
        {
            title: 'Gửi tài liệu',
            containerStyle: {backgroundColor: 'white'},
            titleStyle: {color: 'black'},
            onPress: () => {
                setIsVisible(false)
                sendMessageFileOnSocket()
            }
        },
        {
            title: 'Thoát',
            containerStyle: {backgroundColor: 'red'},
            titleStyle: {color: 'white'},
            onPress: () => setIsVisible(false),
        },
    ];

    async function loadDetailConversation() {
        try {
            const token = await getToken()
            const detailConservation1 = await getDetailConservation(route.params.conservationId, token)
            if (!route.params.isGroup) {
                const request = await getUserProfileById(route.params.userId, token)
                const userChatInf = request.data
                setUserChat(userChatInf)
                navigation.setOptions({
                    title: userChatInf.username
                })
            }
            setDetailConversation(detailConservation1.data)

            if (route.params.isGroup) {
                navigation.setOptions({
                    title: detailConservation1.data?.label,
                })
            }

        } catch (e) {
            console.log(e)
        }
    }

    async function loadMessageConversation() {
        try {
            const token = await getToken()
            const myUser = await getUser()
            setUser(myUser)
            const listMessageReq = await GetMessageConversation(route.params.conservationId, token)
            const listMessage = listMessageReq.data.data
            const formartMessage = listMessage.map((item) => {
                return getMessageType(myUser, item)
            })
            setMessages(prevState => GiftedChat.append(prevState, formartMessage))
        } catch (e) {
            console.log(e)
        }
    }

    React.useLayoutEffect(() => {
        // lay thong tin cuoc tro chuyen
        loadDetailConversation()
        // lay thong tin tin nhan cuoc tro chuyen
        loadMessageConversation()
    }, [])

    // gui su kien join room va nhan tin nhan qua socket
    React.useEffect(() => {
        const joinRoom = () => {
            socket.emit("join_room_conversation", {roomId: route.params.conservationId});
        };

        const onNewMessage = async (data) => {
            const user1 = await getUser();
            setMessages(previousMessages =>
                GiftedChat.append(previousMessages, getMessageType(user1, data)),
            );
        };

        joinRoom();
        socket.on("broadcast_to_all_user_in_room", onNewMessage);

    }, []);

    // lang nghe su kien thu hoi tin nhan
    React.useLayoutEffect(() => {
        socket.on("recall_message_server", (data) => {
            const newMessages = messages.map((message) => {
                if (message._id === data.idMessage) {
                    return {
                        _id: message._id,
                        createdAt: message.createdAt,
                        user: {
                            _id: message.user._id,
                            name: message.user.name,
                        },
                        text: "Tin nhắn đã bị thu hồi",
                    }
                }
                return message
            })

            setMessages(newMessages);
        })
    }, [messages])


    // gui tin nhan qua socket
    async function sendMessageOnSocket(message) {
        try {
            const token = await getToken()
            const userInformation = await getUser()
            const user = await getUserProfileById(userInformation._id, token)

            const data = {
                roomId: route.params.conservationId,
                message: message.text,
                type_message: "text",
                createdAt: new Date(),
                key: uuid.v4(),
                sender: user.data._id,
                name_file: "",
                conversation: route.params.conservationId,
                extend_text: "",
            }
            await SaveMessage(data, token)

            socket.emit("message_from_client", {
                roomId: route.params.conservationId,
                message: message.text,
                type_message: "text",
                createdAt: message.createdAt,
                key: uuid.v4(),
                sender: user.data
            });

        } catch (e) {
            console.log(e)
        }
    }

    // gui su kien đang nhap văn bản qua socket
    async function sendTypingOnSocket(typing) {
        try {
            const token = await getToken()
            const userInformation = await getUser()
            const user = await getUserProfileById(userInformation._id, token)

            if (typing === true) {
                socket.emit("typing_from_client_on", {
                    roomId: route.params.conservationId,
                    typing: typing,
                    data: user.data
                });
            } else {
                socket.emit("typing_from_client_off", {
                    roomId: route.params.conservationId,
                    typing: typing,
                    data: user.data
                });
            }

        } catch (e) {
            console.log(e)
        }
    }

    // gui file qua socket
    async function sendMessageFileOnSocket() {
        try {

            const token = await getToken()
            const userInformation = await getUser()
            const user = await getUserProfileById(userInformation._id, token)
            const fileUri = await pickDocFromLibrary()

            if (fileUri !== "") {
                const messageFilePending = {
                    _id: uuid.v4(),
                    createdAt: new Date(),
                    user: {
                        _id: user.data._id,
                        name: user.data.username,
                    },
                    pending: true,
                }

                setMessages(previousMessages =>
                    GiftedChat.append(previousMessages, messageFilePending),
                )

                const locationFile = (await upateImageToS3(fileUri.uri, fileUri.mimeType)).Location
                const data = {
                    roomId: route.params.conservationId,
                    message: locationFile,
                    type_message: "file",
                    createdAt: new Date(),
                    key: uuid.v4(),
                    sender: user.data._id,
                    name_file: getFileNameFromUri(locationFile),
                    conversation: route.params.conservationId,
                    extend_text: getEndPoint(locationFile)
                }
                await SaveMessage(data, token)
                removePendingMessage(messageFilePending)
                socket.emit("message_from_client", {
                    roomId: route.params.conservationId,
                    message: locationFile,
                    type_message: "file",
                    createdAt: new Date(),
                    key: uuid.v4(),
                    sender: user.data,
                    name_file: getFileNameFromUri(locationFile)
                });
            }

        } catch (e) {
            console.log(e)
        }
    }

    // gui file anh qua socket
    async function sendMessageImageOnSocket() {
        try {

            const token = await getToken()
            const userInformation = await getUser()
            const user = await getUserProfileById(userInformation._id, token)
            const fileUri = await pickImageFromLibrary()

            if (fileUri !== "") {
                const messageFilePending = {
                    _id: uuid.v4(),
                    createdAt: new Date(),
                    user: {
                        _id: user.data._id,
                        name: user.data.username,
                    },
                    pending: true,
                }

                setMessages(previousMessages =>
                    GiftedChat.append(previousMessages, messageFilePending),
                )

                const locationFile = (await upateImageToS3(fileUri.uri, fileUri.mimeType)).Location
                const data = {
                    roomId: route.params.conservationId,
                    message: locationFile,
                    type_message: "image",
                    createAt: new Date(),
                    key: uuid.v4(),
                    sender: user.data._id,
                    name_file: getFileNameFromUri(locationFile),
                    conversation: route.params.conservationId,
                    extend_text: getEndPoint(locationFile)
                }
                await SaveMessage(data, token)
                removePendingMessage(messageFilePending)
                socket.emit("message_from_client", {
                    roomId: route.params.conservationId,
                    message: locationFile,
                    type_message: "image",
                    createAt: new Date(),
                    key: uuid.v4(),
                    sender: user.data,
                    name_file: getFileNameFromUri(locationFile)
                });
            }

        } catch (e) {
            console.log(e)
        }
    }

    // xoa tin nhan dang cho
    function removePendingMessage(messagePending) {
        const newMessages = messages.filter((message) => message._id !== messagePending._id)
        setMessages(newMessages)
    }

    const onSend = React.useCallback((messages = []) => {
        sendMessageOnSocket(messages[0])
    }, [])

    // thu hoi tin nhan
    const removeMessage = async (message) => {
        try{
            const token = await getToken()
            const listMessageReq = await GetMessageConversation(route.params.conservationId, token)
            const listMessage = listMessageReq.data.data
            const message1 = listMessage.find((item) => item.key === message._id)
            await RecallMessage(message._id, "Tin nhắn đã bị thu hồi", token)
            socket.emit("recall_message", {
                idConversation: route.params.conservationId,
                idMessage: message._id,
                kindof: 'recall'
            })
            showMessage({
                message: "Thông báo",
                description: "Đã thu hồi tin nhắn",
                type: "success",
            })
        }catch (e) {
            console.log(e)
        }
    }

    // xu ly su kien long press tin nhan
    const onLongPressText = (context, message) => {
        console.log(message)
        if (message.text && message.text !== "Tin nhắn đã bị thu hồi" && message.user._id === user._id) {
            const options = [
                'Thu hồi',
                'Cancel',
            ];
            const cancelButtonIndex = options.length - 1;
            context.actionSheet().showActionSheetWithOptions({
                options,
                cancelButtonIndex,
            }, (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        removeMessage(message)
                        break;
                    default:
                        break;
                }
            })
        }
        if(message.hasOwnProperty("image") || message.hasOwnProperty("audio") && message.text !== "Tin nhắn đã bị thu hồi" && message.user._id === user._id){
            const options = [
                'Xem',
                'Thu hồi',
                'Cancel',
            ];
            const cancelButtonIndex = options.length - 1;
            context.actionSheet().showActionSheetWithOptions({
                options,
                cancelButtonIndex,
            }, (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        openUrlInBrowser(message?.image ? message.image : message.audio)
                        break;
                    case 1:
                        removeMessage(message)
                        break;
                    default:
                        break;
                }
            })
        }
    }

    return (
        <>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: user._id,
                }}
                onInputTextChanged={(text) => {
                    if (text !== "") {
                        sendTypingOnSocket(true)
                    } else {
                        sendTypingOnSocket(false)
                    }
                }}
                isTyping={isTyping}
                // renderMessageAudio={AudioMessage}
                // renderMessageImage={ImageMessage}
                onLongPress={onLongPressText}
            />
            <TouchableOpacity
                onPress={() => setIsVisible(true)}
                style={{justifyContent: "center", alignItems: "center", backgroundColor: "#cccccc"}}
            >
                <Entypo name={"dots-three-horizontal"} size={25} color={"white"}/>
            </TouchableOpacity>
            <BottomSheet
                isVisible={isVisible}
                containerStyle={{backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)'}}
            >
                {list.map((l, i) => (
                    <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
                        <ListItem.Content>
                            <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </BottomSheet>
            <Animated.View
                style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    top: 0,
                    justifyContent: "flex-start",
                    flexDirection: "column",
                    backgroundColor: "white",
                    transform: [{translateX: translateX}],
                }}
            >
                <View
                    style={{
                        alignItems: "center",
                        paddingVertical: 15,
                    }}
                >
                    {
                        detailConversation?.imageGroup ?
                            <Avatar
                                size={"large"}
                                rounded
                                source={{uri: detailConversation.imageGroup}}
                                containerStyle={{backgroundColor: "#cccccc"}}
                            />
                            :
                            <Avatar
                                size={"large"}
                                rounded
                                icon={{name: 'group', type: 'font-awesome'}}
                                containerStyle={{backgroundColor: "#cccccc"}}
                            />
                    }
                    <Text style={{fontSize: 20, fontWeight: "bold", marginTop: 10}}>{detailConversation?.label}</Text>
                </View>
                <View>
                    {
                        // neu la admin nhom thi hien thi them menu admin
                        detailConversation?.createdBy === user._id ?
                            listMenu.concat(listMenuAdminGroup).map((item, i) => (
                                <ListItem onPress={() => {
                                    item.onPress()
                                }} key={i} bottomDivider>
                                    <Icon name={item.icon}/>
                                    <ListItem.Content>
                                        <ListItem.Title>{item.title}</ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.Chevron/>
                                </ListItem>
                            ))
                            :
                            listMenu.map((item, i) => (
                                <ListItem onPress={() => {
                                    item.onPress()
                                }} key={i} bottomDivider>
                                    <Icon name={item.icon}/>
                                    <ListItem.Content>
                                        <ListItem.Title>{item.title}</ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.Chevron/>
                                </ListItem>
                            ))
                    }
                </View>
            </Animated.View>
        </>
    );
}

export default ChatMessageScreen;