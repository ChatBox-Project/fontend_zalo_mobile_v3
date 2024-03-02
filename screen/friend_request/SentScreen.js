import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function SentScreen({ navigation }) {

    return (
        <View style={styles.container} >
            <View style={{ width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginTop: 50, marginBottom: 10, backgroundColor: "#74b9ff" }}>
                <Icon name='person-add-alt-1' size={25} color={"white"} />
            </View>
            <Text style={{ color: "gray" }}>Chưa gửi lời mời kết bạn nào ......</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
});

export default SentScreen