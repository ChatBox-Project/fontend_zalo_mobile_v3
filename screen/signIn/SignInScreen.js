import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { BLUE } from '../colors/Colors';

function SignInScreen({ navigation, route }) {

    const account = route.params.account

    const [name, setName] = React.useState("")
    const [errorName, setErrorName] = React.useState("")

    function validate() {

        let checkPass = true;
        const regexName = /^[^\d!@#$%^&*()_+={}[\]|\\;:'",<.>\?]{2,40}$/

        if (!name) {
            checkPass = false
            setErrorName("VUI LÒNG NHẬP TRƯỜNG NÀY")
        } else if (!name.match(regexName)) {
            checkPass = false
            setErrorName("HỌ TÊN PHẢI TỪ 4-20 KÝ TỰ VÀ KHÔNG CHỨA KÍ TỰ ĐẶC BIỆT HOẶC SỐ")
        }

        if (checkPass) {
            navigation.push("BirthDayAndSexScreen", {
                account: {
                    ...account,
                    profile: {
                        name
                    }
                }
            })
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ width: "95%", marginTop: 15, marginLeft: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: '500' }}>Tên Zalo</Text>
                <Input
                    placeholder='Gồm 2-40 ký tự'
                    inputStyle={{ fontSize: 16 }}
                    value={name}
                    onChangeText={setName}
                    onChange={() => {
                        if (errorName) {
                            setErrorName("")
                        }
                    }}
                    errorMessage={errorName}
                />
                <Text style={{ marginTop: 5 }}>Lưu ý khi đặt tên</Text>
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
                    buttonStyle={{
                        backgroundColor: BLUE
                    }}
                    onPress={() => { validate() }}
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