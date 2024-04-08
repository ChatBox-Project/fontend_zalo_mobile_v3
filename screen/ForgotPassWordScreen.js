import React from 'react'
import { StyleSheet, View } from 'react-native';
import { Avatar, Input, Button } from 'react-native-elements'

function ForgotPassWordScreen({ navigation }) {

    return (
        <View style={styles.container} >
            <View
                style={{
                    width: "100%",
                    paddingHorizontal: 15,
                    marginTop: 15
                }}
            >
                <Input
                    placeholder='Số điện thoại'
                />
                <Button
                    title={"Tiếp tục"}
                    buttonStyle={{
                        alignSelf: 'flex-end'
                    }}
                />
            </View>
            <Avatar
                size={150}
                source={require("../images/forgot-password.png")}
                containerStyle={{
                    marginTop: 15
                }}
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

export default ForgotPassWordScreen