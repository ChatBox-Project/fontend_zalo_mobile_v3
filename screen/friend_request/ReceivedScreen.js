import React from 'react'
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {RequestAddFriendStatus} from "../../api";
import {getToken, getUser} from "../../store/Store";

function ReceivedScreen({navigation}) {

    React.useEffect(() => {
        getRequestAddFriend()
    }, [])


    const getRequestAddFriend = async () => {
        try {
            const tokenAccess = await getToken()
            console.log(tokenAccess)
            const user = await getUser()
            const userId = user._id
            // console.log(userId)
            // console.log(tokenAccess)
            const response = await RequestAddFriendStatus(userId, tokenAccess)
            console.log(response.data)
        }catch (error){
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <View style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 50,
                marginBottom: 10,
                backgroundColor: "#74b9ff"
            }}>
                <Icon name='address-card' size={25} color={"white"}/>
            </View>
            <Text style={{color: "gray"}}>Chưa có lời mời kết bạn nào ......</Text>
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

export default ReceivedScreen