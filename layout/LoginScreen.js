import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';

function LoginScreen() {
    return (
        <View style={styles.container}>
            <View style={{ width: "100%", padding: 10, backgroundColor: "rgba(244, 244, 244, 1)" }}>
                <Text>Vui lòng nhập số điện thoại và mật khẩu để đăng nhập</Text>
            </View>
            <View style={{ width: "95%", marginTop: 10 }}>
                <Input placeholder='Tài khoản....' />
                <Input placeholder="Mật khẩu..." secureTextEntry={true} />
                <Button
                    title={'Đăng nhập'}
                    containerStyle={{
                        width: "100%",
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
        position: 'relative'
    },
});

export default LoginScreen