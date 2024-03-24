import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import { BLUE, GRAY } from '../colors/Colors';
import TabFriend from './TabFriends';
import TabStatusFriends from './TabStatusFriends';
import { ScrollView } from 'react-native-virtualized-view'
import TabItem from '../../util/tab/TabItem';
import { SafeAreaView } from 'react-native-safe-area-context';

function FriendScreen({ navigation }) {

    const [tab, setTab] = React.useState(0);

    const tabs = [
        {
            id: 0,
            titleTab: "Tất cả",
            tab: <TabFriend key={0} navigation={navigation} />,
            count: 42
        },
        {
            id: 1,
            titleTab: "Mới truy cập",
            tab: <TabStatusFriends key={1} />,
            count: null
        }
    ]

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={{ width: "100%" }}
            >
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
                                paddingVertical: 10,
                                width: "100%",
                                borderBottomWidth: 1,
                                borderBottomColor: '#dfe6e9',
                            }}>

                            {
                                tabs.map((item) => {
                                    return (
                                        <TabItem key={item.id} title={item.titleTab} tab={tab} setTab={setTab} count={item.count} id={item.id} />
                                    )
                                })
                            }

                        </View>
                        {
                            tabs.map(item => {
                                if (item.id === tab) {
                                    return (
                                        item.tab
                                    )
                                }
                            })
                        }
                    </View>
                </View>
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
    },
});

export default FriendScreen