import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Avatar } from "react-native-elements";
import { BLUE } from '../colors/Colors';
import { saveTokenRegister, saveUserRegister } from '../../store/MyStore';
import { generateOTP } from '../../api/SignInAPI';
import { showMessage } from 'react-native-flash-message';

function NotifyRegisterOTPScreen({ navigation, route }) {

    const data = route.params.data
    // console.log(data)

    const [loading, setLoading] = React.useState(false)

    function rollBack() {
        navigation.push("LoginAndSignIn")
    }

    async function verifyOTP() {
        try {
            setLoading(true)
            saveTokenRegister(data.tokenAccess)
            saveUserRegister(data.accountInformation)
            const phoneNumber = data.accountInformation.phoneNumber
            if (phoneNumber) {
                await generateOTP({ phoneNumber })
                navigation.push("OTPScreen", { phoneNumber, type: 1 })
                setLoading(false)
            } else {
                showMessage({
                    message: "Thông Báo !",
                    description: "PHONE NUMBER IS NOT EXISTS",
                    type: "danger"
                })
                setLoading(false)
            }
        } catch (error) {
            console.error(err)
            showMessage({
                message: "Thông Báo !",
                description: err.message,
                type: "danger"
            })
            setLoading(false)
        }
    }

    return (
        <View style={styles.container} >
            <View
                style={{
                    marginBottom: 20,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Avatar
                    size={300}
                    source={require("../../images/xac_thuc_otp_image.gif")}
                />
                <Text style={{ fontWeight: 'bold', color: BLUE, fontSize: 18 }}>CHƯA XÁC THỰC TÀI KHOẢN</Text>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    width: "100%"
                }}
            >
                <Button
                    onPress={() => { rollBack() }}
                    title={"Quay lại"}
                    buttonStyle={{
                        backgroundColor: BLUE
                    }}
                />
                <Button
                    onPress={() => { verifyOTP() }}
                    loading={loading}
                    title={"Xác thực OTP"}
                    buttonStyle={{
                        backgroundColor: "#2ecc71"
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
        justifyContent: 'center',
    },
});

export default NotifyRegisterOTPScreen