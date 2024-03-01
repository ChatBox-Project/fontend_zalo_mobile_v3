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

function IndividualScreen() {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, backgroundColor: GRAY }}>
        <TouchableOpacity
          style={{
            height: 80,
            width: 420,
            backgroundColor: WHITE,
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <View>
            <Image
              source={abc}
              style={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                marginLeft: 30,
              }}
            />
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 15, marginLeft: 10 }}> Lê Văn Luyện </Text>
            <Text style={{ fontSize: 15, marginLeft: 15, fontWeight: 200 }}>
              Xem trang cá nhân
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 80,
            width: 420,
            backgroundColor: WHITE,
            alignItems: "center",
            flexDirection: "row",
            marginTop: 10,
            borderBottomWidth: 0.2,
          }}
        >
          <View>
            <Image
              source={xyz}
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                marginLeft: 30,
              }}
            />
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 15, marginLeft: 10 }}> Ví QR </Text>
            <Text style={{ fontSize: 15, marginLeft: 15, fontWeight: 200 }}>
              Lưu trữ và xuất trình các mã QR quan trọng
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 80,
            width: 420,
            backgroundColor: WHITE,
            alignItems: "center",
            flexDirection: "row",
            borderBottomWidth: 0.2,
          }}
        >
          <View>
            <Image
              source={music}
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                marginLeft: 30,
              }}
            />
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 15, marginLeft: 10 }}>
              {" "}
              Nhạc Chờ Zalo{" "}
            </Text>
            <Text style={{ fontSize: 15, marginLeft: 15, fontWeight: 200 }}>
              Đăng ký nhạc chờ, thể hiện cá tính
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 80,
            width: 420,
            backgroundColor: WHITE,
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <View>
            <Image
              source={cloud}
              style={{
                width: 30,
                height: 30,
                marginLeft: 30,
              }}
            />
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 15, marginLeft: 10 }}>
              {" "}
              Cloud Của Tôi{" "}
            </Text>
            <Text style={{ fontSize: 15, marginLeft: 15, fontWeight: 200 }}>
              Lưu trữ các tin nhắn quan trọng
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 80,
            width: 420,
            backgroundColor: WHITE,
            alignItems: "center",
            flexDirection: "row",
            marginTop: 10,
          }}
        >
          <View>
            <Image
              source={data}
              style={{
                width: 30,
                height: 30,
                marginLeft: 30,
              }}
            />
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 15, marginLeft: 10 }}>
              {" "}
              Dung Lượng Và Dữ Liệu{" "}
            </Text>
            <Text style={{ fontSize: 15, marginLeft: 15, fontWeight: 200 }}>
              Quan Lí Dữ liệu zalo của bạn
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 50,
            width: 420,
            backgroundColor: WHITE,
            alignItems: "center",
            flexDirection: "row",
            marginTop: 10,
            borderBottomWidth: 0.2,
          }}
        >
          <View>
            <Image
              source={shield}
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                marginLeft: 30,
              }}
            />
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 15, marginLeft: 10 }}>
              {" "}
              Tài Khoản Và Bảo Mật{" "}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 50,
            width: 420,
            backgroundColor: WHITE,
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <View>
            <Image
              source={lock}
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                marginLeft: 30,
              }}
            />
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 15, marginLeft: 10 }}>Quyền riêng tư</Text>
          </View>
        </TouchableOpacity>
      </View>
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

export default IndividualScreen;
