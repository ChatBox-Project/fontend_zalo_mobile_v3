import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, CheckBox, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { BLUE, GRAY } from '../colors/Colors';


function OTPScreen({ navigation, route }) {

    const [OTP, setOTP] = React.useState(route.params.OTP)
    const [inputOTP, setInputOTP] = React.useState("")
    const [time, setTime] = React.useState(30)

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

    useEffect(() => {
        console.log(OTP)
    }, [OTP])

    function ressetOTP() {
        setOTP(Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000)
        setTime(30)
    }

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
            <Text style={{ fontWeight: '600', marginTop: 10, marginBottom: 5 }}>Đã gửi mã xác nhận đến số (+84) 9999 9999</Text>
            <Text>Vui lòng nhập mã xác nhận</Text>
            <View style={{ width: "35%", marginTop: 15 }}>
                <Input
                    placeholder='Nhập mã OTP'
                    inputStyle={{ fontSize: 16, textAlign: 'center' }}
                    value={inputOTP}
                    onChangeText={setInputOTP}
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
                    title={'Tiếp tục'}
                    containerStyle={{
                        width: 100,
                        marginHorizontal: 20,
                        marginVertical: 10,
                    }}
                    buttonStyle={{
                        backgroundColor: BLUE
                    }}
                    onPress={() => {
                        if (Number(OTP) === Number(inputOTP)) {
                            alert("Đang phát triển")
                        } else {
                            alert("Mã không chính xác")
                        }
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

export default OTPScreen