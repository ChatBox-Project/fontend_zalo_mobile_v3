import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import * as ImagePicker from 'expo-image-picker';
import { BLUE, GRAY } from '../colors/Colors';
import { GetUserInformation, UpdateAllProfile } from '../../api/SignInAPI';
import { showMessage } from 'react-native-flash-message';
import { getTokenRegister, saveTokenAccess, saveUserInformation } from '../../store/MyStore';
import { BUCKET } from '../../config/Config';
import { ETBA } from '../../aws/MyAWS'
import { convertBase64ToBuffer } from '../../util/function/MyFunction';
import { Avatar } from "react-native-elements";

function AvatarScreen({ navigation, route }) {

    const profile = route.params.profile
    // console.log(profile)
    const [image, setImage] = useState(null);
    const [loading, setLoading] = React.useState(false)
    const [pass, setPass] = React.useState(false)

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0]);
        }
    };


    const updateProfile = (data) => {
        if (data) {
            const newProfile = {
                ...profile,
                avatarUrl: data.Location,
            }

            return newProfile
        }

        const newProfile = {
            ...profile,
            avatarUrl: "",
        }

        return newProfile
    }

    const createParams = (buffer) => {
        const params = {
            Bucket: BUCKET,
            Key: `image${Date.now().toString()}.jpg`,
            Body: buffer,
            ContentType: image.mimeType
        }

        return params
    }

    const upateImageToS3 = async (params) => {
        return await ETBA.upload(params).promise()
    }

    const startUpdateProfile = (location) => {
        getTokenRegister()
            .then(token => {
                const newProfile = updateProfile(location)
                // console.log(newProfile)
                UpdateAllProfile(token, newProfile)
                    .then(req => {
                        GetUserInformation(token)
                            .then(req => {
                                // console.log(req)
                                const user = req?.data?.metadata?.user
                                saveUserInformation(user)
                                saveTokenAccess(token)
                                setLoading(false)
                                showMessage({
                                    message: "Thông Báo !",
                                    description: "Cập nhật thông tin thành công",
                                    type: "success",
                                });
                                navigation.push("Index")
                            }).catch(err => {
                                showMessage({
                                    message: "Thông Báo !",
                                    description: err.response.data.message,
                                    type: "danger",
                                });
                                setLoading(false)
                            })
                    }
                    ).catch(err => {
                        showMessage({
                            message: "Thông Báo !",
                            description: err.response.data.message,
                            type: "danger",
                        });
                        setLoading(false)
                    })
            })
    }

    function updateAccountInformationNew(pass) {
        if (image && pass === false) {
            setLoading(true)
            convertBase64ToBuffer(image.uri).then(buffer => {
                const params = createParams(buffer)
                upateImageToS3(params)
                    .then(data => {
                        startUpdateProfile(data)
                    })
            })
        } else {
            startUpdateProfile("")
        }
    }

    return (
        <View style={styles.container}>

            <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between', padding: 12, backgroundColor: GRAY }}>

                <Text>Cập nhật ảnh đẹp nhất của bạn</Text>

                <TouchableOpacity
                    onPress={() => {
                        updateAccountInformationNew(true)
                    }}
                    style={{ alignSelf: 'center' }}
                >
                    <Text style={{ fontWeight: '600', color: BLUE }}>Bỏ qua</Text>
                </TouchableOpacity>

            </View>
            {
                image === null
                    ?
                    (
                        <View style={{
                            // borderWidth: 1,
                            marginTop: 60,
                            width: 120,
                            height: 120,
                            borderRadius: 60,
                            marginBottom: 20,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderColor: "gray",
                            backgroundColor: GRAY,
                            position: 'relative',
                        }}>
                            <Icon name='user' size={70} color={"white"} />
                            <TouchableOpacity
                                onPress={pickImage}
                                style={{
                                    backgroundColor: BLUE,
                                    position: 'absolute',
                                    borderRadius: 10,
                                    padding: 5,
                                    bottom: 0,
                                    right: 10
                                }}>
                                <Icon1 name='pen' size={10} color={"white"} />
                            </TouchableOpacity>
                        </View>
                    )
                    :
                    <Avatar
                        size={130}
                        rounded
                        source={{ uri: image.uri }}
                        containerStyle={{
                            marginTop: 60,
                            marginBottom: 15
                        }}
                    />
            }

            <Text>Bạn có thể chỉnh sửa ảnh với nhiều tùy chọn</Text>
            <Text>và bộ lọc màu thú vị</Text>

            <TouchableOpacity style={{ marginTop: 20, marginBottom: 30 }} onPress={pickImage}>
                <Text style={{ fontSize: 20, color: BLUE, fontWeight: '500' }}>Chọn ảnh</Text>
            </TouchableOpacity>

            <View style={{ alignSelf: 'flex-end' }}>
                <Button
                    loading={loading}
                    title={'Tiếp tục'}
                    containerStyle={{
                        width: 100,
                        marginHorizontal: 20,
                        marginVertical: 10,
                    }}
                    buttonStyle={{
                        backgroundColor: BLUE
                    }}
                    onPress={() => {
                        updateAccountInformationNew(false)
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
    },
});

export default AvatarScreen