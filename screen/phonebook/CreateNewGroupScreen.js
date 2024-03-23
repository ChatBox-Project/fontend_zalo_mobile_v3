import React, { useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/EvilIcons';
import { Button, CheckBox } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { BLUE } from '../colors/Colors';
import AvatarChat from '../../util/friend/compoments/AvatarChat';

function CreateNewGroupScreen({ navigation }) {

    const [checks, setChecks] = React.useState([])

    const [search, setSearch] = React.useState("");

    const [image, setImage] = React.useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        // console.log(result);

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

    const [friends, setFriends] = React.useState([
        {
            id: 1,
            name: "Ngô Thiên Phú",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgT1WDu0FCu2ZWN2ZDc8-8Y7wjv_j7cP9_-3pXYiVhY3MuGIRshX8I-yN8Sw&s"
        },
        {
            id: 2,
            name: "Ngô Thiên Phú",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgT1WDu0FCu2ZWN2ZDc8-8Y7wjv_j7cP9_-3pXYiVhY3MuGIRshX8I-yN8Sw&s"
        }
    ])

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
                                <Image source={{ uri: image }}
                                    style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: 25,
                                    }}
                                />
                        }
                    </TouchableOpacity>
                    <TextInput placeholder='Đặt tên nhóm' style={{ fontSize: 16, width: 200 }} />
                </View>
                <TouchableOpacity style={{ width: 70, height: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: BLUE, marginLeft: 5 }}>
                    <Text style={{ color: "#ffffff", fontWeight: 'bold' }}>Xác nhận</Text>
                </TouchableOpacity>
            </View>
            <View style={{ width: "100%" }}>
                <View style={{ borderWidth: 1, borderRadius: 5, height: 35, borderColor: "#ecf0f1", justifyContent: "flex-start", alignItems: "center", flexDirection: "row", backgroundColor: "#ecf0f1" }}>
                    <Icon1 name="search" size={30} color={"gray"} style={{ marginLeft: 5 }} />
                    <TextInput value={search} onChangeText={setSearch} placeholder='Tìm tên hoặc số điện thoại' style={{ fontSize: 14, width: "90%", marginLeft: 5 }} />
                </View>
            </View>
            {/* <Text style={{ alignSelf: 'flex-start', marginTop: 15, fontSize: 15, fontWeight: '500', marginBottom: 5 }}>Danh sách bạn bè:</Text> */}
            <View style={{ flex: 1, width: "100%", marginTop: 10 }}>
                <FlatList
                    data={friends}
                    renderItem={(data) => {
                        return (
                            <TouchableOpacity style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <AvatarChat image={data.item.image} />
                                    <Text style={{ fontSize: 15, marginLeft: 15 }}>{data.item.name}</Text>
                                </View>
                                <CheckBox checked={checks.includes(data.item.id)} size={18} onPress={() => { enterCheck(data.item.id) }} />
                            </TouchableOpacity>
                        )
                    }}
                />
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