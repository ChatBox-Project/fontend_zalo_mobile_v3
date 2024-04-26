import React from "react";
import {
    Image,
    StyleSheet,
    Text, TouchableOpacity,
    View,
} from "react-native";
import {BLUE, GRAY, WHITE} from "../colors/Colors";
import {Avatar} from "react-native-elements";
import {getToken, getUser} from "../../store/Store";
import {useFocusEffect} from "@react-navigation/native";
import {getUserProfileById, RequestAddFriend, RequestAddFriendStatus} from "../../api";
import {showMessage} from "react-native-flash-message";
import Ionicons from "react-native-vector-icons/Ionicons";
import {CancelAddFriendByUserSend} from "../../api";

function UserProfileScreen({navigation, route}) {

    const userIdRecieve = route.params?.userId

    const [user, setUser] = React.useState(null)
    const [isRequestAddFriend, setIsRequestAddFriend] = React.useState(false)

    useFocusEffect(
        React.useCallback(() => {
            getUserInformation()
            checkIsRequestAddFriend()
        }, [])
    );


    // Kiểm tra xem đã gửi yêu cầu kết bạn chưa
    const checkIsRequestAddFriend = async () => {
        try {
            const tokenAccess = await getToken()
            const user = await getUser()
            const userIdSend = user._id
            const response = await RequestAddFriendStatus(userIdRecieve, userIdSend, tokenAccess)
            console.log(response.data)
            const checkIsRequest = response.data.request
            console.log(checkIsRequest)
            if (checkIsRequest) {
                setIsRequestAddFriend(true)
                return;
            }
            setIsRequestAddFriend(false)
        } catch (error) {
            console.log(error)
        }
    }

    // Lấy thông tin người dùng
    async function getUserInformation() {
        try {
            const tokenAccess = await getToken()
            const request = await getUserProfileById(userIdRecieve, tokenAccess)
            const user = request.data
            // console.log(user)
            setUser(user)
        } catch (error) {
            console.log(error)
        }
    }

    // Yêu cầu kết bạn
    const requestAddFriend = async () => {
        try {
            const tokenAccess = await getToken()
            const user = await getUser()
            const userIdSend = user._id
            const response = await RequestAddFriend(userIdSend, userIdRecieve, tokenAccess)
            showMessage({
                message: "Thông báo",
                description: "Đã gửi yêu cầu kết bạn",
                type: "info",
                position: "bottom",
            })
            setIsRequestAddFriend(true)
        } catch (error) {
            console.log(error)
        }
    }

    // Hủy yêu cầu kết bạn
    const cancelAddFriend = async () => {
        try {
            const tokenAccess = await getToken()
            const user = await getUser()
            const userIdSend = user._id
            const response = await CancelAddFriendByUserSend(userIdSend, userIdRecieve, tokenAccess)
            showMessage({
                message: "Thông báo",
                description: "Đã hủy yêu cầu kết bạn",
                type: "info",
                position: "bottom",
            })
            setIsRequestAddFriend(false)
        } catch (error) {
            console.log(error)
        }
    }

    const chatMessage = () => {

    }

    return (
        <View style={styles.container}>
            <View
                style={{paddingBottom: 100}}
            >
                <Image
                    source={require("../../images/hoboi.jpg")}
                    style={{width: "100%", height: 250}}
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
                                    backgroundColor: "#cccccc",
                                    borderWidth: 4,
                                    borderColor: GRAY
                                }}
                            />
                    }
                    <Text style={{fontSize: 24, fontWeight: "600", marginTop: 5}}>{user?.username}</Text>
                </View>
            </View>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-around", marginTop: 15}}>
                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: BLUE,
                        padding: 10,
                        borderRadius: 10,
                        width: "45%"
                    }}
                >
                    <Ionicons name={"chatbubble-ellipses-outline"} size={25} color={"white"}/>
                    <Text style={{fontSize: 16, color: "white", marginLeft: 15}}>Nhắn Tin</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        isRequestAddFriend ? cancelAddFriend() : requestAddFriend()
                    }}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: BLUE,
                        padding: 10,
                        borderRadius: 10,
                        width: 50
                    }}
                >
                    {
                        isRequestAddFriend ?
                            <Ionicons name={"person-remove-sharp"} size={25} color={"white"}/>
                            :
                            <Ionicons name={"person-add-sharp"} size={25} color={"white"}/>
                    }
                </TouchableOpacity>
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
