import React from "react";
import { StyleSheet, View } from "react-native";
import { BLUE, GRAY, WHITE } from "../../config/Colors";
import { Avatar, ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon1 from "react-native-vector-icons/MaterialIcons";
import { useFocusEffect } from "@react-navigation/native";
import {getToken, getUser} from "../../store/Store";
import {FindUser} from "../../api";

function IndividualScreen({ navigation }) {

  const [options, setOptions] = React.useState([
    { title: "Cập nhật thông tin", icon: <Icon name="update" size={25} color={BLUE} />, click: UpdateProfile},
    { title: "Đổi mật khẩu", icon: <Icon1 name="password" size={25} color={BLUE} />, click: ChangePassword },
  ])

  const [user, setUser] = React.useState("")

  useFocusEffect(
    React.useCallback(() => {
      getUserInformation()
    }, [])
  );


  // lay thong tin user tu store
  async function getUserInformation() {
    try {
      const tokenAccess = await getToken()
      const user = await getUser()
      const phoneNumber = user.phoneNumber
      const userInfo = await FindUser(phoneNumber, tokenAccess);
      // console.log(userInfo)
      setUser(userInfo.data)
    } catch (error) {
      console.log(error)
    }
  }

  // chuyen den man hinh doi mat khau
  function ChangePassword() {
    navigation.push("ChangePasswordScreenAfterLogin")
  }

  function UpdateProfile() {
    navigation.push("UpdateProfileScreen")
  }

  return (
    <View style={styles.container}>
      <ListItem
        onPress={() => { navigation.push("Personal") }}
        style={{
          width: "100%",
        }}
      >
        {
          user?.profilePicture ?
            <Avatar
              size={60}
              rounded
              source={{ uri: user.profilePicture }}
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
            {user.username}
          </ListItem.Title>
          <ListItem.Subtitle style={{ color: "gray" }}>
            Xem trang cá nhân
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron color="black" />
      </ListItem>
      {
        options.map((option, index) => {
          return (
            <ListItem
              onPress={() => { option?.click() }}
              key={index}
              style={{
                width: "100%",
                borderTopWidth: 0.2,
                borderTopColor: "#cccccc"
              }}
            >
              {option.icon}
              <ListItem.Content>
                <ListItem.Title>{option.title}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          )
        })
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GRAY,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

export default IndividualScreen;
