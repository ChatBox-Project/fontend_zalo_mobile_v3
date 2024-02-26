import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatScreen from './ChatScreen';
import Icon from 'react-native-vector-icons/Fontisto';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import Icon4 from 'react-native-vector-icons/AntDesign';
import { Text, TouchableOpacity, View } from 'react-native';
import { BLUE } from '../colors/Colors';
import PhoneBookScreen from './PhoneBookScreen';
import IndividualScreen from './IndividualScreen';
import * as Contacts from 'expo-contacts';

const Tab = createBottomTabNavigator();

function IndexScreen() {

    // Lấy danh bạ điện thoại
    React.useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.PhoneNumbers],
                });

                if (data.length > 0) {
                    const contact = data[0];
                    console.log(contact);
                }
            }
        })();
    }, []);

    return (
        <Tab.Navigator
            initialRouteName='Chat'
            screenOptions={{
                headerStyle: { backgroundColor: BLUE },
                tabBarStyle: { height: 55, paddingBottom: 5 },
                tabBarLabelStyle: { fontSize: 12 },
                tabBarActiveTintColor: BLUE,
                tabBarInactiveTintColor: "#cccccc",
                headerLeft: () => (
                    <View style={{ marginLeft: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity style={{ marginRight: 20 }}>
                            <Icon name='search' size={20} color={'white'} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 17, color: '#D8D8E3' }}>Tìm kiếm</Text>
                    </View>
                ),
            }}
        >
            <Tab.Screen
                name="Chat"
                component={ChatScreen}
                options={{
                    headerTitle: "",
                    headerRight: () => (
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity style={{ marginRight: 20 }}>
                                <Icon1 name='plus' size={25} color={'white'} />
                            </TouchableOpacity>
                        </View>
                    ),
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon2 name='chatbox-ellipses-outline' size={20} color={color} />
                    ),
                    tabBarLabel: "Tin nhắn",
                }}
            />
            <Tab.Screen
                name='PhoneBook'
                component={PhoneBookScreen}
                options={{
                    headerTitle: "",
                    headerRight: () => (
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity style={{ marginRight: 20 }}>
                                <Icon4 name='adduser' size={25} color={'white'} />
                            </TouchableOpacity>
                        </View>
                    ),
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon3 name='address-book-o' size={20} color={color} />
                    ),
                    tabBarLabel: "Danh bạ",
                }}
            />
            <Tab.Screen
                name='Individual'
                component={IndividualScreen}
                options={{
                    headerTitle: "",
                    headerRight: () => (
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity style={{ marginRight: 20 }}>
                                <Icon2 name='settings-outline' size={25} color={'white'} />
                            </TouchableOpacity>
                        </View>
                    ),
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon3 name='user-o' size={20} color={color} />
                    ),
                    tabBarLabel: "Cá nhân",
                }}
            />
        </Tab.Navigator>
    )
}

export default IndexScreen