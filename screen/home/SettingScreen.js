import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
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

function SettingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1, backgroundColor: GRAY }}>
        <TouchableOpacity
          style={{
            height: 60,
            width: 420,
            backgroundColor: WHITE,
            alignItems: "center",
            flexDirection: "row",
            borderBottomWidth: 0.2,
          }}
        >
          <View>
            <Image
              source={shield}
              style={{
                width: 30,
                height: 30,
                borderRadius: 50,
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
            height: 60,
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
                borderRadius: 50,
                marginLeft: 30,
              }}
            />
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 15, marginLeft: 10 }}>Quyền riêng tư</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 60,
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
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            height: 60,
            width: 420,
            backgroundColor: WHITE,
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <View>
            <Image
              source={backup}
              style={{
                width: 30,
                height: 30,
                marginLeft: 30,
              }}
            />
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 15, marginLeft: 10 }}>
              Sao lưu và khôi phục
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            height: 60,
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
              source={notifi}
              style={{
                width: 30,
                height: 30,
                marginLeft: 30,
              }}
            />
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 15, marginLeft: 10 }}>Thông Báo</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            height: 60,
            width: 420,
            backgroundColor: WHITE,
            alignItems: "center",
            flexDirection: "row",
            borderBottomWidth: 0.2,
          }}
        >
          <View>
            <Image
              source={mess}
              style={{
                width: 30,
                height: 30,
                marginLeft: 30,
              }}
            />
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 15, marginLeft: 10 }}>Tin Nhắn</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            height: 60,
            width: 420,
            backgroundColor: WHITE,
            alignItems: "center",
            flexDirection: "row",
            borderBottomWidth: 0.2,
          }}
        >
          <View>
            <Image
              source={call}
              style={{
                width: 30,
                height: 30,
                marginLeft: 30,
              }}
            />
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 15, marginLeft: 10 }}>Cuộc Gọi</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            height: 60,
            width: 420,
            backgroundColor: WHITE,
            alignItems: "center",
            flexDirection: "row",
            borderBottomWidth: 0.2,
          }}
        >
          <View>
            <Image
              source={clock}
              style={{
                width: 30,
                height: 30,
                marginLeft: 30,
              }}
            />
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 15, marginLeft: 10 }}>Nhật Ký</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            height: 60,
            width: 420,
            backgroundColor: WHITE,
            alignItems: "center",
            flexDirection: "row",
            borderBottomWidth: 0.2,
          }}
        >
          <View>
            <Image
              source={phonebook}
              style={{
                width: 30,
                height: 30,
                marginLeft: 30,
              }}
            />
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 15, marginLeft: 10 }}>Danh Bạ</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            height: 60,
            width: 420,
            backgroundColor: WHITE,
            alignItems: "center",
            flexDirection: "row",
            borderBottomWidth: 0.2,
          }}
        >
          <View>
            <Image
              source={paint}
              style={{
                width: 30,
                height: 30,
                marginLeft: 30,
              }}
            />
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 15, marginLeft: 10 }}>
              Giao diện và ngôn ngữ
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            height: 60,
            width: 420,
            backgroundColor: WHITE,
            alignItems: "center",
            flexDirection: "row",
            borderBottomWidth: 0.2,
            marginTop: 10,
          }}
        >
          <View>
            <Image
              source={exclamation}
              style={{
                width: 30,
                height: 30,
                borderRadius: 50,
                marginLeft: 30,
              }}
            />
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 15, marginLeft: 10 }}>
              Thông tin về zalo
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 60,
            width: 420,
            backgroundColor: WHITE,
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <View>
            <Image
              source={question}
              style={{
                width: 30,
                height: 30,
                borderRadius: 50,
                marginLeft: 30,
              }}
            />
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 15, marginLeft: 10 }}>Liên hệ hỗ trợ</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            height: 60,
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
              source={tran}
              style={{
                width: 30,
                height: 30,
                marginLeft: 30,
              }}
            />
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 15, marginLeft: 10 }}>
              Chuyển tài khoản
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            height: 60,
            width: 420,
            backgroundColor: WHITE,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{
              height: 40,
              width: 350,
              backgroundColor: GRAY,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
              borderRadius: 20,
            }}
          >
            <View>
              <Image
                source={logout}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </View>
            <View>
              <Text
                style={{
                  fontSize: 15,
                  marginLeft: 10,
                  fontWeight: "bold",
                }}
              >
                Đăng Xuất
              </Text>
            </View>
          </TouchableOpacity>
        </View>
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
