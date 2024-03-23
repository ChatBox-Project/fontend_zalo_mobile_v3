import React from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import AvatarChat from '../../util/friend/compoments/AvatarChat';
import { BLUE } from '../colors/Colors';

function IsFriendPhoneBookScreen({ navigation }) {
    const [friends, setFriends] = React.useState([
        {
            id: 1,
            name: "Ba",
            nameZalo: "Ngô Quang Thiên",
            isFriend: true
        },
        {
            id: 2,
            name: "Má",
            nameZalo: "Trần Thị Kim Anh",
            isFriend: false
        }
    ]);
    return (
        <View style={{ width: "100%", paddingHorizontal: 15 }} >
            <FlatList
                data={friends}
                renderItem={(data) => {
                    return (
                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <AvatarChat image={1} />
                                <View>
                                    <Text style={{ fontSize: 16, marginLeft: 15, fontWeight: '600' }}>{data.item.name}</Text>
                                    <Text style={{ fontSize: 14, marginLeft: 15, color: "gray" }}>Tên Zalo: {data.item.nameZalo}</Text>
                                </View>
                            </View>
                            {
                                data.item.isFriend ?
                                    <Text style={{ alignSelf: 'center', color: "gray", fontSize: 14 }}>Đã là bạn</Text>
                                    :
                                    <TouchableOpacity style={{ paddingHorizontal: 15, paddingVertical: 5, borderRadius: 25, backgroundColor: BLUE }}>
                                        <Text style={{ color: "white", fontWeight: '600', fontSize: 16 }}>Kết bạn</Text>
                                    </TouchableOpacity>
                            }
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

export default IsFriendPhoneBookScreen