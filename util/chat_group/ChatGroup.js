import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import AvatarSingle from './compoments/AvatarSingle'
import AvatarChatGroup from './compoments/AvatarChatGroup'
import { GRAY } from '../../screen/colors/Colors'

function ChatGroup({ group, navigation }) {
    return (
        <TouchableOpacity
            onPress={() => { navigation.push("ChatWindow") }}
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: GRAY
            }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <AvatarChatGroup images={null} />
                <View>
                    <Text style={{ fontSize: 16, fontWeight: '600' }}>{group.groupName}</Text>
                    <Text style={{ color: "gray", fontSize: 14 }}>Thanh Nam: này mới đang chỉnh sửa</Text>
                </View>
            </View>
            {/* <View style={{ alignSelf: 'flex-start', marginTop: 10 }}>
                <Text style={{ fontSize: 12 }}>21 phút</Text>
            </View> */}
        </TouchableOpacity>
    )
}

export default ChatGroup