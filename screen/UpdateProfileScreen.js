import React, {useEffect, useState} from "react";
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {BLUE, GRAY} from "../config/Colors";
import {Avatar, Button, CheckBox} from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import {getToken, getUser} from "../store/Store";
import * as ImagePicker from 'expo-image-picker';
import {FindUser, UpdateProfile} from "../api";
import {showMessage} from "react-native-flash-message";
import {upateImageToS3} from "../config/AWS";

function UpdateProfileScreen({navigation}) {

    const [name, setName] = React.useState("");
    const [gender, setGender] = useState(false)
    const [address, setAddress] = React.useState("")
    const [coverPicture, setCoverPicture] = React.useState("")
    const [profilePicture, setProfilePicture] = React.useState("")
    const [coverPictureAfter, setCoverPictureAfter] = React.useState("")
    const [profilePictureAfter, setProfilePictureAfter] = React.useState("")

    const [loading, setLoading] = React.useState(false);
    const [profilePictureChange, setProfilePictureChange] = React.useState(false);
    const [coverPictureChange, setCoverPictureChange] = React.useState(false);

    useEffect(() => {
        async function loadData() {

            const tokenAccess = await getToken()
            const user = await getUser()
            const phoneNumber = user.phoneNumber
            const userInfo = await FindUser(phoneNumber, tokenAccess);

            setName(userInfo.data.username);
            setGender(userInfo.data.gender);
            setAddress(userInfo.data.address);
            setCoverPicture(userInfo.data.coverPicture);
            setProfilePicture(userInfo.data.profilePicture)
            setCoverPictureAfter(userInfo.data.coverPicture);
            setProfilePictureAfter(userInfo.data.profilePicture)
        }

        loadData()
    }, [])

    // kiem tra xem co thay doi anh profile hay khong
    useEffect(() => {
        if(profilePicture !== profilePictureAfter){
            setProfilePictureChange(true)
        }else{
            setProfilePictureChange(false)
        }
    }, [profilePicture, profilePictureAfter])

    // kiem tra xem co thay doi anh cover hay khong
    useEffect(() => {
        if(coverPicture !== coverPictureAfter){
            setCoverPictureChange(true)
        }else{
            setCoverPictureChange(false)
        }
    }, [coverPicture, coverPictureAfter])

    const pickImageProfile = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setProfilePictureAfter(result.assets[0].uri);
        }
    };

    const pickCoverPicture = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setCoverPictureAfter(result.assets[0].uri);
        }
    };

    const updateProfile = async () => {
        try {
            setLoading(true)

            let newProfilePicture = profilePictureAfter;
            let newCoverPicture = coverPictureAfter;

            if (profilePictureChange) {
                const location = await upateImageToS3(profilePictureAfter)
                newProfilePicture = location.Location;
            }
            if (coverPictureChange) {
                const location = await upateImageToS3(coverPictureAfter)
                newCoverPicture = location.Location;
            }

            const token = await getToken();
            const user = await getUser();
            const data = {
                newUsername: name,
                newProfilePicture: newProfilePicture,
                newGender: gender,
                newAddress: address,
                newCoverPhoto: newCoverPicture
            }

            const response = await UpdateProfile(user._id, data, token);
            setLoading(false)
            navigation.push("Index")
            showMessage({
                message: "Thông báo",
                description: "Cập nhật thành công",
                type: "success",
            })
        } catch (error) {
            setLoading(false)
            showMessage({
                message: "Thông báo",
                description: "Cập nhật thất bại",
                type: "danger",
            })
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>

            <View style={{width: "100%", padding: 10, backgroundColor: GRAY}}>
                <Text>Thông tin cá nhân</Text>
            </View>

            <View style={{
                width: "100%",
                paddingHorizontal: 15,
                paddingVertical: 10,
                flexDirection: "row",
                alignItems: "center"
            }}>
                {
                    profilePictureAfter === "" ?
                        <Avatar
                            rounded
                            icon={{name: 'user', type: 'font-awesome'}}
                            activeOpacity={0.7}
                            size={"medium"}
                            backgroundColor={"#cccccc"}

                        >
                            <Avatar.Accessory size={15} onPress={() => {
                                pickImageProfile()
                            }}/>
                        </Avatar>
                        :
                        <Avatar
                            source={{uri: profilePictureAfter}}
                            rounded={true}
                            size={"medium"}
                        >
                            <Avatar.Accessory size={15} onPress={() => {
                                pickImageProfile()
                            }}/>
                        </Avatar>
                }
                <TextInput
                    style={{
                        borderWidth: 1,
                        borderColor: BLUE,
                        borderRadius: 5,
                        width: "80%",
                        marginLeft: 10,
                        padding: 5
                    }}
                    value={name}
                    onChangeText={setName}
                />
            </View>

            <View style={{
                width: "100%",
                padding: 10,
                borderBottomWidth: 10,
                borderBottomColor: "rgba(244, 244, 244, 1)"
            }}>
                <Text style={{fontWeight: '600', fontSize: 16}}>Giới tính</Text>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    marginTop: 15
                }}>
                    <View
                        style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <CheckBox title={"Nam"} checked={gender ? true : false} size={18} onPress={() => {
                                setGender(true)
                            }}/>
                            <Icon name='male' color={BLUE} size={25} onPress={() => {
                                setGender(true)
                            }}/>
                        </View>
                    </View>
                    <View
                        style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <CheckBox title={"Nữ"} checked={!gender ? true : false} size={18} onPress={() => {
                                setGender(false)
                            }}/>
                            <Icon name='female' color={"pink"} size={25} onPress={() => {
                                setGender(false)
                            }}/>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{
                width: "100%",
                padding: 10,
                borderBottomWidth: 10,
                borderBottomColor: "rgba(244, 244, 244, 1)"
            }}>
                <Text style={{fontWeight: '600', fontSize: 16}}>Địa chỉ</Text>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    marginTop: 15
                }}>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderColor: BLUE,
                            borderRadius: 5,
                            width: "95%",
                            marginLeft: 10,
                            padding: 5
                        }}
                        value={address}
                        onChangeText={setAddress}
                    />
                </View>
            </View>

            <View style={{
                width: "100%",
                padding: 10,
                borderBottomWidth: 10,
                borderBottomColor: "rgba(244, 244, 244, 1)"
            }}>
                <Text style={{fontWeight: '600', fontSize: 16}}>Ảnh bìa</Text>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    marginTop: 15
                }}>
                    {
                        coverPictureAfter === "" ?
                            <Text style={{color: "gray"}}>Chưa có ảnh bìa</Text>
                            :
                            <Image
                                source={{uri: coverPictureAfter}}
                                style={{width: 250, height: 250}}
                            />
                    }
                    <TouchableOpacity
                        onPress={() => {
                            pickCoverPicture()
                        }}
                    >
                        <Icon name="camera" size={30} color={BLUE}/>
                    </TouchableOpacity>
                </View>
            </View>
            <Button
                loading={loading}
                onPress={() => {
                    updateProfile()
                }}
                title="Cập nhật"
                buttonStyle={{backgroundColor: BLUE, width: 200, margin: 15}}
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

export default UpdateProfileScreen;