import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { GRAY } from '../../screen/colors/Colors'
import { Avatar, ListItem } from 'react-native-elements'

function ChatGroup({ group }) {
    return (
        <View
            style={{
                width: "100%",
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomWidth: 0.2,
                borderBottomColor: GRAY,
            }}>

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <ListItem
                    bottomDivider
                    style={{
                        width: "100%",
                        borderBottomWidth: 0.2,
                        borderBottomColor: "#cccccc"
                    }}
                >
                    <Avatar
                        size={60}
                        rounded
                        icon={{
                            name: "group",
                            type: "material",
                            size: 40,
                        }}
                        containerStyle={{ backgroundColor: "#c2c2c2" }}
                    />
                    <ListItem.Content>
                        <ListItem.Title style={{ color: "black", fontWeight: "bold" }}>Cộng Đồng Chung Sức</ListItem.Title>
                        <ListItem.Subtitle style={{ marginTop: 5 }}>Vice President</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            </View>
        </View>
    )
}

export default ChatGroup