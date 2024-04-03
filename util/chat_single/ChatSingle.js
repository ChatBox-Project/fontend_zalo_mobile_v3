import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native';
import AvatarChat from '../friend/compoments/AvatarChat';
import { GRAY } from '../../screen/colors/Colors';
import { Avatar } from 'react-native-elements';

function ChatSingle({ chat, navigation }) {

    return (
        <TouchableOpacity
            onPress={() => { navigation.push("ChatWindow") }}
            style={{
                width: "100%",
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderBottomWidth: 0.2,
                borderBottomColor: "#cccccc"
            }}>
            <Avatar
                size={60}
                rounded
                source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
            />
            <View style={{
                marginLeft: 15
            }}>
                <Text style={{ fontSize: 16, marginBottom: 3, fontWeight: 'bold' }}>Ngô Thiên Phú</Text>
                <Text style={{ fontSize: 14, color: "gray" }}>Mai đi chơi nha</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ChatSingle