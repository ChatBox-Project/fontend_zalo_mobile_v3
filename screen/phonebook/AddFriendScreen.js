import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';
import { BLUE, GRAY } from '../../config/Colors';

function AddFriend({ navigation }) {

    return (
        <View style={styles.container} >
            <View style={{ alignItems: 'center', justifyContent: 'center', width: "100%" }}>
                <TextInput
                    style={{
                        borderWidth: 1,
                        fontSize: 16,
                        borderRadius: 5,
                        width: "90%",
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        marginTop: 15,
                        borderColor: "#cccccc"
                    }}
                    placeholder='Nhập số điện thoại'
                />
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
                    />
                </View>
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

export default AddFriend