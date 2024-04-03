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
import { Avatar } from "react-native-elements";

function PersonalScreen({ navigation }) {

  const [options, setOptions] = React.useState([
    { title: "Nhập từ Facebook", image: impo },
    { title: "Ảnh của tôi", image: photo },
    { title: "Kho khoảnh khắc", image: kho },
    { title: "Kỉ niệm năm xưa", image: clock },
    { title: "Video của tôi", image: camera },
  ])


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
          <Avatar
            size={120}
            rounded
            source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
          />
          <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 15 }}>Lê Văn Luyện</Text>
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
        >
          <View style={{ flexDirection: "row", marginTop: 15 }}>
            {
              options.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      backgroundColor: WHITE,
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                      marginHorizontal: 10,
                      paddingHorizontal: 10,
                      marginTop: 10,
                      height: 40,
                      borderRadius: 10,
                    }}
                  >
                    <Image source={item.image} style={{ width: 20, height: 20 }} />
                    <Text style={{ marginLeft: 10, fontWeight: "500" }}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </ScrollView>
      </View>
      <View style={{ flexDirection: "column", alignItems: "center", marginTop: 100 }}>
        <Image source={home} style={{ height: 120, width: 120 }} />
        <Text style={{ fontSize: 14 }}>Hôm nay bạn có gì vui...?</Text>
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
