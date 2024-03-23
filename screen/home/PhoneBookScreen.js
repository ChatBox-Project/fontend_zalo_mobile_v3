import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FriendScreen from '../phonebook/FriendScreen';
import GroupScreen from '../phonebook/GroupScreen';

const Tab = createMaterialTopTabNavigator();

function PhoneBookScreen() {

    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Friend"
                component={FriendScreen}
                options={{
                    tabBarLabel: "Bạn bè",
                }}
            />
            <Tab.Screen
                name="Group"
                component={GroupScreen}
                options={{
                    tabBarLabel: "Nhóm"
                }}
            />
        </Tab.Navigator>
    );
}

export default PhoneBookScreen