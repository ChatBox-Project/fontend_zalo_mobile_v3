import React from 'react'
import { Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';

function ChatSingle({ chatBox, userInformation }) {
    // console.log(chatBox)
    // console.log(userInformation)
    // React.useEffect(() => {
    //     const userReciever = (chatBox.user1_id === userInformation.id) ? chatBox.user2_id : chatBox.user2_id

    // })

    return (
        <View
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
                source={{ uri: userInformation.avatarUrl }}
            />
            <View style={{
                marginLeft: 15
            }}>
                <Text style={{ fontSize: 16, marginBottom: 3, fontWeight: '500' }}>Ngo Thien Phu</Text>
                <Text style={{ fontSize: 14, color: "gray" }}>Mai đi chơi nha</Text>
            </View>
        </View>
    )
}

export default ChatSingle