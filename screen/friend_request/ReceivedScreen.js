import React from 'react'
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {getToken, getUser} from "../../store/Store";
import {
    getListUserRequestAddFriendToMe,
    cancelAddFriendByUserRecieved,
    acceptAddFriendFromUserRecieved
} from "../../api";
import {Avatar, ListItem} from "react-native-elements";

function ReceivedScreen({navigation}) {

    const [listUserRequestAddFriend, setListUserRequestAddFriend] = React.useState([])

    React.useEffect(() => {
        getRequestAddFriend()
    }, [])

    // Lấy danh sách user gửi lời mời kết bạn đến mình
    const getRequestAddFriend = async () => {
        try {
            const tokenAccess = await getToken()
            const user = await getUser()
            const userId = user._id
            const response = await getListUserRequestAddFriendToMe(userId, tokenAccess)
            // console.log(response.data.data)
            setListUserRequestAddFriend(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    // Hủy bỏ lời mời kết bạn
    const CancelAddFriendByUserRecieved = async (userRecieve) => {
        try {
            const tokenAccess = await getToken()
            const user = await getUser()
            const userId = user._id
            const response = await cancelAddFriendByUserRecieved(userRecieve, userId, tokenAccess);
            deleteRequestAddFriend(userRecieve)
        } catch (error) {
            console.log(error)
        }
    }

    const AcceptAddFriendFromUserRecieved = async (userRecieve) => {
        try {
            const tokenAccess = await getToken()
            const user = await getUser()
            const userId = user._id
            const response = await acceptAddFriendFromUserRecieved(userId, userRecieve, tokenAccess);
            deleteRequestAddFriend(userRecieve)
        } catch (error) {
            console.log(error)
        }
    }

    // Xóa user ra khỏi danh sách
    const deleteRequestAddFriend = (userId) => {
        const newListUserRequestAddFriend = listUserRequestAddFriend.filter(user => user._id !== userId)
        setListUserRequestAddFriend(newListUserRequestAddFriend)
    }


    return (
        <View style={styles.container}>
            {
                listUserRequestAddFriend.length > 0 ?
                    <FlatList
                        style={{width: '100%'}}
                        data={listUserRequestAddFriend}
                        renderItem={({item}) => {
                            return (
                                <ListItem key={item._id} bottomDivider>
                                    {
                                        item.profilePicture ?
                                            <Avatar source={{uri: item.profilePicture}}/>
                                            :
                                            <Avatar
                                                rounded
                                                icon={{name: 'user', type: 'font-awesome', color: 'gray'}}
                                                size={50}
                                                onPress={() => console.log("Works!")}
                                                activeOpacity={0.7}
                                                containerStyle={{backgroundColor: 'lightgray'}}
                                            />
                                    }
                                    <ListItem.Content>
                                        <ListItem.Title>{item.username}</ListItem.Title>
                                        <ListItem.Subtitle>{item.phoneNumber}</ListItem.Subtitle>
                                    </ListItem.Content>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-around',
                                            width: 180
                                        }}
                                    >
                                        <TouchableOpacity
                                            onPress={() => {
                                                AcceptAddFriendFromUserRecieved(item._id)
                                            }}
                                            style={{
                                                backgroundColor: "#0be881",
                                                padding: 10,
                                                borderRadius: 5
                                            }}
                                        >
                                            <Text style={{color: "white"}}>Chấp nhận</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                CancelAddFriendByUserRecieved(item._id)
                                            }}
                                            style={{
                                                backgroundColor: "#f53b57",
                                                padding: 10,
                                                borderRadius: 5
                                            }}
                                        >
                                            <Text style={{color: "white"}}>Hủy bỏ</Text>
                                        </TouchableOpacity>
                                    </View>
                                </ListItem>
                            )
                        }}
                    />
                    :
                    <>
                        <View style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 50,
                            marginBottom: 10,
                            backgroundColor: "#74b9ff"
                        }}>
                            <Icon name='address-card' size={25} color={"white"}/>
                        </View>
                        <Text style={{color: "gray"}}>Chưa có lời mời kết bạn nào ......</Text>
                    </>
            }
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

export default ReceivedScreen