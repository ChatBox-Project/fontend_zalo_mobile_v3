import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Input, Button } from "react-native-elements"
import { GRAY } from '../../config/Colors';
import { regexPassword } from '../../config/Regex';
import { showMessage } from 'react-native-flash-message';
import { getEmail, removeKey } from '../../store/Store';
import { RefreshPassword } from '../../api'

function ChangePasswordScreenAfterLogin({ navigation }) {

    const [passwordNew, setPasswordNew] = React.useState("")
    const [passwordNewAgaint, setPasswordNewAgaint] = React.useState("")
    const [errorMessagePasswordNew, setErrorMessagePasswordNew] = React.useState("")
    const [errorMessagePasswordNewAgaint, setErrorMessagePasswordNewAgaint] = React.useState("")
    const [loading, setLoading] = React.useState(false)

    const validateInput = () => {

        let check = true

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
        setPasswordNew("")
        setPasswordNewAgaint("")
    }


    const updatePassword = async () => {
        if (validateInput()) {
            try {
                setLoading(true)
                const email = await getEmail()
                await removeKey("token")
                await removeKey("email")
                await RefreshPassword(email, passwordNew)
                showMessage({
                    message: "Thông Báo !",
                    description: "Đổi mật khẩu thành công, vui lòng đăng nhập lại",
                    type: "success"
                })
                ressetInput()
                setLoading(false)
                navigation.push("LoginAndSignIn")
            } catch (error) {
                console.log(error)
                showMessage({
                    message: "Thông Báo !",
                    description: "CẬP NHẬT THẤT BẠI VUI LÒNG THỬ LẠI SAU",
                    type: "danger"
                })
                ressetInput()
                setLoading(false)
            }
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
                    marginTop: 15,
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