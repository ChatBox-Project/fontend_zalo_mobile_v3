import React, { useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/EvilIcons';
import { Avatar, Button, CheckBox } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { BLUE } from '../colors/Colors';
import { getTokenAccess } from '../../store/MyStore';
import { GetUserInformation } from '../../api/SignInAPI';
import { GetUserByPhone } from '../../api/UserAPI';
import { CreateGroupChat } from '../../api/ChatBoxAPI';

function CreateNewGroupScreen({ navigation }) {

    const [checks, setChecks] = React.useState([])
    const [search, setSearch] = React.useState("");
    const [image, setImage] = React.useState(null);
    const [groupName, setGroupName] = React.useState("")
    const [adminId, setAdminId] = React.useState("")
    const [friends, setFriends] = React.useState(null)

    // console.log(friends)

    React.useEffect(() => {
        async function getMainUser() {
            try {
                const tokenAccess = await getTokenAccess()
                const mainUser = await GetUserInformation(tokenAccess)
                setAdminId(mainUser.data.metadata.user._id)
            } catch (error) {
                console.log(error)
            }
        }
        getMainUser()
    }, [])


    React.useEffect(() => {
        if (search) {
            const runSearch = async () => {
                try {
                    const tokenAccess = await getTokenAccess()
                    const reqUser = await GetUserByPhone(search, tokenAccess);
                    setFriends(reqUser.data.metadata.foundUser)
                } catch (error) {
                    console.log(error)
                }
            }
            runSearch()
        }
    }, [search])

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

    const enterCheck = (idFriend) => {
        if (checks.includes(idFriend)) {
            let newchecks = checks.filter((check) => {
                return check !== idFriend
            })
            setChecks(newchecks)
        } else {
            setChecks([...checks, idFriend])
        }
    }

    const createGroupChat = async () => {
        try {
            const newGroup = {
                adminId,
                userId: checks,
                groupName
            }
            await CreateGroupChat(newGroup)
            navigation.push("Index")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.container} >
            <View style={{ flexDirection: 'row', width: "100%", paddingVertical: 15, justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={pickImage}
                        style={{ marginRight: 15 }}
                    >
                        {
                            image === null ?
                                <Icon name='camera' color={"gray"} size={25} />
                                :
                                <Avatar
                                    size={60}
                                    rounded
                                    source={{ uri: image }}
                                />
                        }
                    </TouchableOpacity>
                    <TextInput
                        value={groupName}
                        onChangeText={setGroupName}
                        placeholder='Đặt tên nhóm'
                        style={{ fontSize: 16, width: 200 }}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => {
                        createGroupChat()
                    }}
                    style={{ width: 70, height: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: BLUE, marginLeft: 5 }}
                >
                    <Text style={{ color: "#ffffff", fontWeight: 'bold' }}>Xác nhận</Text>
                </TouchableOpacity>
            </View>
            <View style={{ width: "100%" }}>
                <View style={{ borderWidth: 1, borderRadius: 5, height: 35, borderColor: "#ecf0f1", justifyContent: "flex-start", alignItems: "center", flexDirection: "row", backgroundColor: "#ecf0f1" }}>
                    <Icon1 name="search" size={30} color={"gray"} style={{ marginLeft: 5 }} />
                    <TextInput
                        value={search}
                        onChangeText={setSearch}
                        placeholder='Tìm tên hoặc số điện thoại'
                        style={{ fontSize: 14, width: "90%", marginLeft: 5 }}
                    />
                </View>
            </View>
            {/* <Text style={{ alignSelf: 'flex-start', marginTop: 15, fontSize: 15, fontWeight: '500', marginBottom: 5 }}>Danh sách bạn bè:</Text> */}
            <View style={{ flex: 1, width: "100%", marginTop: 10 }}>
                {
                    friends ?
                        <TouchableOpacity style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                {
                                    friends?.avatarUrl ?
                                        <Avatar
                                            size={60}
                                            rounded
                                            source={{ uri: userRecieverIformation.avatarUrl }}
                                        />
                                        :
                                        <Avatar
                                            size={60}
                                            rounded
                                            icon={{ name: 'user', type: 'font-awesome' }}
                                            containerStyle={{
                                                backgroundColor: "#cccccc"
                                            }}
                                        />
                                }
                                <Text style={{ fontSize: 16, marginLeft: 15, fontWeight: '600' }}>{friends?.name}</Text>
                            </View>
                            <CheckBox checked={checks.includes(friends?._id)} size={18} onPress={() => { enterCheck(friends?._id) }} />
                        </TouchableOpacity>
                        : <></>
                }
            </View>
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
        paddingHorizontal: 15
    },
});

export default CreateNewGroupScreen