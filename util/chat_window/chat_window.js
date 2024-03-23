import React from 'react'
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { GRAY } from '../../screen/colors/Colors';
import * as ImagePicker from 'expo-image-picker';
import { BottomSheet, ListItem } from 'react-native-elements';

function ChatWindow({ navigation }) {

    const [image, setImage] = React.useState(null);
    const [isVisible, setIsVisible] = React.useState(false);

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
        { title: 'Gửi file' },
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

    return (
        <View style={styles.container} >
            <FlatList

            />
            <View
                style={{
                    borderWidth: 1,
                    width: "100%",
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderColor: GRAY
                }}>

                <TouchableOpacity
                    style={{ marginRight: 5 }}
                >
                    <Icon name='icons' size={25} color={"gray"} />
                </TouchableOpacity>
                <TextInput
                    placeholder='Tin Nhắn'
                    style={{
                        fontSize: 20,
                        // borderWidth: 1,
                        width: 200
                    }}
                />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 130 }}>
                    <TouchableOpacity
                        onPress={() => { setIsVisible(true) }}
                    >
                        <Icon1 name='dots-three-horizontal' size={25} color={"gray"} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon2 name='microphone' size={25} color={"gray"} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={pickImage}
                    >
                        <Icon2 name='image' size={25} color={"gray"} />
                    </TouchableOpacity>
                </View>

            </View>

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
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});

export default ChatWindow