import React from 'react'
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Avatar, Button, ListItem} from "react-native-elements"
import {getToken, getUser} from "../store/Store";
import {FindUser} from "../api";
import getDetailConservation from "../api/conversation/get-detail-conservation";
import addMemberConversation from "../api/conversation/add-member-conversation";

function AddMember({navigation, route}) {

    const [search, updateSearch] = React.useState("")
    const [users, setUsers] = React.useState(null)
    const [mainUser, setMainUser] = React.useState(null)
    const [detailConversation, setDetailConversation] = React.useState({})
    const [listMember, setListMember] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
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

    React.useLayoutEffect(() => {
        async function loadDetailConversation() {
            try {
                const token = await getToken()
                const detailConservation1 = await getDetailConservation(route.params.conservationId, token)
                setDetailConversation(detailConservation1.data)
                setListMember(detailConservation1.data.member.map(member => member._id))
                // console.log(detailConservation1.data)
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


    React.useEffect(() => {
        if (search) {
            const runSearch = async () => {
                try {
                    const tokenAccess = await getToken();
                    const user = await FindUser(search, tokenAccess);
                    // console.log(user.data)
                    if (user.data.exist) {
                        setUsers(user.data)
                    } else {
                        setUsers(null)
                    }
                } catch (error) {
                    console.log(error)
                }
            }

            // tim kiem user
            runSearch()
        }
    }, [search])

    // kiem tra xem user co phai la thanh vien khong
    function isMember(userId) {
        return listMember.find(member => member === userId)
    }

    // them thanh vien vao cuoc tro chuyen
    async  function addMember(userId) {
        try {
            setLoading(true)
            const token = await getToken()
            await addMemberConversation(route.params.conservationId, userId, token)
            setListMember([...listMember, userId])
            setLoading(false)
        } catch (e) {
            setLoading(false)
            console.log(e)
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                value={search}
                onChangeText={updateSearch}
                placeholder='Số điện thoại,...'
                style={{
                    backgroundColor: "white",
                    width: "95%",
                    borderRadius: 5,
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderWidth: 1,
                    borderColor: "#cccccc",
                    marginVertical: 10
                }}
            />
            {
                !users ?
                    <Text style={{color: "gray", marginTop: 20}}>Vui lòng nhập thông tin tìm kiếm...</Text>
                    :
                    <ListItem
                        onPress={() => {
                            mainUser._id === users._id ?
                                navigation.push("Personal")
                                :
                                navigation.push("UserProfileScreen", {userId: users._id})
                        }}
                        style={{
                            width: "100%",
                        }}
                    >
                        {
                            users?.avatarUrl ?
                                <Avatar
                                    size={60}
                                    rounded
                                    source={{uri: users?.profilePicture}}
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
                                {users?.username}
                            </ListItem.Title>
                            <ListItem.Subtitle style={{color: "gray"}}>
                                Xem trang cá nhân
                            </ListItem.Subtitle>
                        </ListItem.Content>
                        {
                            !isMember(users._id) ?
                                <Button
                                    onPress={() => {
                                        addMember(users._id)
                                    }}
                                    loading={loading}
                                    title={"Thêm thành viên"}
                                    buttonStyle={{
                                        backgroundColor: "#2ecc71",
                                        borderRadius: 5
                                    }}/>
                                :
                                <Text style={{color: "gray", fontSize: 16, fontWeight: "bold", fontStyle: "italic"}}>Là
                                    thành viên</Text>
                        }
                    </ListItem>
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

export default AddMember