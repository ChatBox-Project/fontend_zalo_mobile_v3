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
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ListItem } from "react-native-elements";

function SettingScreen({ navigation }) {

  const [options, setOptions] = React.useState([
    { title: "Đăng xuất", icon: <Icon name="logout" size={30} color={"red"} /> }
  ])

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
      >
        {
          options.map((option, index) => {
            return (
              <ListItem
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
