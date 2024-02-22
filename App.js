// import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './layout/HomeScreen';
import LoginScreen from './layout/LoginScreen';
import { Text } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation, route }) => ({
            headerShown: false
          })}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={({ navigation, route }) => ({
            headerTitle: "Đăng nhập"
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

