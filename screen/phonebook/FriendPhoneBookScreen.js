import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import IsFriendPhoneBookScreen from './IsFriendPhoneBookScreen';
import NotFriendPhoneBookScreen from './NotFriendPhoneBookScreen';
import TabItem from '../../util/tab/TabItem';

function FriendPhoneBookScreen({ navigation }) {

    const [search, setSearch] = React.useState("");

    const [tab, setTab] = React.useState(0);
    const tabs = [
        {
            id: 0,
            titleTab: "Tất cả",
            tab: <IsFriendPhoneBookScreen key={0} navigation={navigation} />,
            count: 42
        },
        {
            id: 1,
            titleTab: "Chưa là bạn",
            tab: <NotFriendPhoneBookScreen key={1} navigation={navigation} />,
            count: 42
        }
    ]

    return (
        <View style={styles.container} >
            <View style={{ width: "100%", paddingHorizontal: 15, paddingTop: 10 }}>
                <View style={{ borderWidth: 1, borderRadius: 10, height: 35, borderColor: "#cccccc", justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
                    <Icon name="search" size={30} color={"gray"} style={{ marginLeft: 5 }} />
                    <TextInput value={search} onChangeText={setSearch} placeholder='Tìm kiếm...' style={{ fontSize: 14, width: "90%", marginLeft: 5 }} />
                </View>
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

export default FriendPhoneBookScreen