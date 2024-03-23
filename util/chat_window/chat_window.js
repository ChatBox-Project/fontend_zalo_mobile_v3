import React from 'react'
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { GRAY } from '../../screen/colors/Colors';

function ChatWindow({ navigation }) {



    React.useEffect(() => {
        navigation.setOptions({
            headerTitle: "Ngô Thiên Phú"
        });
    }, [])

    return (
        <View style={styles.container} >
            <FlatList

            />
            <View
                style={{
                    borderWidth: 1,
                    width: "100%",
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderColor: GRAY
                }}>
                <TouchableOpacity
                    style={{ marginRight: 5 }}
                >
                    <Icon name='icons' size={25} color={"gray"} />
                </TouchableOpacity>
                <TextInput
                    placeholder='Tin Nhắn'
                    style={{
                        fontSize: 20,
                        // borderWidth: 1,
                        width: 200
                    }}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 130 }}>
                    <TouchableOpacity>
                        <Icon1 name='dots-three-horizontal' size={25} color={"gray"} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon2 name='microphone' size={25} color={"gray"} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon2 name='image' size={25} color={"gray"} />
                    </TouchableOpacity>
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
        justifyContent: 'space-between',
    },
});

export default ChatWindow