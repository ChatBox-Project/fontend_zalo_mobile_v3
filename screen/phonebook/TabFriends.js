import React from 'react'
import { FlatList, View } from 'react-native';
import ChatSingle from '../../util/chat/ChatSingle';

function TabFriend() {

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
        },
        {
            id: 3,
            username: "Trần Khởi My",
            email: "phutot1111@gmail.com",
            phone: "0348191482",
            dateOfBirth: new Date(),
            gender: true
        },
        {
            id: 4,
            username: "Trần Khởi My",
            email: "phutot1111@gmail.com",
            phone: "0348191482",
            dateOfBirth: new Date(),
            gender: true
        },
        {
            id: 5,
            username: "Trần Khởi My",
            email: "phutot1111@gmail.com",
            phone: "0348191482",
            dateOfBirth: new Date(),
            gender: true
        },
        {
            id: 6,
            username: "Trần Khởi My",
            email: "phutot1111@gmail.com",
            phone: "0348191482",
            dateOfBirth: new Date(),
            gender: true
        },
        {
            id: 7,
            username: "Trần Khởi My",
            email: "phutot1111@gmail.com",
            phone: "0348191482",
            dateOfBirth: new Date(),
            gender: true
        },
        {
            id: 8,
            username: "Trần Khởi My",
            email: "phutot1111@gmail.com",
            phone: "0348191482",
            dateOfBirth: new Date(),
            gender: true
        }
    ]);

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <FlatList
                style={{ width: "100%" }}
                scrollEnabled={true}
                data={friends}
                renderItem={(data) => {
                    return (
                        <ChatSingle friend={data.item} />
                    )
                }}
            />
        </View>
    );
}

export default TabFriend