import React from "react";
import { Image, StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { BLUE, GRAY, WHITE } from "../colors/Colors";
import { Avatar, ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon1 from "react-native-vector-icons/MaterialIcons";
import { useFocusEffect } from "@react-navigation/native";
import { getUser } from "../../store/MyStore";

function IndividualScreen({ navigation }) {

  const [options, setOptions] = React.useState([
    { title: "Cập nhật thông tin", icon: <Icon name="update" size={25} color={BLUE} /> },
    { title: "Đổi mật khẩu", icon: <Icon1 name="password" size={25} color={BLUE} /> },
  ])

  const [user, setUser] = React.useState("")

  useFocusEffect(
    React.useCallback(() => {
      getUser()
        .then(user => {
          // console.log(user)
          setUser(user)
        })
    }, [])
  );


  return (
    <View style={styles.container}>
      <ListItem
        onPress={() => { navigation.push("Personal") }}
        style={{
          width: "100%",
        }}
      >
        <Avatar
          size={60}
          rounded
          source={{ uri: user.avatarUrl }}
        />
        <ListItem.Content>
          <ListItem.Title style={{ color: "black", fontWeight: "bold" }}>
            {user.firstName}
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
