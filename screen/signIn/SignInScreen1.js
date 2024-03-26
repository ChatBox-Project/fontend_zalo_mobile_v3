import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Button, CheckBox, Input } from 'react-native-elements';
import { BLUE, GRAY } from '../colors/Colors';

function SignInScreen1({ navigation }) {

    const [checkBox1, setCheckBox1] = useState(false)
    const [checkBox2, setCheckBox2] = useState(false)

    return (
        <View style={styles.container}>
            <View style={{ width: "100%", padding: 12, backgroundColor: GRAY }}>
                <Text>Nhập số điện thoại của bạn để tạo tài khoản mới</Text>
            </View>
            <View style={{ width: "95%", marginTop: 15 }}>
                <Input placeholder='Nhập số điện thoại' inputStyle={{ fontSize: 16 }} />
                <Input placeholder='Mật khẩu' inputStyle={{ fontSize: 16 }} />
                <Input placeholder='Nhập lại mật khẩu' inputStyle={{ fontSize: 16 }} />
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: -20 }}>
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
                    onPress={() => { navigation.push("OTPScreen") }}
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

export default SignInScreen1