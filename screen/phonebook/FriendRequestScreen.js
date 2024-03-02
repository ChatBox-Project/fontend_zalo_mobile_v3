import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SentScreen from '../friend_request/SentScreen';
import ReceivedScreen from '../friend_request/ReceivedScreen';

const Tab = createMaterialTopTabNavigator();

function FriendRequestScreen({ navigation }) {

    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Received"
                component={ReceivedScreen}
                options={{
                    tabBarLabel: "Đã nhận"
                }}
            />
            <Tab.Screen
                name="Sent"
                component={SentScreen}
                options={{
                    tabBarLabel: "Đã gửi"
                }}
            />
        </Tab.Navigator>
    )
}

export default FriendRequestScreen