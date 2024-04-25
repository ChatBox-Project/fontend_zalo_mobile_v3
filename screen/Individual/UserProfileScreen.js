import React from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { BLUE, GRAY, WHITE } from "../colors/Colors";
import { Avatar, Button } from "react-native-elements";
import { getTokenAccess } from "../../store/MyStore";
import {getUser} from "../../store/Store";
import {useFocusEffect} from "@react-navigation/native";

function UserProfileScreen({ navigation, route }) {

    const userId = route.params?.userId

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

    const requestAddFriend = async (userId) => {
        try {
            const tokenAccess = await getTokenAccess()
            const response = await RequestAddFriend(userId, tokenAccess)
            console.log(response)
            setIsRequestAddFriend(true)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <View
                style={{ paddingBottom: 100 }}
            >
                <Image
                    source={require("../../images/hoboi.jpg")}
                    style={{ width: "100%", height: 200 }}
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
                                source={{ uri: user.profilePicture }}
                                containerStyle={{ borderWidth: 4, borderColor: GRAY }}
                            />
                            :
                            <Avatar
                                size={130}
                                rounded
                                icon={{ name: 'user', type: 'font-awesome' }}
                                containerStyle={{
                                    backgroundColor: "#cccccc"
                                }}
                            />
                    }
                    <Text style={{ fontSize: 22, fontWeight: "bold", marginTop: 5 }}>{user?.username}</Text>
                </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around", marginTop: 15 }}>
                <Button
                    onPress={() => {
                        requestAddFriend(userId)
                    }}
                    title= {isRequestAddFriend ? "Đã gửi yêu cầu" : "Kết bạn"}
                    type="outline"
                />
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
