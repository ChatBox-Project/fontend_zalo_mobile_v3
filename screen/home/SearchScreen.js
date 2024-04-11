import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Header } from "react-native-elements"
import Icon from 'react-native-vector-icons/Feather';
import { BLUE } from '../colors/Colors';

function SearchScreen({ navigation }) {

    const [search, updateSearch] = React.useState("")

    return (
        <View style={styles.container} >
            <Header
                leftComponent={() => {
                    return (
                        <TouchableOpacity
                            onPress={() => { navigation.goBack() }}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                // borderWidth: 1,
                                marginTop: 4
                            }}
                        >
                            <Icon name='arrow-left' color={"white"} size={25} />
                        </TouchableOpacity>
                    )
                }}
                centerComponent={() => {
                    return (
                        <TextInput
                            value={search}
                            onChangeText={updateSearch}
                            placeholder='tên, số điện thoại,...'
                            style={{
                                backgroundColor: "white",
                                width: 300,
                                borderRadius: 5,
                                paddingHorizontal: 8,
                                paddingVertical: 4
                            }}
                        />
                    )
                }}
                containerStyle={{
                    backgroundColor: BLUE
                }}
            />
            <Text style={{ color: "gray", marginTop: 20 }}>Vui lòng nhập thông tin tìm kiếm...</Text>
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

export default SearchScreen