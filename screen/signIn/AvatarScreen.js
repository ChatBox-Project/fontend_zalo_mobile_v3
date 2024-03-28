import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, CheckBox, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import * as ImagePicker from 'expo-image-picker';
import { BLUE, GRAY } from '../colors/Colors';
import { updateAccountInformation } from '../../api/SignInAPI';

function AvatarScreen({ navigation, route }) {

    const account1 = route.params.account

    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });

        // console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    function updateAccountInformationNew() {
        if (image) {
            const profile1 = account1.profile

            const updateAccount = {
                ...account1,
                profile: {
                    ...profile1,
                    image: image
                }

            }

            updateAccountInformation(updateAccount)
                .then(req => {
                    if (req.ok) {
                        alert("Cập nhật thông tin thành công")
                        navigation.push("LoginAndSignIn")
                    } else {
                        alert("Cập nhật thông tin thất bại, vui lòng thử lại sau")
                    }
                })
        } else {
            alert("Vui lòng chọn ảnh đại diện để tiếp tục")
        }
    }

    return (
        <View style={styles.container}>

            <View style={{ width: "100%", padding: 12, backgroundColor: GRAY }}>
                <Text>Cập nhật ảnh đẹp nhất của bạn</Text>
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
                    <Image source={{ uri: image }}
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
                    onPress={() => { updateAccountInformationNew() }}
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