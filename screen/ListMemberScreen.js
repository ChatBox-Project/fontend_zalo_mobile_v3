import React from 'react'
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {getToken, getUser} from "../store/Store";
import getDetailConservation from "../api/conversation/get-detail-conservation";
import {Avatar, Button, ListItem} from "react-native-elements";

function ListMember({navigation, route}) {

    const [detailConservation, setDetailConservation] = React.useState({})
    const [members, setMembers] = React.useState([])
    const [mainUser, setMainUser] = React.useState(null)

    // console.log(members)

    React.useLayoutEffect(() => {
        async function loadDetailConversation() {
            try {
                const token = await getToken()
                const detailConservation1 = await getDetailConservation(route.params.conservationId, token)
                setDetailConservation(detailConservation1.data)
                setMembers(detailConservation1.data.member)
            } catch (e) {
                console.log(e)
            }

        }
        // lay thong tin cuoc tro chuyen
        loadDetailConversation()
    }, [])


    React.useLayoutEffect(() => {
        const getMainUser = async () => {
            try {
                const user = await getUser();
                setMainUser(user)
            } catch (error) {
                console.log(error)
            }
        }
        // lay thong tin user tu store
        getMainUser();

    }, [])


    return (
        <View style={styles.container}>
            <FlatList
                style={{
                    width: "100%",
                }}
                data={members}
                renderItem={({item}) => {
                    return (
                        <ListItem
                            onPress={() => {
                                mainUser._id === item._id ?
                                    navigation.push("Personal")
                                    :
                                    navigation.push("UserProfileScreen", {userId: item._id})
                            }}
                            style={{
                                width: "100%",
                            }}
                        >
                            {
                                item?.avatarUrl ?
                                    <Avatar
                                        size={60}
                                        rounded
                                        source={{uri: item?.profilePicture}}
                                    />
                                    :
                                    <Avatar
                                        size={60}
                                        rounded
                                        icon={{name: 'user', type: 'font-awesome'}}
                                        containerStyle={{
                                            backgroundColor: "#cccccc"
                                        }}
                                    />

                            }
                            <ListItem.Content>
                                <ListItem.Title style={{color: "black", fontWeight: "bold"}}>
                                    {item?.username}
                                </ListItem.Title>
                                <ListItem.Subtitle style={{color: "gray"}}>
                                    Xem trang cá nhân
                                </ListItem.Subtitle>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    )
                }}
                keyExtractor={item => item._id}
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

export default ListMember