import React from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { BLUE, GRAY, WHITE } from "../colors/Colors";
import { Avatar, Button } from "react-native-elements";
import { GetUserByID } from "../../api/UserAPI";

function UserProfileScreen({ navigation, route }) {

    const userId = route.params?.userId

    const [user, setUser] = React.useState(null)

    // useFocusEffect(
    //     React.useCallback(() => {
    //         getUserInformation()
    //     }, [])
    // );

    React.useEffect(() => {
        getUserInformation()
    }, [])

    async function getUserInformation() {
        try {
            const reqUserInformation = await GetUserByID(userId)
            const userInformation = reqUserInformation.data.metadata.user
            setUser(userInformation)
        } catch (error) {
            console.log(error)
            showMessage({
                message: "Thông Báo !",
                description: error.response.data.message,
                type: "danger"
            })
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
                        user?.avatarUrl
                            ?
                            <Avatar
                                size={130}
                                rounded
                                source={{ uri: user.avatarUrl }}
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
                    <Text style={{ fontSize: 22, fontWeight: "bold", marginTop: 5 }}>{user?.name}</Text>
                </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around", marginTop: 15 }}>
                <Button
                    title="Kết bạn"
                    type="outline"
                />
                <Button
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
