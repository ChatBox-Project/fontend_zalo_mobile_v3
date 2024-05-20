import React from "react";
import {
    Image,
    StyleSheet,
    Text, TouchableOpacity,
    View,
} from "react-native";
import {BLUE, GRAY, WHITE} from "../../config/Colors";
import {Avatar} from "react-native-elements";
import {getToken, getUser} from "../../store/Store";
import {useFocusEffect} from "@react-navigation/native";
import {
    createGroup,
    getListFriendOfMe,
    getUserProfileById,
    RequestAddFriend,
    RequestAddFriendStatus,
    Unfriend
} from "../../api";
import {showMessage} from "react-native-flash-message";
import Ionicons from "react-native-vector-icons/Ionicons";
import {CancelAddFriendByUserSend} from "../../api";

function UserProfileScreen({navigation, route}) {

    const userIdRecieve = route.params?.userId

    const [user, setUser] = React.useState(null)
    const [isRequestAddFriend, setIsRequestAddFriend] = React.useState(false)
    const [isFriend, setIsFriend] = React.useState(false)

    useFocusEffect(
        React.useCallback(() => {
            getUserInformation()
            checkIsRequestAddFriend()
            checkIsFriend()
        }, [])
    );

    // Kiểm tra xem đã gửi yêu cầu kết bạn chưa
    const checkIsRequestAddFriend = async () => {
        try {
            const tokenAccess = await getToken()
            const user = await getUser()
            const userIdSend = user._id
            const response = await RequestAddFriendStatus(userIdRecieve, userIdSend, tokenAccess)
            // console.log(response.data)
            const checkIsRequest = response.data.request
            // console.log(response.data)
            if (checkIsRequest) {
                setIsRequestAddFriend(true)
                return;
            }
            setIsRequestAddFriend(false)
        } catch (error) {
            console.log(error)
        }
    }

    // Kiem tra co phai la ban be hay khong
    const checkIsFriend = async () => {
        try {
            const tokenAccess = await getToken();
            const user = await getUser();
            const userId = user._id
            const response = await getListFriendOfMe(userId, tokenAccess);
            const friends = response.data.data.friends
            // console.log(friends)
            friends.forEach(friends => {
                if (friends._id === userIdRecieve) {
                    setIsFriend(true)
                    return;
                }
            })
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
            const response = await RequestAddFriend(userIdRecieve, userIdSend, tokenAccess)
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
            const response = await CancelAddFriendByUserSend(userIdRecieve, userIdSend, tokenAccess)
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

    // Hủy kết bạn
    const unfriend = async () => {
        try {
            const tokenAccess = await getToken()
            const user = await getUser()
            const userIdSend = user._id
            const response = await Unfriend(userIdSend, userIdRecieve, tokenAccess)
            showMessage({
                message: "Thông báo",
                description: "Đã hủy kết bạn",
                type: "info",
                position: "bottom",
            })
            setIsFriend(false)
        } catch (e) {
            console.log(e)
        }
    }

    const chatMessage = () => {

    }

    return (
        <View style={styles.container}>
            <View
                style={{paddingBottom: 100}}
            >
                {// neu co anh bia thi hien thi anh bia, con khong thi hien thi anh mac dinh
                    user?.coverPicture ?
                        <Image
                            source={{uri: user?.coverPicture}}
                            style={{width: "100%", height: 250}}
                        />
                        :
                        <Image
                            source={require("../../images/hoboi.jpg")}
                            style={{width: "100%", height: 250}}
                        />
                }
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
                    {// neu co anh dai dien thi hien thi anh dai dien, con khong thi hien thi anh mac dinh
                        user?.profilePicture
                            ?
                            <Avatar
                                size={"xlarge"}
                                rounded
                                source={{uri: user.profilePicture}}
                                containerStyle={{borderWidth: 4, borderColor: GRAY}}
                            />
                            :
                            <Avatar
                                size={"xlarge"}
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
                    onPress={ async () => {
                        try {
                            const token = await getToken()
                            const myUser = await getUser()
                            const data = {
                                member: [myUser._id, user._id],
                                createdBy: user._id,
                                label: undefined,
                                imageGroup: undefined,
                            }
                            const myGroupSingle = await createGroup(data, token)
                            navigation.push("ChatMessageScreen", {conservationId: myGroupSingle.data._id, isGroup: false, userId: userIdRecieve})
                        }catch (e) {
                            console.log(e)
                        }
                    }}
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
                {
                    isFriend === true ?
                        <TouchableOpacity
                            onPress={() => {
                                unfriend()
                            }}
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: BLUE,
                                padding: 12,
                                borderRadius: 10,
                                minWidth: 50,
                                maxWidth: 180
                            }}
                        >
                            <Ionicons name={"person-remove-sharp"} size={25} color={"white"}/>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            onPress={() => {
                                isRequestAddFriend ? cancelAddFriend() : requestAddFriend()
                            }}
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: BLUE,
                                padding: 12,
                                borderRadius: 10,
                                minWidth: 50,
                                maxWidth: 180
                            }}
                        >
                            {
                                isRequestAddFriend ?
                                    // <Ionicons name={"person-remove-sharp"} size={25} color={"white"}/>
                                    <Text style={{fontSize: 16, color: "white"}}>Hủy yêu cầu kết bạn</Text>
                                    :
                                    <Ionicons name={"person-add-sharp"} size={25} color={"white"}/>
                            }
                        </TouchableOpacity>
                }
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
