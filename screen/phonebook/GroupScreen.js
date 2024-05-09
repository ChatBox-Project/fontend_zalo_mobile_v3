import React from 'react'
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {BLUE, GRAY} from '../../config/Colors';
import {ScrollView} from 'react-native-virtualized-view';
import {Avatar, ListItem} from 'react-native-elements';
import {useFocusEffect} from "@react-navigation/native";
import {getToken, getUser} from "../../store/Store";
import {getAllConverstaion} from "../../api/conversation";

function GroupScreen({navigation}) {

    const [groups, setGroup] = React.useState([])

    useFocusEffect(
        React.useCallback(() => {
            const getAllChats = async () => {
                try {
                    const token = await getToken()
                    const user = await getUser()
                    const listChat = await getAllConverstaion(user._id, token)
                    setGroup(listChat.data)
                } catch (e) {
                    console.log(e)
                }
            }
            // lay tat ca cuoc tro chuyen
            getAllChats()
        }, [])
    );

    // hien thi mot nhom chat
    const renderChat = ({item}) => {
        return (
            <ListItem onPress={() => {
                navigation.push("ChatMessageScreen", {conservationId: item._id, isGroup: true})
            }} bottomDivider>
                {
                    item?.imageGroup ?
                        <Avatar source={{uri: item.imageGroup}}/>
                        :
                        <Avatar
                            rounded
                            icon={{name: 'group', type: 'font-awesome', color: 'white'}}
                            size={"medium"}
                            backgroundColor={"#cccccc"}
                        />
                }
                <ListItem.Content>
                    <ListItem.Title>{item.label}</ListItem.Title>
                    <ListItem.Subtitle>{item.lastUpdate}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron/>
            </ListItem>
        )
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={styles.container}
        >
            <ListItem
                onPress={() => {
                    navigation.push("CreateGroupScreen")
                }}
                style={{
                    width: "100%",
                    borderBottomColor: "#cccccc",
                    borderBottomWidth: 0.2
                }}
            >
                <Icon name='addusergroup' color={BLUE} size={25}/>
                <ListItem.Content>
                    <ListItem.Title>Tạo nhóm mới</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron color={"black"}/>
            </ListItem>
            <View style={{width: "100%", flex: 1}}>
                <Text style={{
                    fontWeight: '500',
                    fontSize: 14,
                    paddingHorizontal: 15,
                    paddingVertical: 15,
                    borderBottomWidth: 0.3,
                    borderBottomColor: "#cccccc",
                    backgroundColor: "#fff",
                    marginTop: 8
                }}
                >
                    Nhóm đang tham gia
                </Text>
                <FlatList
                    keyExtractor={(item, index) => {
                        return item._id.toString()
                    }}
                    data={groups}
                    renderItem={renderChat}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GRAY,
        flexDirection: 'column',
    },
});

export default GroupScreen