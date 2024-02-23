import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Button, CheckBox, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';


function OTPScreen({ navigation }) {

    return (
        <View style={styles.container}>
            <View style={{ width: "100%", padding: 12, backgroundColor: "rgba(244, 244, 244, 1)" }}>
                <Text>Vui lòng không chia sẻ mã xác thực để tránh mất tài khoản</Text>
            </View>
            <View style={{ borderWidth: 3, padding: 15, marginTop: 60, borderRadius: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', borderColor: "gray" }}>
                <Icon name='phone-missed' size={30} color={"gray"} />
            </View>
            <Text style={{ fontWeight: '600', marginTop: 10, marginBottom: 5 }}>Đã gửi mã xác nhận đến số (+84) 999 99999</Text>
            <Text>Vui lòng nhập mã xác nhận</Text>
            <View style={{ width: "95%", marginTop: 15 }}>
                <Input placeholder='Nhập mã OTP' inputStyle={{ fontSize: 16 }} />
            </View>
            <Text>Gửi lại mã <Text style={{ color: "#007bff" }}>00:00</Text></Text>
            <View style={{ alignSelf: 'flex-end' }}>
                <Button
                    title={'Tiếp tục'}
                    containerStyle={{
                        width: 100,
                        marginHorizontal: 20,
                        marginVertical: 10,
                    }}
                    onPress={() => { navigation.push("BirthDayAndSexScreen") }}
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