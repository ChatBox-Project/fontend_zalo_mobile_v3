import React from "react";
import {
  StyleSheet,
  View,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ListItem } from "react-native-elements";
import { showMessage } from "react-native-flash-message";
import { Logout } from "../../api/";

function SettingScreen({ navigation }) {

  const [options, setOptions] = React.useState([
    { title: "Đăng xuất", icon: <Icon name="logout" size={30} color={"red"} />, click: logoutUser }
  ])

  async function logoutUser() {
    try {
      await Logout()
      showMessage({
        message: "Đăng xuất thành công !",
        type: "success",
      });
      navigation.push("LoginAndSignIn")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
      >
        {
          options.map((option, index) => {
            return (
              <ListItem
                onPress={() => { option.click() }}
                key={index}
                style={{
                  width: "100%",
                  borderBottomWidth: 0.2,
                  borderBottomColor: "#cccccc"
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

export default SettingScreen;
