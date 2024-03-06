import React from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function SearchScreen({ navigation }) {

    return (
        <View style={styles.container} >
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