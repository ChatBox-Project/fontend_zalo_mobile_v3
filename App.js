// import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BLUE, WHITE} from './config/Colors';
import LoginAndSignInScreen from './screen/LoginAndSignInScreen';
import LoginScreen from './screen/LoginScreen';
import SignInScreen from './screen/signIn/SignInScreen';
import OTPScreen from './screen/signIn/OTPScreen';
import BirthDayAndSexScreen from './screen/signIn/BirthDayAndSexScreen';
import IndexScreen from './screen/home/IndexScreen';
import FriendRequestScreen from './screen/phonebook/FriendRequestScreen';
import FriendPhoneBookScreen from './screen/phonebook/FriendPhoneBookScreen';
import SettingScreen from './screen/home/SettingScreen';
import PersonalScreen from './screen/Individual/PersonalScreen';
import SearchScreen from './screen/home/SearchScreen';
import AddFriend from './screen/phonebook/AddFriendScreen';
import FlashMessage from 'react-native-flash-message';
import ForgotPasswordScreen from './screen/ForgotPassWordScreen';
import ChangePassWordScreen from './screen/ChangePassWordScreen';
import ChangePasswordScreenAfterLogin from './screen/home/ChangePasswordScreenAfterLogin';
import UserProfileScreen from './screen/Individual/UserProfileScreen';
import UpdateProfileScreen from "./screen/UpdateProfileScreen";
import Group from "./util/item/Group";
import CreateGroupScreen from "./screen/CreateGroupScreen";
import ChatMessageScreen from "./screen/ChatMessageScreen";
import AddMember from "./screen/AddMemberScreen";
import ListMember from "./screen/ListMemberScreen";
import RenameGroup from "./screen/RenameGroupScreen";

const Stack = createNativeStackNavigator();

export default function App() {

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="LoginAndSignIn"
                screenOptions={{
                    headerStyle: {backgroundColor: BLUE},
                    headerTitleStyle: {color: WHITE},
                    headerTintColor: WHITE,
                }}
            >
                <Stack.Screen
                    name="LoginAndSignIn"
                    component={LoginAndSignInScreen}
                    options={({navigation, route}) => ({
                        headerShown: false,
                    })}
                />
                <Stack.Screen
                    name="RenameGroup"
                    component={RenameGroup}
                    options={({navigation, route}) => ({
                        headerTitle: "Đổi tên nhóm",
                    })}
                />
                <Stack.Screen
                    name="ListMember"
                    component={ListMember}
                    options={({navigation, route}) => ({
                        headerTitle: "Danh sách thành viên",
                    })}
                />
                <Stack.Screen
                    name="AddMember"
                    component={AddMember}
                    options={({navigation, route}) => ({
                        headerTitle: "Thêm thành viên",
                    })}
                />
                <Stack.Screen
                    name="CreateGroupScreen"
                    component={CreateGroupScreen}
                    options={({navigation, route}) => ({
                        headerShown: true,
                        title: "Tạo nhóm"
                    })}
                />
                <Stack.Screen
                    name="Group"
                    component={Group}
                    options={({navigation, route}) => ({
                        headerShown: true,
                    })}
                />
                <Stack.Screen
                    name="ChatMessageScreen"
                    component={ChatMessageScreen}
                    options={({navigation, route}) => ({
                        headerShown: true,
                    })}
                />
                <Stack.Screen
                    name="UpdateProfileScreen"
                    component={UpdateProfileScreen}
                    options={({navigation, route}) => ({
                        headerTitle: "Cập nhật thông tin cá nhân"
                    })}
                />
                <Stack.Screen
                    name="UserProfileScreen"
                    component={UserProfileScreen}
                    options={({navigation, route}) => ({
                        headerTitle: "Trang cá nhân"
                    })}
                />
                <Stack.Screen
                    name="ChangePasswordScreenAfterLogin"
                    component={ChangePasswordScreenAfterLogin}
                    options={({navigation, route}) => ({
                        headerTitle: "Đổi mật khẩu"
                    })}
                />
                <Stack.Screen
                    name="ChangePassWordScreen"
                    component={ChangePassWordScreen}
                    options={({navigation, route}) => ({
                        headerTitle: "Đổi mật khẩu"
                    })}
                />
                <Stack.Screen
                    name="ForgotPasswordScreen"
                    component={ForgotPasswordScreen}
                    options={({navigation, route}) => ({
                        headerTitle: "Quên mật khẩu"
                    })}
                />
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={({navigation, route}) => ({
                        headerTitle: "Đăng nhập"
                    })}
                />
                <Stack.Screen
                    name="SignIn1"
                    component={SignInScreen}
                    options={({navigation, route}) => ({
                        headerTitle: "Tạo tài khoản"
                    })}
                />
                <Stack.Screen
                    name="OTPScreen"
                    component={OTPScreen}
                    options={({navigation, route}) => ({
                        headerTitle: "Nhập mã kích hoạt"
                    })}
                />
                <Stack.Screen
                    name="BirthDayAndSexScreen"
                    component={BirthDayAndSexScreen}
                    options={({navigation, route}) => ({
                        headerTitle: "Ngày sinh và giới tính"
                    })}
                />
                <Stack.Screen
                    name="Index"
                    component={IndexScreen}
                    options={({navigation, route}) => ({
                        headerTitle: "Index",
                        headerShown: false,
                    })}
                />
                <Stack.Screen
                    name="FriendRequestScreen"
                    component={FriendRequestScreen}
                    options={({navigation, route}) => ({
                        headerTitle: "Lời mời kết bạn",
                    })}
                />
                <Stack.Screen
                    name="FriendPhoneBookScreen"
                    component={FriendPhoneBookScreen}
                    options={({navigation, route}) => ({
                        headerTitle: "Danh bạ máy",
                    })}
                />
                <Stack.Screen
                    name="Personal"
                    component={PersonalScreen}
                    options={({navigation, route}) => ({
                        headerTitle: "Trang cá nhân",
                    })}
                />
                <Stack.Screen
                    name="Setting"
                    component={SettingScreen}
                    options={({navigation, route}) => ({
                        headerTitle: "Cài đặt",
                    })}
                />
                <Stack.Screen
                    name="Search"
                    component={SearchScreen}
                    options={({navigation, route}) => ({
                        headerTitle: "",
                        headerShown: false,
                        // headerBackVisible: true,
                    })}
                />
                <Stack.Screen
                    name="AddFriend"
                    component={AddFriend}
                    options={({navigation, route}) => ({
                        headerTitle: "Thêm bạn",
                    })}
                />
            </Stack.Navigator>
            <FlashMessage location="top"/>
        </NavigationContainer>
    );
}

