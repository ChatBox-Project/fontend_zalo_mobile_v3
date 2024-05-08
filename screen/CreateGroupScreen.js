import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/EvilIcons';
import { Avatar, CheckBox } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { BLUE } from '../config/Colors';
import {getToken, getUser} from "../store/Store";
import {FindUser} from "../api";
import {createGroup} from "../api/conversation";

function CreateNewGroupScreen({ navigation }) {

    const [checks, setChecks] = React.useState([])
    const [search, setSearch] = React.useState("")
    const [image, setImage] = React.useState(null)
    const [groupName, setGroupName] = React.useState("")
    const [users, setUsers] = React.useState(null)
    const [mainUser, setMainUser] = React.useState(null)

    React.useEffect(() => {
        const run = async () => {
            try {
                const user = await getUser();
                setMainUser(user)
                // console.log(user)
            } catch (error) {
                console.log(error)
            }
        }

        run()
    }, [])

    React.useEffect(() => {
        if (search) {
            const runSearch = async () => {
                try {
                    const tokenAccess = await  getToken();
                    const user = await FindUser(search, tokenAccess);
                    // console.log(user.data)
                    if(user.data.exist){
                        setUsers(user.data)
                    }else{
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


    // chon anh tu thu vien
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


    // kiem tra xem idFriend co trong mang checks hay khong
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

    async function createGroupChat() {
        const data = {
            label: groupName,
            member: checks,
            createdBy: mainUser._id,
            imageGroup: image
        }
        console.log(data)
        try {
            const tokenAccess = await getToken();
            const response = await createGroup(data, tokenAccess)
            // console.log(response)
            console.log("tao nhom thanh cong")
        }catch (e) {
            console.log(e)
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
                    <Text style={{ color: "#ffffff", fontWeight: 'bold' }}>Tạo nhóm</Text>
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
                    users ?
                        <TouchableOpacity style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                {
                                    users?.profilePicture ?
                                        <Avatar
                                            size={60}
                                            rounded
                                            source={{ uri: users.profilePicture }}
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
                                <Text style={{ fontSize: 16, marginLeft: 15, fontWeight: '600' }}>{users?.username}</Text>
                            </View>
                            <CheckBox checked={checks.includes(users?._id)} size={18} onPress={() => { enterCheck(users?._id) }} />
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