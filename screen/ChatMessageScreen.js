import React from 'react';
import {GiftedChat} from 'react-native-gifted-chat'
import getDetailConservation from "../api/conversation/get-detail-conservation";
import {getToken, getUser} from "../store/Store";
import {socket} from "../config/SocketClient";
import {getUserProfileById} from "../api";
import uuid from 'react-native-uuid';
import {Text, TouchableOpacity} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import {BottomSheet, ListItem} from "react-native-elements";
import {getFileNameFromUri, getMessageType, pickImageFromLibrary} from "../util/function/MyFunction";
import {upateImageToS3} from "../config/AWS";

function ChatMessageScreen({navigation, route}) {

    const [messages, setMessages] = React.useState([])
    const [detailConversation, setDetailConversation] = React.useState({})
    const [user, setUser] = React.useState({})
    const [isVisible, setIsVisible] = React.useState(false);

    // danh sach menu
    const list = [
        {
            title: 'Gửi tài liệu',
            containerStyle: { backgroundColor: 'white' },
            titleStyle: { color: 'black' },
            onPress: () => {
                setIsVisible(false)
                sendMessageFileOnSocket()
            }
        },
        {
            title: 'Thoát',
            containerStyle: { backgroundColor: 'red' },
            titleStyle: { color: 'white' },
            onPress: () => setIsVisible(false),
        },
    ];

    React.useLayoutEffect(() => {
        async function loadDetailConversation() {
            try {
                const token = await getToken()
                const user1 = await getUser()
                const detailConservation1 = await getDetailConservation(route.params.conservationId, token)
                setUser(user1)
                setDetailConversation(detailConservation1.data)

                navigation.setOptions({
                    title: detailConservation1.data.label
                })

            } catch (e) {
                console.log(e)
            }

        }

        // lay thong tin cuoc tro chuyen
        loadDetailConversation()
    }, [])

    // gui su kien join room va nhan tin nhan qua socket
    React.useLayoutEffect(() => {
        socket.emit("join_room_conversation", {roomId: route.params.conservationId});

        const listener = async (data) => {
            const user1 = await getUser()
            setMessages(previousMessages =>
                GiftedChat.append(previousMessages, getMessageType(user1._id, data)),
            )
        };

        socket.on("broadcast_to_all_user_in_room", listener);

        // Hàm cleanup
        return () => {
            socket.off("broadcast_to_all_user_in_room", () => {
                console.log("socket off");
            });
        };
    }, []);


    // gui tin nhan qua socket
    async function sendMessageOnSocket(message) {
        try {
            const token = await getToken()
            const userInformation = await getUser()
            const user = await getUserProfileById(userInformation._id, token)

            socket.emit("message_from_client", {
                roomId: route.params.conservationId,
                message: message.text,
                type_message: "text",
                createAt: message.createAt,
                key: uuid.v4(),
                sender: user.data
            });

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
            const fileUri = await pickImageFromLibrary()

            if(fileUri !== ""){
                const locationFile = (await upateImageToS3(fileUri)).Location
                socket.emit("message_from_client", {
                    roomId: route.params.conservationId,
                    message: locationFile,
                    type_message: "file",
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

    const onSend = React.useCallback((messages = []) => {
        sendMessageOnSocket(messages[0])
    }, [])

    return (
        <>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: user._id,
                }}
            />
            <TouchableOpacity
                onPress={() => setIsVisible(true)}
                style={{justifyContent: "center", alignItems: "center", backgroundColor: "#cccccc"}}
            >
                <Entypo name={"dots-three-horizontal"} size={25} color={"white"}/>
            </TouchableOpacity>
            <BottomSheet
                isVisible={isVisible}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
            >
                {list.map((l, i) => (
                    <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
                        <ListItem.Content>
                            <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </BottomSheet>
        </>
    );
}

export default ChatMessageScreen;