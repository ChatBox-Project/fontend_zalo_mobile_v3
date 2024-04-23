import React, { useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { BLUE, GRAY } from '../colors/Colors';
import { showMessage } from 'react-native-flash-message';
import { ConfirmCode } from '../../api';


function OTPScreen({ navigation, route }) {

    const email = route.params?.email
    const type = route.params?.type

    // console.log(type)
    const [otp, setOTP] = React.useState("")
    const [time, setTime] = React.useState(30)
    const [loading, setLoading] = React.useState(false)

    useEffect(() => {
        const id = setInterval(() => {
            if (time >= 0) {
                setTime(time - 1)
            }
        }, 1000);

        return () => {
            clearInterval(id)
        }
    }, [time])


    async function ressetOTP() {
        if (email) {
            try {
                await ConfirmCode({ otp, email })
                showMessage({
                    message: "Thông Báo !",
                    description: "Đã gửi lại mã OTP",
                    type: "info",
                });
                setTime(30)
            } catch (error) {
                console.log(error)
                // showMessage({
                //     message: "Thông Báo !",
                //     description: error.response.data.message,
                //     type: "danger",
                // });
            }
        } else {
            showMessage({
                message: "Thông Báo !",
                description: "THÔNG TIN LỖI VUI LÒNG THỬ LẠI SAU",
                type: "danger",
            });
        }
    }

    const runVerifyOTP = async () => {
        if (email) {
            try {
                setLoading(true)
                await ConfirmCode({ otp, email })
                showMessage({
                    message: "Thông Báo !",
                    description: "Xác thực thành công",
                    type: "success",
                });
                if (type === 1) {
                    navigation.push("Login")
                } else if (type === 2) {
                    navigation.push("ChangePassWordScreen", { email })
                }
                setOTP("")
                setLoading(false)
            } catch (error) {
                console.log(error)
                // showMessage({
                //     message: "Thông Báo !",
                //     description: error.response.data.message,
                //     type: "danger",
                // });
                setLoading(false)
                setOTP("")
            }
        } else {
            showMessage({
                message: "Thông Báo !",
                description: "THÔNG TIN LỖI VUI LÒNG THỬ LẠI SAU",
                type: "danger",
            });
        }
    };


    return (
        <View style={styles.container}>
            <View style={{ width: "100%", padding: 12, backgroundColor: GRAY }}>
                <Text>Vui lòng không chia sẻ mã xác thực để tránh mất tài khoản</Text>
            </View>
            <View
                style={{
                    borderWidth: 3,
                    marginTop: 60,
                    marginBottom: 15,
                    borderRadius: 50,
                    width: 65,
                    height: 65,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: BLUE
                }}>
                <Icon name='phone-volume' size={30} color={BLUE} />
            </View>
            <Text style={{ fontWeight: '600', marginTop: 10, marginBottom: 5 }}>Đã gửi mã xác nhận đến Email: {email}</Text>
            <Text>Vui lòng nhập mã xác nhận</Text>
            <View style={{ width: "35%", marginTop: 15 }}>
                <Input
                    placeholder='Nhập mã OTP'
                    inputStyle={{ fontSize: 16, textAlign: 'center' }}
                    value={otp}
                    onChangeText={setOTP}
                />
            </View>
            <View
                style={{ flexDirection: 'row' }}
            >
                {
                    (time >= 0) ?
                        <Text>Gửi lại mã</Text>
                        :
                        <TouchableOpacity
                            onPress={() => { ressetOTP() }}
                        >
                            <Text
                                style={{ color: BLUE }}
                            >Gửi lại mã
                            </Text>
                        </TouchableOpacity>
                }
                {
                    (time >= 0) ? <Text style={{ color: BLUE }}> {time}s</Text> : <></>
                }
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
                    onPress={() => { runVerifyOTP() }}
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

export default OTPScreen