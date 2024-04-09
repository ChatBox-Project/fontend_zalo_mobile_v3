import React from 'react'
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { GRAY } from '../../screen/colors/Colors';
import * as ImagePicker from 'expo-image-picker';
import { BottomSheet, ListItem } from 'react-native-elements';
import { GiftedChat } from 'react-native-gifted-chat'
import { getTokenAccess } from '../../store/MyStore';
import { CreateMessage } from '../../api/ChatBoxAPI';

function ChatWindow({ navigation, route }) {

    const chatBoxId = route.params.chatBoxId
    console.log(chatBoxId)

    const [image, setImage] = React.useState(null);
    const [isVisible, setIsVisible] = React.useState(false);
    const [messages, setMessages] = React.useState([])

    React.useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep-5.jpg',
                },
            },
        ])
    }, [])

    const onSend = React.useCallback((messages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        )
    }, [])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        // console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const list = [
        {
            title: 'Gửi File',
            onPress: () => pickImage(),
        },
        {
            title: 'Cancel',
            containerStyle: { backgroundColor: 'red' },
            titleStyle: { color: 'white' },
            onPress: () => setIsVisible(false),
        },
    ];

    React.useEffect(() => {
        navigation.setOptions({
            headerTitle: "Ngô Thiên Phú"
        });
    }, [])

    function createMessage(message) {

        const messageSend = {
            "messageType": "string",
            "contentMessage": message
        }

        getTokenAccess()
            .then(tokenAccess => {
                CreateMessage(chatBoxId, tokenAccess, messageSend)
                    .then(req => {
                        console.log("send ok !")
                    }).catch(err => {
                        console.log(err)
                    })
            })
    }

    return (
        <View style={styles.container} >
            <GiftedChat
                messages={messages}
                onSend={
                    (messages) => {
                        onSend(messages)
                        createMessage(messages[0].text)
                    }
                }
                user={{
                    _id: 1,
                }}
            />
            <Button
                title='Tùy chọn'
                onPress={() => { setIsVisible(true) }}
            />
            <BottomSheet modalProps={{}} isVisible={isVisible}>
                {list.map((l, i) => (
                    <ListItem
                        key={i}
                        containerStyle={l.containerStyle}
                        onPress={l.onPress}
                    >
                        <ListItem.Content>
                            <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </BottomSheet>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
});

export default ChatWindow