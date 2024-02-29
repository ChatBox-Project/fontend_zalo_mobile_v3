import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import AvatarSingle from './compoments/AvatarSingle'
import AvatarChatGroup from './compoments/AvatarChatGroup'

function ChatGroup({ group }) {
    return (
        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <AvatarChatGroup images={null} />
                <View>
                    <Text>{group.groupName}</Text>
                    <Text style={{ color: "gray" }}>Thanh Nam: này mới đang chỉnh sửa</Text>
                </View>
            </View>
            <View style={{ alignSelf: 'flex-start', marginTop: 10 }}>
                <Text style={{ fontSize: 12 }}>21 phút</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ChatGroup