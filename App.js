// import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './layout/HomeScreen';
import LoginScreen from './layout/LoginScreen';
import SignInScreen from './layout/SignInScreen';
import SignInScreen1 from './layout/SignInScreen1';
import OTPScreen from './layout/OTPScreen';
import BirthDayAndSexScreen from './layout/BirthDayAndSexScreen';

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
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={({ navigation, route }) => ({
            headerTitle: "Tạo tài khoản"
          })}
        />
        <Stack.Screen
          name="SignIn1"
          component={SignInScreen1}
          options={({ navigation, route }) => ({
            headerTitle: "Tạo tài khoản"
          })}
        />
        <Stack.Screen
          name="OTPScreen"
          component={OTPScreen}
          options={({ navigation, route }) => ({
            headerTitle: "Nhập mã kích hoạt"
          })}
        />
        <Stack.Screen
          name="BirthDayAndSexScreen"
          component={BirthDayAndSexScreen}
          options={({ navigation, route }) => ({
            headerTitle: "Ngày sinh và giới tính"
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

