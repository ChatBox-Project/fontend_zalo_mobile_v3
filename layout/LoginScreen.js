import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';

function LoginScreen() {
    return (
        <View style={styles.container}>
            <View style={{ width: "100%", padding: 12, backgroundColor: "rgba(244, 244, 244, 1)" }}>
                <Text>Vui lòng nhập số điện thoại và mật khẩu để đăng nhập</Text>
            </View>
            <View style={{ width: "95%", marginTop: 15 }}>
                <Input placeholder='Số điện thoại' inputStyle={{ fontSize: 16 }} />
                <Input placeholder="Mật khẩu" secureTextEntry={true} inputStyle={{ fontSize: 16 }} />
                <Button
                    loading={false}
                    title={'Đăng nhập'}
                    containerStyle={{
                        width: "100%",
                    }}
                    buttonStyle={{
                        height: 40
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

export default LoginScreen