import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { BLUE, GRAY, WHITE } from "../colors/Colors";
import { ScrollView } from "react-native-virtualized-view";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ListItem } from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';

function SettingScreen({ navigation }) {

  const [options, setOptions] = React.useState([
    { title: "Đăng xuất", icon: <Icon name="logout" size={30} color={"red"} />, click: logoutUser }
  ])

  function logoutUser() {

    const removeToken = async () => {
      try {
        await AsyncStorage.removeItem("tokenRegister");
        alert("Đăng xuất thành công")
        navigation.push("LoginAndSignIn")
      } catch (e) {
        alert("Đăng xuất thất bại")
      }
    }

    removeToken()
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
