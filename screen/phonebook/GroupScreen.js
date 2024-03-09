import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { BLUE, GRAY } from '../colors/Colors';
import ChatGroup from '../../util/chat_group/ChatGroup';
import { ScrollView } from 'react-native-virtualized-view';

function GroupScreen({ navigation }) {

    const [groups, setGroup] = React.useState([
        {
            groupId: 1,
            chatBoxId: 1,
            groupName: "Cộng Đồng IT Việt",
            groupMembers: null,
            groupLeaderId: null,
            userId: null,
            messageId: null
        },
        {
            groupId: 2,
            chatBoxId: 1,
            groupName: "Cộng Đồng IT Việt",
            groupMembers: null,
            groupLeaderId: null,
            userId: null,
            messageId: null
        }, {
            groupId: 3,
            chatBoxId: 1,
            groupName: "Cộng Đồng IT Việt",
            groupMembers: null,
            groupLeaderId: null,
            userId: null,
            messageId: null
        }
    ])

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={styles.container}
        >
            <TouchableOpacity
                onPress={() => { navigation.push("CreateNewGroup") }}
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    width: "100%",
                }}>
                <View style={{ width: 55, height: 55, borderRadius: 30, backgroundColor: "#e5f3f5", justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name='addusergroup' color={BLUE} size={25} />
                </View>
                <Text style={{ marginLeft: 15, fontSize: 15, }}>Tạo nhóm mới</Text>
            </TouchableOpacity>
            <View style={{ width: "100%", paddingHorizontal: 10, paddingVertical: 10, borderTopColor: GRAY, borderTopWidth: 8, flex: 1 }}>
                <Text style={{ fontWeight: '500', fontSize: 13, paddingBottom: 15 }}>Nhóm đang tham gia (18) </Text>
                <FlatList
                    data={groups}
                    renderItem={(data) => {
                        return (
                            <ChatGroup group={data.item} />
                        )
                    }}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        // alignItems: 'center',
        // justifyContent: 'flex-start',
    },
});

export default GroupScreen