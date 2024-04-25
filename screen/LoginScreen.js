import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { BLUE, GRAY } from './colors/Colors';
import { regexPassword, regexPhoneNumber } from '../regex/MyRegex';
import { Login } from '../api/auth';
import { showMessage } from 'react-native-flash-message';
import {saveEmail, saveToken, saveUser} from '../store/Store';

function LoginScreen({ navigation }) {

    const [phoneNumber, setPhoneNumber] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [errorPhoneNumber, setErrorPhoneNumber] = React.useState("")
    const [errorPassword, setErrorPassword] = React.useState("")
    const [loading, setLoading] = React.useState(false)

    function validateInput() {

        let checkPass = true

        if (!phoneNumber) {
            checkPass = false;
            setErrorPhoneNumber("VUI LÒNG NHẬP TRƯỜNG NÀY")
        } else if (!phoneNumber.match(regexPhoneNumber)) {
            checkPass = false;
            setErrorPhoneNumber("SỐ ĐIỆN THOẠI KHÔNG HỢP LỆ")
        }

        if (!password) {
            checkPass = false;
            setErrorPassword("VUI LÒNG NHẬP TRƯỜNG NÀY")
        } else if (!regexPassword.test(password)) {
            checkPass = false;
            setErrorPassword("TỐI THIỂU 8 KÍ TỰ, GỒM CHỮ CÁI VÀ SỐ")
        }

        return checkPass
    }

    // chuyển hướng đến màn hình nhập mã OTP khi đăng ký chưa xác thực
    function checkRegisterOTP(data) {
        navigation.push("NotifyRegisterOTPScreen", { data })
    }

    async function checkAccount() {
        setLoading(true)
        try {
            const response = await Login(phoneNumber, password);
            const user  = response.data.user
            await saveUser(user)
            await saveToken(response.data?.accessToken)
            await saveEmail(response.data.user?.email)
            showMessage({
                message: "Thông Báo !",
                description: "Đăng nhập thành công",
                type: "success",
            });
            setLoading(false)
            navigation.push("Index")
            ressetInput()
        } catch (error) {
            console.error(error)
            showMessage({
                message: "Thông Báo !",
                description: "Đăng nhập thất bại, vui lòng kiểm tra lại thông tin đăng nhập",
                type: "danger",
            });
            setLoading(false)
        }
    }

    function ressetInput() {
        setPhoneNumber("")
        setPassword("")
    }

    return (
        <View style={styles.container}>
            <View style={{ width: "100%", padding: 12, backgroundColor: GRAY }}>
                <Text>Vui lòng nhập số điện thoại và mật khẩu để đăng nhập</Text>
            </View>
            <View style={{ width: 370, marginTop: 15 }}>
                <Input
                    placeholder='Số điện thoại'
                    inputStyle={{ fontSize: 16 }}
                    onChangeText={setPhoneNumber}
                    onChange={() => {
                        if (errorPhoneNumber) {
                            setErrorPhoneNumber("")
                        }
                    }}
                    value={phoneNumber}
                    errorMessage={errorPhoneNumber}
                />
                <Input
                    placeholder="Mật khẩu"
                    secureTextEntry={true}
                    inputStyle={{ fontSize: 16, marginTop: -5 }}
                    onChangeText={setPassword}
                    onChange={() => {
                        if (errorPassword) {
                            setErrorPassword("")
                        }
                    }}
                    value={password}
                    errorMessage={errorPassword}
                />
                <TouchableOpacity
                    onPress={() => { navigation.push("ForgotPasswordScreen") }}
                    style={{ marginTop: 10 }}
                >
                    <Text style={{ marginLeft: 10, color: BLUE, fontWeight: '500', marginTop: -10 }}>Quên mật khẩu</Text>
                </TouchableOpacity>
            </View>
            <Button
                loading={loading}
                title={'Đăng nhập'}
                containerStyle={{
                    width: 360,
                }}
                buttonStyle={{
                    height: 40,
                    marginTop: 20,
                    backgroundColor: BLUE
                }}
                onPress={() => {
                    if (validateInput()) {
                        checkAccount()
                    }
                    // navigation.push("Index")
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

export default LoginScreen