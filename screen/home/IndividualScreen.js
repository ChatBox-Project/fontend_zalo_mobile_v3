import React from "react";
import { Image, StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { BLUE, GRAY, WHITE } from "../colors/Colors";
import abc from "../imagess/zalo_icon.png";
import music from "../imagess/music.png";
import xyz from "../imagess/icons8-wallet-64.png";
import cloud from "../imagess/cloud.png";
import data from "../imagess/data.png";
import shield from "../imagess/shield.png";
import lock from "../imagess/lock.png";
import { Avatar } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon1 from "react-native-vector-icons/MaterialIcons";

function IndividualScreen({ navigation }) {

  const [options, setOptions] = React.useState([
    { title: "Cập nhật thông tin", icon: <Icon name="update" size={30} color={BLUE} /> },
    { title: "Đổi mật khẩu", icon: <Icon1 name="password" size={30} color={BLUE} /> },
  ])

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => { navigation.push("Personal") }}
        style={{
          height: 80,
          width: "100%",
          backgroundColor: WHITE,
          alignItems: "center",
          flexDirection: "row",
          marginBottom: 10,
          paddingLeft: 15
        }}
      >
        <Avatar
          size={60}
          rounded
          source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
        />
        <View style={{ marginLeft: 15 }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>Lê Văn Luyện</Text>
          <Text style={{ fontSize: 12, color: "gray" }}>Xem trang cá nhân</Text>
        </View>
      </TouchableOpacity>
      {
        options.map((option, index) => {
          return (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "100%",
                paddingHorizontal: 15,
                // borderWidth: 1,
                height: 50,
                backgroundColor: "white",
                marginBottom: 10
              }}
              key={index}
            >
              {option.icon}
              <Text style={{ marginLeft: 15, fontWeight: "600", fontSize: 14 }}>{option.title}</Text>
            </TouchableOpacity>
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
