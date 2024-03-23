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

function IndividualScreen({ navigation }) {

  const [options1, setOptions1] = React.useState([
    { title1: "Nhạc chờ Zalo", title2: "Đăng kí nhạc chờ thể hiện cá tính", image: music },
    { title1: "Ví QR", title2: "Lưu trữ và xuất trình các mã QR quan trọng", image: xyz },
    { title1: "Cloud của tôi", title2: "Lưu trữ các tin nhắn quan trọng", image: cloud },
    { title1: "Dung lượng và dữ liệu", title2: "Quản lý dữ liệu Zalo của bạn", image: data },
  ])

  const [options2, setOptions2] = React.useState([
    { title: "Tài Khoản và bảo mật", image: shield },
    { title: "Quyền riêng tư", image: lock },
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
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%"
          }}
        >
          <Image
            source={abc}
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              marginLeft: 20,
            }}
          />
          <View style={{ marginLeft: 15 }}>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>Lê Văn Luyện </Text>
            <Text style={{ fontSize: 12, color: "gray" }}>Xem trang cá nhân</Text>
          </View>
        </View>
      </TouchableOpacity>
      {
        options1.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={{
                height: 80,
                width: "100%",
                backgroundColor: WHITE,
                alignItems: "center",
                flexDirection: "row",
                borderBottomWidth: 0.2
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  width: "100%"
                }}
              >
                <Image
                  source={item.image}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 50,
                    marginLeft: 20,
                  }}
                />
                <View style={{ marginLeft: 15 }}>
                  <Text style={{ fontSize: 16, fontWeight: "600" }}>{item.title1}</Text>
                  <Text style={{ fontSize: 14, color: "gray" }}>{item.title2}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )
        })
      }
      {
        options2.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={{
                height: 60,
                width: "100%",
                backgroundColor: WHITE,
                alignItems: "center",
                flexDirection: "row",
                borderBottomWidth: 0.2
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  width: "100%"
                }}
              >
                <Image
                  source={item.image}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 50,
                    marginLeft: 20,
                  }}
                />
                <View style={{ marginLeft: 15 }}>
                  <Text style={{ fontSize: 15, fontWeight: "600" }}>{item.title}</Text>
                </View>
              </View>
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
