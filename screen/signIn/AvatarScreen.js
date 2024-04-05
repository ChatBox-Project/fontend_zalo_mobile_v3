import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, CheckBox, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import * as ImagePicker from 'expo-image-picker';
import { BLUE, GRAY } from '../colors/Colors';
import { CreateProfile } from '../../api/SignInAPI';
import { showMessage } from 'react-native-flash-message';
import { getTokenRegister, saveTokenAccess } from '../../store/MyStore';
import { BUCKET } from '../../config/Config';
import { ETBA } from '../../aws/MyAWS'
import { base64ToArrayBuffer, convertBase64ToBuffer } from '../../util/function/MyFunction';

function AvatarScreen({ navigation, route }) {

    const user = route.params.user
    const [image, setImage] = useState(null);

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

    function updateAccountInformationNew() {
        if (image) {

            convertBase64ToBuffer(image.uri).then(buffer => {

                const params = {
                    Bucket: BUCKET,
                    Key: `image${Date.now().toString()}.jpg`,
                    Body: buffer,
                    ContentType: image.mimeType
                }

                ETBA.upload(params, async (err, data) => {
                    if (err) {
                        showMessage({
                            message: "Thông Báo !",
                            description: err,
                            type: "danger",
                        });
                    } else {

                        const newUser = {
                            ...user,
                            avatarUrl: data.Location,
                            lastName: "Thiên Phú"
                        }

                        getTokenRegister()
                            .then(token => {
                                CreateProfile(token, newUser)
                                    .then(req => {
                                        showMessage({
                                            message: "Thông Báo !",
                                            description: "Cập nhật thông tin thành công",
                                            type: "success",
                                        });
                                        saveTokenAccess(token)
                                            .then(req => {
                                                navigation.push("Index")
                                            })
                                    })
                            })
                    }
                })
            })
        }
    }

    return (
        <View style={styles.container}>

            <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between', padding: 12, backgroundColor: GRAY }}>

                <Text>Cập nhật ảnh đẹp nhất của bạn</Text>

                <TouchableOpacity
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
                    <Image source={{ uri: image.uri }}
                        style={{
                            width: 120,
                            height: 120,
                            borderRadius: 60,
                            marginBottom: 20,
                            marginTop: 60,
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
                        updateAccountInformationNew()
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