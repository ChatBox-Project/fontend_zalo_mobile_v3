// import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BLUE, WHITE } from './screen/colors/Colors';
import LoginAndSignInScreen from './screen/LoginAndSignInScreen';
import LoginScreen from './screen/LoginScreen';
import SignInScreen from './screen/signIn/SignInScreen';
import SignInScreen1 from './screen/signIn/SignInScreen1';
import OTPScreen from './screen/signIn/OTPScreen';
import BirthDayAndSexScreen from './screen/signIn/BirthDayAndSexScreen';
import AvatarScreen from './screen/signIn/AvatarScreen';
import IndexScreen from './screen/home/IndexScreen';
import FriendRequestScreen from './screen/phonebook/FriendRequestScreen';
import FriendPhoneBookScreen from './screen/phonebook/FriendPhoneBookScreen';
import SettingScreen from './screen/home/SettingScreen';
import PersonalScreen from './screen/Individual/PersonalScreen';
import SearchScreen from './screen/home/SearchScreen';
import { Text, TextInput, View } from 'react-native';
import CreateNewGroupScreen from './screen/phonebook/CreateNewGroupScreen';
import AddFriend from './screen/phonebook/AddFriendScreen';
import ChatWindow from './util/chat_window/chat_window';
import FlashMessage from 'react-native-flash-message';
import NotifyRegisterOTPScreen from './screen/signIn/NotifyRegisterOTPScreen';
import ForgotPasswordScreen from './screen/ForgotPassWordScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ForgotPasswordScreen"
        screenOptions={{
          headerStyle: { backgroundColor: BLUE },
          headerTitleStyle: { color: WHITE },
          headerTintColor: WHITE,
        }}
      >
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
          options={({ navigation, route }) => ({
            headerTitle: "Quên mật khẩu"
          })}
        />
        <Stack.Screen
          name="LoginAndSignIn"
          component={LoginAndSignInScreen}
          options={({ navigation, route }) => ({
            headerShown: false,
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
        <Stack.Screen
          name="AvatarScreen"
          component={AvatarScreen}
          options={({ navigation, route }) => ({
            headerTitle: "Ảnh đại diện"
          })}
        />
        <Stack.Screen
          name="Index"
          component={IndexScreen}
          options={({ navigation, route }) => ({
            headerTitle: "Index",
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="FriendRequestScreen"
          component={FriendRequestScreen}
          options={({ navigation, route }) => ({
            headerTitle: "Lời mời kết bạn",
          })}
        />
        <Stack.Screen
          name="FriendPhoneBookScreen"
          component={FriendPhoneBookScreen}
          options={({ navigation, route }) => ({
            headerTitle: "Danh bạ máy",
          })}
        />
        <Stack.Screen
          name="Personal"
          component={PersonalScreen}
          options={({ navigation, route }) => ({
            headerTitle: "Trang cá nhân",
          })}
        />
        <Stack.Screen
          name="Setting"
          component={SettingScreen}
          options={({ navigation, route }) => ({
            headerTitle: "Cài đặt",
          })}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={({ navigation, route }) => ({
            headerTitle: "",
            headerLeft: () => {
              return (
                <TextInput
                  placeholder='tên, số điện thoại,...'
                  style={{
                    // borderWidth: 1,
                    backgroundColor: "white",
                    width: 300,
                    borderRadius: 5,
                    paddingHorizontal: 8,
                    paddingVertical: 4
                  }}
                />
              )
            },
            headerBackVisible: true,
          })}
        />
        <Stack.Screen
          name="CreateNewGroup"
          component={CreateNewGroupScreen}
          options={({ navigation, route }) => ({
            headerTitle: "Nhóm mới",
          })}
        />
        <Stack.Screen
          name="AddFriend"
          component={AddFriend}
          options={({ navigation, route }) => ({
            headerTitle: "Thêm bạn",
          })}
        />
        <Stack.Screen
          name="ChatWindow"
          component={ChatWindow}
          options={({ navigation, route }) => ({
            headerTitle: "",
          })}
        />
        <Stack.Screen
          name="NotifyRegisterOTPScreen"
          component={NotifyRegisterOTPScreen}
          options={({ navigation, route }) => ({
            headerTitle: "Xác Thực Tài Khoản",
          })}
        />
      </Stack.Navigator>
      <FlashMessage location="top" />
    </NavigationContainer>
  );
}

