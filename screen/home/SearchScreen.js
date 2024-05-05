import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Avatar, Header, ListItem } from "react-native-elements"
import Icon from 'react-native-vector-icons/Feather';
import { BLUE } from '../../config/Colors';
import { FindUser } from '../../api/';
import {getToken} from "../../store/Store";

function SearchScreen({ navigation }) {

    const [search, updateSearch] = React.useState("")
    const [users, setUsers] = React.useState(null)

    // console.log(users)

    React.useEffect(() => {
        if (search) {
            const runSearch = async () => {
                try {
                    const tokenAccess = await  getToken();
                    const user = await FindUser(search, tokenAccess);
                    // console.log(user.data)
                    if(user.data.exist){
                        setUsers(user.data)
                    }else{
                        setUsers(null)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            runSearch()
        }
    }, [search])

    return (
        <View style={styles.container} >
            <Header
                leftComponent={() => {
                    return (
                        <TouchableOpacity
                            onPress={() => { navigation.goBack() }}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                // borderWidth: 1,
                                marginTop: 4
                            }}
                        >
                            <Icon name='arrow-left' color={"white"} size={25} />
                        </TouchableOpacity>
                    )
                }}
                centerComponent={() => {
                    return (
                        <TextInput
                            value={search}
                            onChangeText={updateSearch}
                            placeholder='tên, số điện thoại,...'
                            style={{
                                backgroundColor: "white",
                                width: 300,
                                borderRadius: 5,
                                paddingHorizontal: 8,
                                paddingVertical: 4
                            }}
                        />
                    )
                }}
                containerStyle={{
                    backgroundColor: BLUE
                }}
            />
            {
                !users ?
                    <Text style={{ color: "gray", marginTop: 20 }}>Vui lòng nhập thông tin tìm kiếm...</Text>
                    :
                    <ListItem
                        onPress={() => { navigation.push("UserProfileScreen", { userId: users._id }) }}
                        style={{
                            width: "100%",
                        }}
                    >
                        {
                            users?.avatarUrl ?
                                <Avatar
                                    size={60}
                                    rounded
                                    source={{ uri: users?.profilePicture }}
                                />
                                :
                                <Avatar
                                    size={60}
                                    rounded
                                    icon={{ name: 'user', type: 'font-awesome' }}
                                    containerStyle={{
                                        backgroundColor: "#cccccc"
                                    }}
                                />

                        }
                        <ListItem.Content>
                            <ListItem.Title style={{ color: "black", fontWeight: "bold" }}>
                                {users?.username}
                            </ListItem.Title>
                            <ListItem.Subtitle style={{ color: "gray" }}>
                                Xem trang cá nhân
                            </ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron color="black" />
                    </ListItem>
            }
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

export default SearchScreen