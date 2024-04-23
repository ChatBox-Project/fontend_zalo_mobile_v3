import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Input, Button } from 'react-native-elements'
import { BLUE, GRAY } from './colors/Colors';
import { showMessage } from 'react-native-flash-message';
import { regexEmail } from '../regex/MyRegex';
import { SendSms } from '../api';

function ForgotPassWordScreen({ navigation }) {

    const [email, setEmail] = React.useState("")
    const [errorMessage, setErrorMessage] = React.useState("")
    const [loading, setLoading] = React.useState(false)

    function checkValidateEmail() {

        let check = true

        if (!email) {
            setErrorMessage("VUI LÒNG NHẬP TRƯỜNG NÀY")
            check = false
        } else {
            if (!email.match(regexEmail)) {
                setErrorMessage("EMAIL KHÔNG HỢP LỆ")
                check = false
            }
        }

        return check
    }

    async function verifyOTP() {
        setLoading(true)
        if (checkValidateEmail()) {
            try {
                await SendSms(email)
                navigation.push("OTPScreen", { email, type: 2 })
                setLoading(false)
            } catch (error) {
                console.log(error)
                // showMessage({
                //     message: "Thông Báo !",
                //     description: error.response.data.message,
                //     type: 'danger'
                // })
                setLoading(false)
            }
        } else {
            setLoading(false)
        }
    }

    return (
        <View style={styles.container} >
            <View style={{ width: "100%", padding: 12, backgroundColor: GRAY }}>
                <Text>Xác thực số điện thoại để lấy lại mật khẩu</Text>
            </View>
            <View
                style={{
                    width: "100%",
                    paddingHorizontal: 15,
                    marginTop: 15
                }}
            >
                <Input
                    placeholder='Email'
                    onChangeText={setEmail}
                    value={email}
                    errorMessage={errorMessage}
                    style={{
                        fontSize: 16,
                    }}
                    onChange={() => { setErrorMessage("") }}
                />
                <Button
                    loading={loading}
                    title={"Xác thực"}
                    onPress={() => { verifyOTP() }}
                    buttonStyle={{
                        alignSelf: 'flex-end',
                        backgroundColor: BLUE
                    }}
                />
            </View>
            <Avatar
                size={150}
                source={require("../images/forgot-password.png")}
                containerStyle={{
                    marginTop: 15
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

export default ForgotPassWordScreen