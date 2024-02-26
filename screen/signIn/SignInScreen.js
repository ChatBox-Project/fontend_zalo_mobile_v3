import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { BLUE } from '../colors/Colors';

function SignInScreen({ navigation }) {

    return (
        <View style={styles.container}>
            <View style={{ width: "95%", marginTop: 15, marginLeft: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: '500' }}>Tên Zalo</Text>
                <Input placeholder='Gồm 2-40 ký tự' inputStyle={{ fontSize: 16 }} />
                <Text>Lưu ý khi đặt tên</Text>
                <Text style={{ marginTop: 5, marginBottom: 5 }}>-  Không vi phạm <Text style={{ color: BLUE }}>Quy định đặt tên trên Zalo</Text></Text>
                <Text>-  Nên sử dụng tên thật để giúp bạn bè dễ nhận ra bạn</Text>
            </View>
            <View style={{ alignSelf: 'flex-end' }}>
                <Button
                    title={'Tiếp tục'}
                    containerStyle={{
                        width: 100,
                        marginHorizontal: 20,
                        marginVertical: 10,
                    }}
                    onPress={() => { navigation.push("SignIn1") }}
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