import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Input, Button } from "react-native-elements"
import { GRAY } from '../colors/Colors';
import { regexPassword } from '../../regex/MyRegex';
import { ChangePassword, Login } from '../../api/SignInAPI';
import { showMessage } from 'react-native-flash-message';
import { removeKey } from '../../store/MyStore';

function ChangePasswordScreenAfterLogin({ navigation, route }) {

    const phoneNumber = route.params.phoneNumber
    const [passwordNow, setPasswordNow] = React.useState("")
    const [passwordNew, setPasswordNew] = React.useState("")
    const [passwordNewAgaint, setPasswordNewAgaint] = React.useState("")
    const [errorMessagePasswordNow, setErrorMessagePasswordNow] = React.useState("")
    const [errorMessagePasswordNew, setErrorMessagePasswordNew] = React.useState("")
    const [errorMessagePasswordNewAgaint, setErrorMessagePasswordNewAgaint] = React.useState("")
    const [loading, setLoading] = React.useState(false)

    const validateInput = () => {

        let check = true

        if (!passwordNow) {
            setErrorMessagePasswordNow("VUI LÒNG NHẬP TRƯỜNG NÀY")
            check = false
        } else {
            if (!passwordNow.match(regexPassword)) {
                setErrorMessagePasswordNow("TỐI THIỂU 8 KÍ TỰ, GỒM CHỮ CÁI VÀ SỐ")
                check = false
            }
        }

        if (!passwordNew) {
            setErrorMessagePasswordNew("VUI LÒNG NHẬP TRƯỜNG NÀY")
            check = false
        } else {
            if (!passwordNew.match(regexPassword)) {
                setErrorMessagePasswordNew("TỐI THIỂU 8 KÍ TỰ, GỒM CHỮ CÁI VÀ SỐ")
                check = false
            }
        }

        if (!passwordNewAgaint) {
            setErrorMessagePasswordNewAgaint("VUI LÒNG NHẬP TRƯỜNG NÀY")
            check = false
        } else {
            if (!passwordNewAgaint.match(regexPassword)) {
                setErrorMessagePasswordNewAgaint("TỐI THIỂU 8 KÍ TỰ, GỒM CHỮ CÁI VÀ SỐ")
                check = false
            }
        }

        if (passwordNewAgaint !== passwordNew) {
            setErrorMessagePasswordNewAgaint("MẬT KHẨU KHÔNG TRÙNG")
            check = false
        }

        return check
    }

    const ressetInput = () => {
        setPasswordNow("")
        setPasswordNew("")
        setPasswordNewAgaint("")
    }


    const updatePassword = () => {
        setLoading(true)
        if (validateInput()) {
            Login({ phoneNumber, password: passwordNow })
                .then(req => {
                    const token = req.data.metadata.token
                    ChangePassword(token, passwordNew)
                        .then(req => {
                            removeKey("tokenAccess")
                                .then(req => {
                                    showMessage({
                                        message: "Thông Báo !",
                                        description: "Đổi mật khẩu thành công, vui lòng đăng nhập lại",
                                        type: "success"
                                    })
                                    ressetInput()
                                    setLoading(false)
                                    navigation.push("LoginAndSignIn")
                                }).catch(err => {
                                    console.error(err)
                                })
                        }).catch(err => {
                            console.log(err)
                            ressetInput()
                            setLoading(false)
                        })
                }).catch(err => {
                    console.log(err)
                    showMessage({
                        message: "Thông Báo !",
                        description: "CẬP NHẬT THẤT BẠI",
                        type: "danger"
                    })
                    ressetInput()
                    setLoading(false)
                })
        } else {
            setLoading(false)
        }
    }


    return (
        <View style={styles.container} >
            <View style={{ width: "100%", padding: 12, backgroundColor: GRAY }}>
                <Text>Đổi mật khẩu mới</Text>
            </View>
            <View
                style={{
                    width: "100%",
                    paddingHorizontal: 15,
                    marginTop: 5
                }}
            >
                <Text style={{ fontSize: 16, fontWeight: '600' }}>Mật khẩu hiện tại:</Text>
                <Input
                    placeholder='Nhập mật khẩu hiện tại'
                    value={passwordNow}
                    onChangeText={setPasswordNow}
                    onChange={() => { setErrorMessagePasswordNow("") }}
                    errorMessage={errorMessagePasswordNow}
                    secureTextEntry={true}
                    style={{ fontSize: 16 }}
                />
            </View>
            <View
                style={{
                    width: "100%",
                    paddingHorizontal: 15
                }}
            >
                <Text style={{ fontSize: 16, fontWeight: '600' }}>Mật khẩu mới:</Text>
                <Input
                    placeholder='Nhập mật khẩu mới'
                    value={passwordNew}
                    onChangeText={setPasswordNew}
                    onChange={() => { setErrorMessagePasswordNew("") }}
                    errorMessage={errorMessagePasswordNew}
                    secureTextEntry={true}
                    style={{ fontSize: 16 }}
                />
                <Input
                    placeholder='Nhập lại mật khẩu mới'
                    value={passwordNewAgaint}
                    onChangeText={setPasswordNewAgaint}
                    onChange={() => { setErrorMessagePasswordNewAgaint("") }}
                    errorMessage={errorMessagePasswordNewAgaint}
                    secureTextEntry={true}
                    style={{ fontSize: 16 }}
                />
            </View>
            <Button
                onPress={() => { updatePassword() }}
                loading={loading}
                title="Cập Nhật"
                titleStyle={{ fontWeight: '700' }}
                buttonStyle={{
                    backgroundColor: 'rgba(90, 154, 230, 1)',
                    borderColor: 'transparent',
                    borderWidth: 0,
                    borderRadius: 30,
                }}
                containerStyle={{
                    width: 200,
                    marginHorizontal: 50,
                    marginVertical: 10,
                }}
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

export default ChangePasswordScreenAfterLogin