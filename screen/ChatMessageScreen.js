import React from 'react';
import {GiftedChat} from 'react-native-gifted-chat'
import getDetailConservation from "../api/conversation/get-detail-conservation";
import {getToken, getUser} from "../store/Store";
import {socket} from "../config/SocketClient";
import {getUserProfileById} from "../api";
import uuid from 'react-native-uuid';

function ChatMessageScreen({navigation, route}) {

    const [messages, setMessages] = React.useState([])
    const [detailConversation, setDetailConversation] = React.useState({})
    const [user, setUser] = React.useState({})

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

    // format tin nhan nhan duoc qua socket
    function formartMessageSocket(data){
        return {
            _id: data.key,
            text: data.message,
            createdAt: data.createAt,
            user: {
                _id: data.sender._id,
                name: data.sender.username,
                avatar: data.sender.profilePicture
            }
        }
    }

    // gui su kien join room va nhan tin nhan qua socket
    React.useLayoutEffect(() => {
        socket.emit("join_room_conversation", { roomId: route.params.conservationId });

        const listener = (data) => {
            setMessages(previousMessages =>
                GiftedChat.append(previousMessages, formartMessageSocket(data)),
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
        try{
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

        }catch (e) {
            console.log(e)
        }
    }

    const onSend = React.useCallback((messages = []) => {
        sendMessageOnSocket(messages[0])
    }, [])

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: user._id,
            }}
        />
    );
}

export default ChatMessageScreen;