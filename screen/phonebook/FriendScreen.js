import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import { BLUE, GRAY } from '../colors/Colors';
import TabFriend from './TabFriends';
import TabStatusFriends from './TabStatusFriends';
import { ScrollView } from 'react-native-virtualized-view'

function FriendScreen({ navigation }) {

    const [tab, setTab] = React.useState(0)

    return (
        <ScrollView>
            <View style={styles.container} >
                <View style={{ marginTop: 5, width: "100%", borderBottomWidth: 8, borderBottomColor: GRAY }}>
                    <TouchableOpacity
                        onPress={() => { navigation.push("FriendRequestScreen") }}
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            paddingVertical: 10,
                            paddingHorizontal: 15,
                            width: "100%"
                        }}>
                        <View style={{ backgroundColor: BLUE, paddingHorizontal: 8, paddingVertical: 10, borderRadius: 14 }}>
                            <Icon name='user-friends' size={14} color={'white'} />
                        </View>
                        <Text style={{ fontSize: 15, marginLeft: 15 }}>Lời mời kết bạn</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { navigation.push("FriendPhoneBookScreen") }}
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            paddingVertical: 10,
                            paddingHorizontal: 15,
                            width: "100%",
                            marginBottom: 10
                        }}>
                        <View style={{ backgroundColor: BLUE, paddingHorizontal: 8, paddingVertical: 8, borderRadius: 13 }}>
                            <Icon1 name='address-book-o' size={18} color={"white"} />
                        </View>
                        <View style={{ marginLeft: 15 }}>
                            <Text style={{ fontSize: 15 }}>Danh bạ máy</Text>
                            <Text style={{ fontSize: 12, color: 'gray' }}>Các liên hệ có cùng Zalo</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ width: "100%" }}>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            padding: 10,
                            width: "100%",
                            borderBottomWidth: 1,
                            borderBottomColor: '#dfe6e9',
                        }}>
                        <TouchableOpacity
                            onPress={() => { setTab(0) }}
                            style={{
                                borderWidth: 1,
                                paddingHorizontal: 10,
                                paddingVertical: 6,
                                borderRadius: 20,
                                borderColor: "#dfe6e9",
                                backgroundColor: tab === 0 ? "#dfe6e9" : "white"
                            }}>
                            <View style={{ justifyContent: 'space-around', justifyContent: 'center', flexDirection: 'row' }}>
                                <Text style={{ color: tab === 0 ? "black" : "gray", fontWeight: tab === 0 ? "500" : "normal" }}>Tất cả</Text>
                                <Text style={{ color: tab === 0 ? "black" : "gray", marginLeft: 5 }}>42</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { setTab(1) }}
                            style={{
                                borderWidth: 1,
                                paddingHorizontal: 10,
                                paddingVertical: 6,
                                borderRadius: 20,
                                borderColor: "#dfe6e9",
                                backgroundColor: tab === 1 ? "#dfe6e9" : "white",
                                marginLeft: 15
                            }}>
                            <Text style={{ color: tab === 1 ? "black" : "gray", fontWeight: tab === 1 ? "500" : "normal" }}>Mới truy cập</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        tab === 0 ? <TabFriend /> : <TabStatusFriends />
                    }
                </View>
            </View>
        </ScrollView>
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

export default FriendScreen