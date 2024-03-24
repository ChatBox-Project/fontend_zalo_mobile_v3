import React from 'react'
import { FlatList, View } from 'react-native';
import Friend from '../../util/friend/Friend';

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
        {
            id: 2,
            username: "Trần Khởi My",
            email: "phutot1111@gmail.com",
            phone: "0348191482",
            dateOfBirth: new Date(),
            gender: true
        }
    ]);

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