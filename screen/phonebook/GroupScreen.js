import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { BLUE, GRAY } from '../colors/Colors';

function GroupScreen() {

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
        }
    ])

    return (
        <View style={styles.container} >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    paddingHorizontal: 15,
                    paddingVertical: 12,
                    width: "100%",
                    borderBottomWidth: 7,
                    borderBottomColor: GRAY
                }}>
                <View style={{ width: 55, height: 55, borderRadius: 30, backgroundColor: "#e5f3f5", justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name='addusergroup' color={BLUE} size={30} />
                </View>
                <Text style={{ marginLeft: 15 }}>Tạo nhóm mới</Text>
            </View>
            <View style={{ width: "100%", paddingHorizontal: 10, paddingVertical: 10 }}>
                <Text style={{ fontWeight: '500', fontSize: 12 }}>Nhóm đang tham gia (18) </Text>
                <FlatList
                    data={groups}
                    renderItem={(data) => {
                        return (
                            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', marginHorizontal: 12, marginVertical: 12, position: 'relative' }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 7, zIndex: 1 }}>
                                            <View style={{ width: 20, height: 20, borderWidth: 1, borderRadius: 10, borderColor: "white", backgroundColor: "gray" }}></View>
                                            <View style={{ width: 20, height: 20, borderWidth: 1, borderRadius: 10, borderColor: "white", backgroundColor: "gray" }}></View>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 5 }}>
                                            <View style={{ width: 20, height: 20, borderWidth: 1, borderRadius: 10, borderColor: "white", backgroundColor: "gray" }}></View>
                                            <View style={{ width: 20, height: 20, borderWidth: 1, borderRadius: 10, borderColor: "white", backgroundColor: "gray" }}></View>
                                        </View>
                                    </View>
                                    <View>
                                        <Text >{data.item.groupName}</Text>
                                        <Text style={{ color: "gray" }}>Thanh Nam: này mới đang chỉnh sửa</Text>
                                    </View>
                                </View>
                                <View style={{ alignSelf: 'flex-start', marginTop: 10 }}>
                                    <Text style={{ fontSize: 12 }}>21 phút</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
});

export default GroupScreen