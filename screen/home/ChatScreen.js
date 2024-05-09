import React from 'react'
import {FlatList, StyleSheet, View} from 'react-native';
import {getAllConverstaion} from "../../api/conversation";
import {getToken, getUser} from "../../store/Store";
import {useFocusEffect} from "@react-navigation/native";
import {Avatar, ListItem} from "react-native-elements";

function ChatScreen({navigation}) {

    const [chats, setChats] = React.useState([])

    useFocusEffect(
        React.useCallback(() => {
            const getAllChats = async () => {
                try {
                    const token = await getToken()
                    const user = await getUser()
                    const listChat = await getAllConverstaion(user._id, token)
                    setChats(listChat.data)
                } catch (e) {
                    console.log(e)
                }
            }
            // lay tat ca cuoc tro chuyen
            getAllChats()
        }, [])
    );

    const renderChat = ({item}) => {
        return (
            <ListItem onPress={() => {
                navigation.push("ChatMessageScreen", {conservationId: item._id, isGroup: true})
            }} bottomDivider>
                {
                    item?.imageGroup ?
                        <Avatar source={{uri: item.imageGroup}}/>
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