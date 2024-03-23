import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { BLUE, GRAY, WHITE } from "../colors/Colors";
import shield from "../imagess/shield.png";
import lock from "../imagess/lock.png";
import data from "../imagess/data.png";
import backup from "../imagess/backup.png";
import notifi from "../imagess/notifi.png";
import mess from "../imagess/mess.png";
import call from "../imagess/call.png";
import clock from "../imagess/clock.png";
import phonebook from "../imagess/phonebook.png";
import paint from "../imagess/paint.png";
import exclamation from "../imagess/exclamation.png";
import question from "../imagess/question.png";
import tran from "../imagess/transfer.png";
import logout from "../imagess/logout.png";
import { ScrollView } from "react-native-virtualized-view";

function SettingScreen({ navigation }) {

  const [options, setOptions] = React.useState([
    { title: "Tài khoản và Bảo mật", image: shield },
    { title: "Quyển riêng tư", image: lock },
    { title: "Dung lượng và Dữ liệu", image: data },
    { title: "Sao lưu và Khôi phục", image: backup },
    { title: "Thông báo", image: notifi },
    { title: "Tin nhắn", image: mess },
    { title: "Cuộc gọi", image: call },
    { title: "Nhật ký", image: clock },
    { title: "Danh bạ", image: phonebook },
    { title: "Giao diện và Ngôn ngữ", image: paint },
    { title: "Thông tin về Zalo", image: exclamation },
    { title: "Liên hệ hỗ trợ", image: question },
    { title: "Chuyển tài khoản", image: tran },
  ])

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
      >
        {
          options.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  height: 60,
                  width: "100%",
                  backgroundColor: WHITE,
                  alignItems: "center",
                  flexDirection: "row",
                  borderBottomWidth: 0.2,
                }}
              >
                <View>
                  <Image
                    source={item.image}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 50,
                      marginLeft: 30,
                    }}
                  />
                </View>
                <View style={{ flexDirection: "column" }}>
                  <Text style={{ fontSize: 15, marginLeft: 10 }}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            )
          })
        }
        <TouchableOpacity
          style={{
            height: 50,
            width: "100%",
            backgroundColor: WHITE,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            borderBottomWidth: 0.1,
          }}
        >
          <View>
            <Image
              source={logout}
              style={{
                width: 30,
                height: 30,
                borderRadius: 10,
              }}
            />
          </View>
          <View>
            <Text style={{ fontSize: 16, marginLeft: 10, fontWeight: "600" }}>Đăng xuất</Text>
          </View>
        </TouchableOpacity>
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
