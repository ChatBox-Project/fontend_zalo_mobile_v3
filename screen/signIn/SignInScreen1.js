import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Button, CheckBox, Input } from 'react-native-elements';
import { BLUE, GRAY } from '../../config/Colors';
import { showMessage } from "react-native-flash-message";
import { regexEmail, regexPassword, regexPhoneNumber } from '../../config/Regex';
import { Register, SendSms } from '../../api';
import { saveToken } from '../../store/Store';

function SignInScreen1({ navigation }) {

    const [userName, setUserName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [againPassword, setAgainPassword] = useState("")

    const [errorUserName, setErrorUserName] = useState("")
    const [errorPhoneNumber, setErrorPhoneNumber] = useState("")
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorPasswordAgain, setErrorPasswordAgain] = useState("")
    const [loading, setLoading] = useState(false)

    const [checkBox1, setCheckBox1] = useState(false)
    const [checkBox2, setCheckBox2] = useState(false)

    const validate = () => {

        let checkPass = true

        // neu user name rong
        if (!userName) {
            checkPass = false
            setErrorUserName("VUI LÒNG NHẬP TRƯỜNG NÀY")
        }

        // neu phone number rong
        if (!phoneNumber) {
            checkPass = false
            setErrorPhoneNumber("VUI LÒNG NHẬP TRƯỜNG NÀY")
            // neu phone number khong hop le
        } else if (!regexPhoneNumber.test(phoneNumber)) {
            checkPass = false
            setErrorPhoneNumber("SỐ ĐIỆN THOẠI KHÔNG HỢP LỆ")
        }

        // neu email rong
        if (!email) {
            checkPass = false
            setErrorEmail("VUI LÒNG NHẬP TRƯỜNG NÀY")
            // neu email khong hop le
        } else if (!regexEmail.test(email)) {
            checkPass = false
            setErrorEmail("EMAIL KHÔNG HỢP LỆ")
        }

        // neu password rong
        if (!password) {
            checkPass = false;
            setErrorPassword("VUI LÒNG NHẬP TRƯỜNG NÀY")
            // neu password khong hop le
        } else if (!regexPassword.test(password)) {
            checkPass = false;
            setErrorPassword("TỐI THIỂU 8 KÍ TỰ, GỒM CHỮ CÁI VÀ SỐ")
        }

        // neu again password rong
        if (!againPassword) {
            checkPass = false;
            setErrorPasswordAgain("VUI LÒNG NHẬP TRƯỜNG NÀY")
            // neu again password khong hop le
        } else if (!regexPassword.test(againPassword)) {
            checkPass = false;
            setErrorPasswordAgain("TỐI THIỂU 8 KÍ TỰ, GỒM CHỮ CÁI VÀ SỐ")
        }


        if (checkPass) {
            // neu password khong trung nhau
            if (password !== againPassword) {
                checkPass = false
                setErrorPasswordAgain("MẬT KHẨU KHÔNG TRÙNG")
                // neu chua dong y voi dieu khoan
            } else if (!checkBox1 || !checkBox2) {
                checkPass = false
                showMessage({
                    message: "Thông Báo !",
                    description: "Vui lòng xác nhận điều khoản dịch vụ",
                    type: "warning",
                });
            }

            if (checkPass) {
                // dang ky tai khoan
                registerAccount()
            }

        }
    }

    // dang ky tai khoan
    async function registerAccount() {
        try {
            setLoading(true)
            const response = await Register(userName, email, phoneNumber, password)
            const tokenHeader = response.headers["set-cookie"][0]
            await saveToken(tokenHeader)
            const message = await SendSms(email)
            navigation.push("OTPScreen", { email: email, type: 1 })
            setLoading(false)
            showMessage({
                message: "Thông Báo !",
                description: "Đăng ký tài khoản thành công",
                type: "success",
            });
            ressetTextInput()
        } catch (error) {
            console.log(error)
            showMessage({
                message: "Thông Báo !",
                description: "Đăng ký tài khoản thất bại",
                type: "danger",
            });
            ressetTextInput()
            setLoading(false)
        }
    }

    // reset lai input
    const ressetTextInput = () => {
        setPhoneNumber("")
        setPassword("")
        setAgainPassword("")
        setCheckBox1(false)
        setCheckBox2(false)
    }


    return (
        <View style={styles.container}>
            <View style={{ width: "100%", padding: 12, backgroundColor: GRAY }}>
                <Text>Nhập số điện thoại của bạn để tạo tài khoản mới</Text>
            </View>
            <View style={{ width: "95%", marginTop: 15 }}>
                <Input
                    placeholder="Tên đăng nhập"
                    inputStyle={{ fontSize: 16 }}
                    value={userName}
                    onChangeText={setUserName}
                    onChange={() => {
                        if (errorUserName) {
                            setErrorUserName("")
                        }
                    }}
                    errorStyle={{ color: 'red' }}
                    errorMessage={errorUserName}
                />
                <Input
                    placeholder='Nhập số điện thoại'
                    inputStyle={{ fontSize: 16 }}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    onChange={() => {
                        if (errorPhoneNumber) {
                            setErrorPhoneNumber("")
                        }
                    }}
                    errorStyle={{ color: 'red' }}
                    errorMessage={errorPhoneNumber}
                />
                <Input
                    placeholder='Email'
                    inputStyle={{ fontSize: 16 }}
                    value={email}
                    onChangeText={setEmail}
                    onChange={() => {
                        if (email) {
                            setErrorEmail("")
                        }
                    }}
                    errorStyle={{ color: 'red' }}
                    errorMessage={errorEmail}
                />
                <Input
                    placeholder='Mật khẩu'
                    inputStyle={{ fontSize: 16 }}
                    value={password}
                    onChangeText={setPassword}
                    onChange={() => {
                        if (errorPassword) {
                            setErrorPassword("")
                        }
                    }}
                    secureTextEntry={true}
                    errorStyle={{ color: 'red' }}
                    errorMessage={errorPassword}
                />
                <Input
                    placeholder='Nhập lại mật khẩu'
                    inputStyle={{ fontSize: 16 }}
                    value={againPassword}
                    onChangeText={setAgainPassword}
                    onChange={() => {
                        if (errorPasswordAgain) {
                            setErrorPasswordAgain("")
                        }
                    }}
                    secureTextEntry={true}
                    errorStyle={{ color: 'red' }}
                    errorMessage={errorPasswordAgain}
                />
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: -10 }}>
                    <CheckBox
                        checked={checkBox1}
                        onPress={() => { setCheckBox1(!checkBox1) }}
                        iconType="material-community"
                        checkedIcon="checkbox-outline"
                        uncheckedIcon={'checkbox-blank-outline'}
                    />
                    <Text>Tôi đồng ý với các <Text style={{ color: BLUE }}>Quy định đặt tên trên Zalo</Text></Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: -20 }}>
                    <CheckBox
                        checked={checkBox2}
                        onPress={() => { setCheckBox2(!checkBox2) }}
                        iconType="material-community"
                        checkedIcon="checkbox-outline"
                        uncheckedIcon={'checkbox-blank-outline'}
                    />
                    <Text>Tôi đồng ý với <Text style={{ color: BLUE }}>điều khoản Mạng xã hội của Zalo</Text></Text>
                </View>
            </View>
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
                    onPress={() => { validate() }}
                // onPress={() => { navigation.push("OTPScreen") }}
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

export default SignInScreen1