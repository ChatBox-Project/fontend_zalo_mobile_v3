import React from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
} from "react-native";
import {BLUE, GRAY, WHITE} from "../../config/Colors";
import {Avatar} from "react-native-elements";
import {useFocusEffect} from "@react-navigation/native";
import {getToken, getUser} from "../../store/Store";
import {getUserProfileById} from "../../api";

function PersonalScreen({navigation}) {

    const [options, setOptions] = React.useState([
        {title: "Nhập từ Facebook", image: require("../../images/import.png")},
        {title: "Ảnh của tôi", image: require("../../images/photo.png")},
        {title: "Kho khoảnh khắc", image: require("../../images/kho.png")},
        {title: "Kỉ niệm năm xưa", image: require("../../images/clock.png")},
        {title: "Video của tôi", image: require("../../images/camera.png")},
    ])

    const [user, setUser] = React.useState(null)

    useFocusEffect(
        React.useCallback(() => {
            getUserInformation()
        }, [])
    );

    async function getUserInformation() {
        try {
            const tokenAccess = await getToken()
            const user = await getUser();
            const userId = user._id
            const response = await getUserProfileById(userId, tokenAccess)
            const userInformation = response.data
            // console.log(userInformation)
            setUser(userInformation)
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
                                size={100}
                                rounded
                                source={{uri: user?.profilePicture}}
                                containerStyle={{borderWidth: 4, borderColor: "white"}}
                            />
                            :
                            <Avatar
                                size={130}
                                rounded
                                icon={{name: 'user', type: 'font-awesome'}}
                                containerStyle={{
                                    backgroundColor: "#cccccc",
                                    borderWidth: 4,
                                    borderColor: "white"
                                }}
                            />
                    }
                    <Text style={{fontSize: 22, fontWeight: "bold", marginTop: 5}}>{user?.username}</Text>
                </View>
            </View>
            <View style={{height: 80}}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    <View style={{flexDirection: "row", marginTop: 15, paddingHorizontal: 10}}>
                        {
                            options.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={{
                                            backgroundColor: WHITE,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            flexDirection: "row",
                                            marginHorizontal: 5,
                                            paddingHorizontal: 10,
                                            marginTop: 10,
                                            height: 40,
                                            borderRadius: 2,
                                            borderWidth: 0.2
                                        }}
                                    >
                                        <Image source={item.image} style={{width: 15, height: 15}}/>
                                        <Text style={{marginLeft: 10, fontSize: 14}}>
                                            {item.title}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </ScrollView>
            </View>
            <View style={{flexDirection: "column", alignItems: "center"}}>

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

export default PersonalScreen;
