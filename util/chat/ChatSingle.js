import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Icon1 from 'react-native-vector-icons/Ionicons';
import AvatarChat from './compoments/AvatarChat';

function ChatSingle({ friend }) {

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 15, marginVertical: 12 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                <AvatarChat image={1} />
                <Text style={{ fontSize: 16, marginLeft: 15 }}>{friend?.username}</Text>
            </View>
            <View style={{ width: 70, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: 15 }}>
                <TouchableOpacity style={{ opacity: 0.6 }}>
                    <Icon name='phone' size={21} />
                </TouchableOpacity>
                <TouchableOpacity style={{ opacity: 0.6 }}>
                    <Icon1 name='videocam-outline' size={25} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ChatSingle