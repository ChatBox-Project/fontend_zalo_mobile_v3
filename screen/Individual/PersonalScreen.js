import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { BLUE, GRAY, WHITE } from "../colors/Colors";
import ZaloImage from "../imagess/zalo_icon.png";
import hoboi from "../imagess/hoboi.jpg";
import pen from "../imagess/pen.png";
import impo from "../imagess/import.png";
import photo from "../imagess/photo.png";
import kho from "../imagess/kho.png";
import clock from "../imagess/clock.png";
import camera from "../imagess/camera.png";
import home from "../imagess/home.png";

function PersonalScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View style={{ width: 420, height: 200, backgroundColor: BLUE }}>
          <Image
            source={hoboi}
            style={{ width: 420, height: 200, backgroundColor: BLUE }}
          ></Image>
          <Image
            source={ZaloImage}
            style={{
              width: 130,
              height: 130,
              marginTop: 150,
              marginLeft: 150,
              position: "absolute",
              borderRadius: 50,
              borderColor: WHITE,
              borderStartWidth: 130,
            }}
          ></Image>
        </View>
      </TouchableOpacity>
      <View
        style={{
          marginTop: 100,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Lê Văn Luyện</Text>
      </View>
      <TouchableOpacity
        style={{
          marginTop: 10,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image source={pen} style={{ width: 20, height: 20 }}></Image>
        <Text style={{ color: BLUE, marginLeft: 5 }}>
          Cập nhật giới thiệu bản thân
        </Text>
      </TouchableOpacity>
      <ScrollView horizontal={true}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <TouchableOpacity
            style={{
              width: 180,
              height: 40,
              backgroundColor: WHITE,
              marginLeft: 10,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              borderRadius: 10,
            }}
          >
            <Image source={impo} style={{ width: 20, height: 20 }} />
            <Text style={{ marginLeft: 10, fontWeight: "500" }}>
              Nhập từ Facebook
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 150,
              height: 40,
              backgroundColor: WHITE,
              marginLeft: 10,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              borderRadius: 10,
            }}
          >
            <Image source={photo} style={{ width: 25, height: 25 }} />
            <Text style={{ marginLeft: 10, fontWeight: "500" }}>
              Ảnh của tôi
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 180,
              height: 40,
              backgroundColor: WHITE,
              marginLeft: 10,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              borderRadius: 10,
            }}
          >
            <Image source={kho} style={{ width: 25, height: 25 }} />
            <Text style={{ marginLeft: 10, fontWeight: "500" }}>
              Kho khoảnh khắc
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 150,
              height: 40,
              backgroundColor: WHITE,
              marginLeft: 10,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              borderRadius: 10,
            }}
          >
            <Image source={clock} style={{ width: 25, height: 25 }} />
            <Text style={{ marginLeft: 10, fontWeight: "500" }}>
              Kỉ niệm năm xưa
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 150,
              height: 40,
              backgroundColor: WHITE,
              marginLeft: 10,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              borderRadius: 10,
            }}
          >
            <Image source={camera} style={{ width: 25, height: 25 }} />
            <Text style={{ marginLeft: 10, fontWeight: "500" }}>
              Video của tôi
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={{ flexDirection: "column", alignItems: "center", flex: 10 }}>
        <Image source={home} style={{ height: 150, width: 150 }} />
        <Text style={{ fontSize: 20 }}>Hôm nay Bạn có gì vui?</Text>
        <Text
          style={{
            fontSize: 15,
            marginTop: 10,
            fontWeight: 200,
          }}
        >
          Đây là Nhật ký của bạn - Hãy làm đầy Nhật ký
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: 200,
          }}
        >
          với những dấu ấn cuộc đời và kỷ niệm đáng nhớ nhé!!!
        </Text>
      </View>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity
          style={{
            backgroundColor: BLUE,
            alignItems: "center",
            width: 200,
            height: 50,
            borderRadius: 30,
          }}
        >
          <Text style={{ color: WHITE, marginTop: 15, fontWeight: "bold" }}>
            Đăng lên Nhật ký
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GRAY,
  },
});

export default PersonalScreen;
