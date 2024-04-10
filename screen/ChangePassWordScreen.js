import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Input, Button } from "react-native-elements"
import { BLUE, GRAY } from './colors/Colors';
import { regexPassword } from '../regex/MyRegex';
import { ChangePasswordForgot } from '../api/SignInAPI';
import { showMessage } from 'react-native-flash-message';

function ChangePassWordScreen({ navigation, route }) {

    const phoneNumber = route.params.phoneNumber
    const [password, setPassword] = React.useState("")
    const [againtPassword, setAgaintPassword] = React.useState("")
    const [errorPassword, setErrorPassword] = React.useState("")
    const [errorAgaintPassword, setErrorAgaintPassword] = React.useState("")
    const [loading, setLoading] = React.useState(false)

    const validatePassword = () => {

        let check = true;

        if (!password) {
            setErrorPassword("VUI LÒNG NHẬP TRƯỜNG NÀY")
            check = false
        } else {
            if (!password.match(regexPassword)) {
                setErrorPassword("TỐI THIỂU 8 KÍ TỰ GỒM CHỮ CÁI VÀ SỐ")
                check = false
            }
        }

        if (!againtPassword) {
            setErrorAgaintPassword("VUI LÒNG NHẬP TRƯỜNG NÀY")
            check = false
        } else {
            if (!againtPassword.match(regexPassword)) {
                setErrorAgaintPassword("TỐI THIỂU 8 KÍ TỰ GỒM CHỮ CÁI VÀ SỐ")
                check = false
            }
        }

        return check
    }

    const ressetInput = () => {
        setPassword("")
        setAgaintPassword("")
    }

    const changePassword = async () => {
        setLoading(true)
        if (validatePassword()) {
            try {
                await ChangePasswordForgot(phoneNumber, password)
                showMessage({
                    message: "Thông Báo !",
                    description: "Đổi mật khẩu thành công",
                    type: "success"
                })
                setLoading(false)
                navigation.push("LoginAndSignIn")
                ressetInput()
            } catch (error) {
                console.error(error)
                showMessage({
                    message: "Thông Báo !",
                    description: error.message,
                    type: "danger"
                })
                setLoading(false)
                ressetInput()
            }
        } else {
            setLoading(false)
            ressetInput()
        }
    }

    return (
        <View style={styles.container} >
            <View style={{ width: "100%", padding: 12, backgroundColor: GRAY }}>
                <Text>Thay đổi mật khẩu mới</Text>
            </View>
            <View
                style={{
                    marginTop: 15,
                    width: "100%",
                    paddingHorizontal: 15
                }}
            >
                <Input
                    placeholder='Mật khẩu mới'
                    errorMessage={errorPassword}
                    value={password}
                    onChangeText={setPassword}
                    style={{ fontSize: 16 }}
                    onChange={() => { setErrorPassword("") }}
                    secureTextEntry={true}
                />
                <Input
                    placeholder='Nhập lại mật khẩu mới'
                    errorMessage={errorAgaintPassword}
                    value={againtPassword}
                    onChangeText={setAgaintPassword}
                    style={{ fontSize: 16 }}
                    onChange={() => { setErrorAgaintPassword("") }}
                    secureTextEntry={true}
                />
                <Button
                    loading={loading}
                    onPress={() => { changePassword() }}
                    title={"Xác nhận"}
                    containerStyle={{
                        backgroundColor: BLUE
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

export default ChangePassWordScreen