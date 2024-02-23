import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';

function SignInScreen() {

    return (
        <View style={styles.container}>
            <View style={{ width: "90%", marginTop: 15 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Tên Zalo</Text>
                <Input placeholder='Gồm 2-40 ký tự' inputStyle={{ fontSize: 16 }} />
                <Text>Lưu ý khi đặt tên</Text>
                <Text>-  Không vi phạm <Text style={{ color: "#007bff", fontWeight: 'bold' }}>Quy định đặt tên trên Zalo</Text></Text>
                <Text>-  Nên sử dụng tên thật để giúp bạn bè dễ nhận ra bạn</Text>
            </View>
            <View style={{ alignSelf: 'flex-end' }}>
                <Button
                    title={'Tiếp tục'}
                    containerStyle={{
                        width: 100,
                        marginHorizontal: 30,
                        marginVertical: 10,
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

export default SignInScreen