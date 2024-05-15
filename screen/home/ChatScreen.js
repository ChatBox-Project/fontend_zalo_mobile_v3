import React from 'react'
import {FlatList, StyleSheet, View} from 'react-native';
import {getToken, getUser} from "../../store/Store";
import {useFocusEffect} from "@react-navigation/native";
import {Avatar, ListItem} from "react-native-elements";
import {getAllConverstaion, getUserProfileById} from "../../api";

function ChatScreen({navigation}) {

    const [chats, setChats] = React.useState([])
    const [userChat, setUserChat] = React.useState({})

    // console.log(chats)

    // lấy thông tin người dùng trong cuộc trò chuyện
    async function getUserChat(chats) {
        const userChat = {}
        const tokenAccess = await getToken()
        const myUserId = await getUser()
        for (let i = 0; i < chats.length; i++) {
            if (chats[i].hasOwnProperty("label") === false){
                try {
                    const userChatId = chats[i].member.filter(member => member._id !== myUserId._id)[0]._id
                    const request = await getUserProfileById(userChatId, tokenAccess)
                    userChat[chats[i]._id] = request.data
                } catch (error) {
                    console.log(error)
                }
            }
        }
        setUserChat(userChat)
    }

    useFocusEffect(
        React.useCallback(() => {
            const getAllChats = async () => {
                try {
                    const token = await getToken()
                    const user = await getUser()
                    const listChat = await getAllConverstaion(user._id, token)
                    setChats(listChat.data)
                    getUserChat(listChat.data)
                } catch (e) {
                    console.log(e)
                }
            }
            // lay tat ca cuoc tro chuyen
            getAllChats()
        }, [])
    );

    const renderChat = ({item}) => {
        const userChatInfo = userChat[item._id]

        if (item.hasOwnProperty("label") === false){
            return (
                <ListItem onPress={() => {

                    navigation.push("ChatMessageScreen", {conservationId: item._id, isGroup: false, userId: userChatInfo._id})
                }} bottomDivider>
                    {
                        userChatInfo?.profilePicture ?
                            <Avatar rounded size={"medium"} source={{uri: userChatInfo?.profilePicture}}/>
                            :
                            <Avatar
                                rounded
                                icon={{name: 'user', type: 'font-awesome', color: 'white'}}
                                size={"medium"}
                                backgroundColor={"#cccccc"}
                            />
                    }
                    <ListItem.Content>
                        <ListItem.Title>{userChatInfo?.username}</ListItem.Title>
                        <ListItem.Subtitle>{item.lastUpdate}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron/>
                </ListItem>
            )
        }
        else {
            return (
                <ListItem onPress={() => {
                    navigation.push("ChatMessageScreen", {conservationId: item._id, isGroup: true})
                }} bottomDivider>
                    {
                        item?.imageGroup ?
                            <Avatar rounded size={"medium"} source={{uri: item.imageGroup}}/>
                            :
                            <Avatar
                                rounded
                                icon={{name: 'group', type: 'font-awesome', color: 'white'}}
                                size={"medium"}
                                backgroundColor={"#cccccc"}
                            />
                    }
                    <ListItem.Content>
                        <ListItem.Title>{item.label}</ListItem.Title>
                        <ListItem.Subtitle>{item.lastUpdate}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron/>
                </ListItem>
            )
        }
    }


    return (
        <FlatList
            keyExtractor={(item, index) => {
                return item._id.toString()
            }}
            data={chats}
            renderItem={renderChat}
        />
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