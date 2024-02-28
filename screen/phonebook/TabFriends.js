import React from 'react'
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';

function TabFriend() {

    const [friends, setFriends] = React.useState([
        {
            id: 1,
            username: "Ngô Thiên Phú",
            email: "phutot1111@gmail.com",
            phone: "0348191482",
            dateOfBirth: new Date(),
            gender: true
        },
        {
            id: 2,
            username: "Ngô Thiên Phú",
            email: "phutot1111@gmail.com",
            phone: "0348191482",
            dateOfBirth: new Date(),
            gender: true
        },
        {
            id: 3,
            username: "Ngô Thiên Phú",
            email: "phutot1111@gmail.com",
            phone: "0348191482",
            dateOfBirth: new Date(),
            gender: true
        },
        {
            id: 4,
            username: "Ngô Thiên Phú",
            email: "phutot1111@gmail.com",
            phone: "0348191482",
            dateOfBirth: new Date(),
            gender: true
        },
        {
            id: 5,
            username: "Ngô Thiên Phú",
            email: "phutot1111@gmail.com",
            phone: "0348191482",
            dateOfBirth: new Date(),
            gender: true
        },
        {
            id: 6,
            username: "Ngô Thiên Phú",
            email: "phutot1111@gmail.com",
            phone: "0348191482",
            dateOfBirth: new Date(),
            gender: true
        },
        {
            id: 7,
            username: "Ngô Thiên Phú",
            email: "phutot1111@gmail.com",
            phone: "0348191482",
            dateOfBirth: new Date(),
            gender: true
        },
        {
            id: 8,
            username: "Ngô Thiên Phú",
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
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 15, marginVertical: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <View style={{ width: 45, height: 45, borderRadius: 30, backgroundColor: "#cccccc", justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon2 name='user' size={22} color={"white"} />
                                </View>
                                <Text style={{ fontSize: 16, marginLeft: 15 }}>{data.item.username}</Text>
                            </View>
                            <View style={{ width: 80, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: 15 }}>
                                <TouchableOpacity style={{ opacity: 0.6 }}>
                                    <Icon name='phone' size={22} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ opacity: 0.6 }}>
                                    <Icon1 name='videocam-outline' size={26} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }}
            />
        </View>
    );
}

export default TabFriend