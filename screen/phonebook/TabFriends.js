import React from 'react'
import { FlatList, View } from 'react-native';
import Friend from '../../util/friend/Friend';
import {useFocusEffect} from "@react-navigation/native";
import {getToken, getUser} from "../../store/Store";
import {getListFriendOfMe} from "../../api";

function TabFriend({ navigation }) {

    const [friends, setFriends] = React.useState([
        {
            id: 1,
            username: "Trần Khởi My",
            email: "phutot1111@gmail.com",
            phone: "0348191482",
            dateOfBirth: new Date(),
            gender: true
        },
    ]);

    useFocusEffect(
        React.useCallback(() => {
            getFriends();
        }, [])
    );

    // Lấy danh sách bạn bè
    const getFriends = async  () => {
        try {
            const tokenAccess = await getToken();
            const user = await  getUser();
            const userId = user._id
            const response = await getListFriendOfMe(userId, tokenAccess);
            const friends = response.data.data.friends
            setFriends(friends)
        }catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={{ alignItems: 'center', flex: 1 }}>
            <FlatList
                style={{ width: "100%" }}
                scrollEnabled={true}
                data={friends}
                renderItem={(data) => {
                    return (
                        <Friend friend={data.item} navigation={navigation} />
                    )
                }}
            />
        </View>
    );
}

export default TabFriend