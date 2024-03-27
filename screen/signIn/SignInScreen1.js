import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Button, CheckBox, Dialog, Input } from 'react-native-elements';
import { BLUE, GRAY } from '../colors/Colors';

function SignInScreen1({ navigation }) {

    const [phoneNumber, setPhoneNumber] = useState("")
    const [password, setPassword] = useState("")
    const [againPassword, setAgainPassword] = useState("")
    const [errorPhoneNumber, setErrorPhoneNumber] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorPasswordAgain, setErrorPasswordAgain] = useState("")

    const [checkBox1, setCheckBox1] = useState(false)
    const [checkBox2, setCheckBox2] = useState(false)
    const [visible1, setVisible1] = useState(false);

    const validate = () => {

        let checkPass = true;
        const regexPhoneNumber = /^0[1-9][0-9]{8}$/
        const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

        if (!phoneNumber) {
            checkPass = false;
            setErrorPhoneNumber("VUI LÒNG NHẬP TRƯỜNG NÀY")
        } else if (!regexPhoneNumber.test(phoneNumber)) {
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

        if (!againPassword) {
            checkPass = false;
            setErrorPasswordAgain("VUI LÒNG NHẬP TRƯỜNG NÀY")
        } else if (!regexPassword.test(againPassword)) {
            checkPass = false;
            setErrorPasswordAgain("TỐI THIỂU 8 KÍ TỰ, GỒM CHỮ CÁI VÀ SỐ")
        }

        if (checkPass) {

            if (password !== againPassword) {
                checkPass = false
                setErrorPasswordAgain("MẬT KHẨU KHÔNG TRÙNG")
            } else if (!checkBox1 || !checkBox2) {
                checkPass = false
                toggleDialog1()
            }

            if (checkPass) {
                let OTP = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
                console.log(OTP)
                navigation.push("OTPScreen", { OTP: OTP })
            }

        }
    }

    const toggleDialog1 = () => {
        setVisible1(!visible1);
    };

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
                    title={'Tiếp tục'}
                    containerStyle={{
                        width: 100,
                        marginHorizontal: 20,
                        marginVertical: 10,
                    }}
                    buttonStyle={{
                        backgroundColor: BLUE
                    }}
                    onPress={() => { validate(), ressetTextInput() }}
                />
            </View>
            <Dialog
                isVisible={visible1}
                onBackdropPress={toggleDialog1}
            >
                <Dialog.Title title="Xác Nhận" />
                <Text>Để tiếp tục, vui lòng xác nhận các điều khoản dịch vụ !</Text>
            </Dialog>
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