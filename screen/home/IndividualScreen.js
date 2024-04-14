import React from "react";
import { Image, StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { BLUE, GRAY, WHITE } from "../colors/Colors";
import { Avatar, ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon1 from "react-native-vector-icons/MaterialIcons";
import { useFocusEffect } from "@react-navigation/native";
import { getTokenAccess } from "../../store/MyStore";
import { GetAccountInformation, GetUserInformation } from "../../api/SignInAPI";

function IndividualScreen({ navigation }) {

  const [options, setOptions] = React.useState([
    { title: "Cập nhật thông tin", icon: <Icon name="update" size={25} color={BLUE} /> },
    { title: "Đổi mật khẩu", icon: <Icon1 name="password" size={25} color={BLUE} />, click: ChangePassword },
  ])

  const [user, setUser] = React.useState("")

  useFocusEffect(
    React.useCallback(() => {
      getUserInformation()
    }, [])
  );


  async function getUserInformation() {
    try {
      const tokenAccess = await getTokenAccess()
      const reqUserInformation = await GetUserInformation(tokenAccess)
      const userInformation = reqUserInformation.data.metadata.user
      setUser(userInformation)
    } catch (error) {
      console.log(error)
      showMessage({
        message: "Thông Báo !",
        description: error.response.data.message,
        type: "danger"
      })
    }
  }

  async function ChangePassword() {
    try {
      const tokenAccess = await getTokenAccess()
      const reqAccountInformation = await GetAccountInformation(tokenAccess)
      const phoneNumber = reqAccountInformation.data.metadata.account.phoneNumber
      navigation.push("ChangePasswordScreenAfterLogin", { phoneNumber })
    } catch (error) {
      console.log(error)
      showMessage({
        message: "Thông Báo !",
        description: error.response.data.message,
        type: "danger"
      })
    }

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
          user.avatarUrl ?
            <Avatar
              size={60}
              rounded
              source={{ uri: user?.avatarUrl }}
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
            {user?.name}
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
