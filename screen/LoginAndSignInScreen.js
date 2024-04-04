import React from 'react'
import ZaloImage from "../images/zalo_icon.png"
import { Image, StyleSheet, View } from 'react-native'
import { Button } from 'react-native-elements'
import { BLUE, GRAY } from './colors/Colors'
import { useFocusEffect } from '@react-navigation/native'
import { getAccount } from '../api/SignInAPI'
import { getTokenRegister } from '../store/MyStore'

function LoginAndSignInScreen({ navigation }) {

    const [isUser, setIsUser] = React.useState(false)

    const getAccountInformation = async (user) => {
        try {
            const jsonValue = JSON.stringify(user);
            await AsyncStorage.setItem('user', jsonValue);
        } catch (e) {
            console.error(e)
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            getTokenRegister()
                .then(value => {
                    if (value !== null) {
                        getAccount(value)
                            .then(req => {
                                const user = req.data.metadata.user
                                getAccountInformation(user)
                                setIsUser(true)
                            })
                            .catch(err => {
                                console.error(err)
                            })
                    } else {
                        setIsUser(false)
                    }
                })
        }, [])
    );

    React.useEffect(() => {
        if (isUser === true) {
            navigation.push("Index");
        }
    }, [isUser]);

    if (!isUser) {
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
                            backgroundColor: BLUE,
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
                            backgroundColor: GRAY,
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
                        onPress={() => { navigation.push("SignIn1") }}
                    />
                </View>
            </View>
        )
    }

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

export default LoginAndSignInScreen