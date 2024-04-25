import React from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
} from "react-native";
import {BLUE, GRAY, WHITE} from "../colors/Colors";
import {Avatar, Button} from "react-native-elements";
import {getToken, getUser} from "../../store/Store";
import {useFocusEffect} from "@react-navigation/native";
import {RequestAddFriend} from "../../api";
import {showMessage} from "react-native-flash-message";

function UserProfileScreen({navigation, route}) {

    const userIdRecieve = route.params?.userId

    const [user, setUser] = React.useState(null)
    const [isRequestAddFriend, setIsRequestAddFriend] = React.useState(false)

    useFocusEffect(
        React.useCallback(() => {
            getUserInformation()
        }, [])
    );

    async function getUserInformation() {
        try {
            const user = await getUser()
            setUser(user)
        } catch (error) {
            console.log(error)
        }
    }

    const requestAddFriend = async (userIdRecieve) => {
        try {
            const tokenAccess = await getToken()
            const user = await  getUser()
            const userIdSend = user._id
            const response = await RequestAddFriend(userIdRecieve, userIdSend, tokenAccess)
            showMessage({
                message: "Thông báo",
                description: "Đã gửi yêu cầu kết bạn",
                type: "success",
            })
            setIsRequestAddFriend(true)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <View
                style={{paddingBottom: 100}}
            >
                <Image
                    source={require("../../images/hoboi.jpg")}
                    style={{width: "100%", height: 200}}
                />
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: -140,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {
                        user?.profilePicture
                            ?
                            <Avatar
                                size={130}
                                rounded
                                source={{uri: user.profilePicture}}
                                containerStyle={{borderWidth: 4, borderColor: GRAY}}
                            />
                            :
                            <Avatar
                                size={130}
                                rounded
                                icon={{name: 'user', type: 'font-awesome'}}
                                containerStyle={{
                                    backgroundColor: "#cccccc"
                                }}
                            />
                    }
                    <Text style={{fontSize: 22, fontWeight: "bold", marginTop: 5}}>{user?.username}</Text>
                </View>
            </View>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-around", marginTop: 15}}>
                {
                    isRequestAddFriend === false ?
                        <Button
                            onPress={() => {
                                requestAddFriend(userIdRecieve)
                            }}
                            title={"Kết bạn"}
                            type="outline"
                        />
                        :
                        <Button
                            onPress={() => {

                            }}
                            title="Hủy yêu cầu kết bạn"
                            type="outline"
                        />
                }
                <Button
                    onPress={() => {

                    }}
                    title="Nhắn tin"
                    type="outline"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GRAY,
    },
});

export default UserProfileScreen;
