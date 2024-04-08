import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Input, Button } from 'react-native-elements'
import { regexPhoneNumber } from '../regex/MyRegex';
import { BLUE, GRAY } from './colors/Colors';
import { generateOTP } from '../api/SignInAPI';

function ForgotPassWordScreen({ navigation }) {

    const [phoneNumber, setPhoneNumber] = React.useState("")
    const [errorMessage, setErrorMessage] = React.useState("")
    const [loading, setLoading] = React.useState(false)

    function checkValidatePhoneNumber() {

        let check = true

        if (!phoneNumber) {
            setErrorMessage("VUI LÒNG NHẬP TRƯỜNG NÀY")
            check = false
        } else {
            if (!phoneNumber.match(regexPhoneNumber)) {
                setErrorMessage("SỐ ĐIỆN THOẠI KHÔNG HỢP LỆ")
                check = false
            }
        }

        return check
    }

    function verifyOTP() {
        setLoading(true)
        if (checkValidatePhoneNumber()) {
            generateOTP({ phoneNumber }).then(req => {
                // console.log(req)
                navigation.push("OTPScreen", { phoneNumber, type: 2 })
                setLoading(false)
            }).catch(err => {
                console.error(err)
                setLoading(false)
            })
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
                    placeholder='Số điện thoại'
                    onChangeText={setPhoneNumber}
                    value={phoneNumber}
                    errorMessage={errorMessage}
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