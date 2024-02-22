import React from 'react'
import ZaloImage from "../images/zalo_icon.png"
import { Image, StyleSheet, View } from 'react-native'
import { Button } from 'react-native-elements'

function HomeScreen({ navigation }) {

    return (
        <View style={styles.container}>
            <Image
                source={ZaloImage}
                style={{ width: 150, height: 150 }}
            />
            <View>
                <Button
                    title="Đăng nhập"
                    buttonStyle={{
                        backgroundColor: 'rgba(78, 116, 289, 1)',
                        borderWidth: 2,
                        borderColor: 'white',
                        borderRadius: 30,
                        height: 50,
                        width: 320
                    }}
                    containerStyle={{
                        marginHorizontal: 50,
                        marginVertical: 10,
                    }}
                    titleStyle={{ fontSize: 14 }}
                    onPress={() => { navigation.push("Login") }}
                />
                <Button
                    title="Tạo tài khoản mới"
                    buttonStyle={{
                        backgroundColor: 'rgba(244, 244, 244, 1)',
                        borderWidth: 2,
                        borderColor: 'white',
                        borderRadius: 30,
                        height: 50,
                        width: 320
                    }}
                    containerStyle={{
                        marginHorizontal: 50,
                        marginVertical: 10,
                    }}
                    titleStyle={{ fontSize: 14, color: "black" }}
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
        justifyContent: 'space-around'
    },
});

export default HomeScreen