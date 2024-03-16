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
      <View
        style={{ paddingBottom: 100 }}
      >
        <Image
          source={hoboi}
          style={{ width: "100%", height: 200 }}
        />
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: -140,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              borderWidth: 3,
              borderColor: "#ffffff",
              width: 100,
              height: 100,
              borderRadius: 100 / 2,
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden"
            }}
          >
            <Image
              source={ZaloImage}
              style={{ width: 100, height: 100 }}
            />
          </View>
          <Text style={{ fontSize: 20, fontWeight: "600", marginTop: 15 }}>Lê Văn Luyện</Text>
        </View>
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
      <View style={{ height: 70 }}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        // style={{ borderWidth: 1 }}
        >
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
      </View>
      <View style={{ flexDirection: "column", alignItems: "center" }}>
        <Image source={home} style={{ height: 150, width: 150 }} />
        <Text style={{ fontSize: 16, fontWeight: "600" }}>Hôm nay bạn có gì vui?</Text>
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
