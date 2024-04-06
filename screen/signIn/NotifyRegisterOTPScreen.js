import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Avatar } from "react-native-elements";
import { BLUE } from '../colors/Colors';

function NotifyRegisterOTPScreen({ navigation }) {

    function rollBack() {
        navigation.push("LoginAndSignIn")
    }

    function verifyOTP() {

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