import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { BLUE, GRAY } from '../colors/Colors';
import ChatGroup from '../../util/chat_group/ChatGroup';
import { ScrollView } from 'react-native-virtualized-view';
import { ListItem } from 'react-native-elements';

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
    ])

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={styles.container}
        >
            <ListItem
                onPress={() => { navigation.push("CreateNewGroup") }}
                style={{
                    width: "100%",
                    borderBottomColor: "#cccccc",
                    borderBottomWidth: 0.2
                }}
            >
                <Icon name='addusergroup' color={BLUE} size={25} />
                <ListItem.Content>
                    <ListItem.Title>Tạo nhóm mới</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron color={"black"} />
            </ListItem>
            <View style={{ width: "100%", flex: 1 }}>
                <Text style={{ fontWeight: '500', fontSize: 14, paddingHorizontal: 15, paddingVertical: 15 }}>Nhóm đang tham gia (18) </Text>
                <FlatList
                    data={groups}
                    renderItem={(data) => {
                        return (
                            <ChatGroup group={data.item} navigation={navigation} />
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
    },
});

export default GroupScreen