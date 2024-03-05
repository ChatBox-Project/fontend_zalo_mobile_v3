import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { BLUE, GRAY } from './colors/Colors';

function LoginScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={{ width: "100%", padding: 12, backgroundColor: GRAY }}>
                <Text>Vui lòng nhập số điện thoại và mật khẩu để đăng nhập</Text>
            </View>
            <View style={{ width: 370, marginTop: 15 }}>
                <Input placeholder='Số điện thoại' inputStyle={{ fontSize: 16 }} />
                <Input placeholder="Mật khẩu" secureTextEntry={true} inputStyle={{ fontSize: 16, marginTop: -15 }} />
                <TouchableOpacity>
                    <Text style={{ marginLeft: 10, color: BLUE, fontWeight: '500', marginTop: -10 }}>Lấy lại mật khẩu</Text>
                </TouchableOpacity>
            </View>
            <Button
                loading={false}
                title={'Đăng nhập'}
                containerStyle={{
                    width: 360,
                }}
                buttonStyle={{
                    height: 40,
                    marginTop: 20,
                    backgroundColor: BLUE
                }}
                onPress={() => { navigation.push("Index") }}
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

export default LoginScreen