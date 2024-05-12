import React from 'react'
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {getToken, getUser} from "../store/Store";
import getDetailConservation from "../api/conversation/get-detail-conservation";
import changeGroupName from "../api/conversation/change-group-name";
import {showMessage} from "react-native-flash-message";

function RenameGroup({navigation, route}) {

    const [groupName, setGroupName] = React.useState("")
    const [mainUser, setMainUser] = React.useState(null)
    const [detailConversation, setDetailConversation] = React.useState({})

    console.log(route.params)

    React.useEffect(() => {
        const getMainUser = async () => {
            try {
                const user = await getUser();
                setMainUser(user)
            } catch (error) {
                console.log(error)
            }
        }
        // lay thong tin user tu store
        getMainUser();
    }, [])

    React.useLayoutEffect(() => {
        async function loadDetailConversation() {
            try {
                const token = await getToken()
                const detailConservation1 = await getDetailConservation(route.params.conservationId, token)
                setDetailConversation(detailConservation1.data)
                setGroupName(detailConservation1.data.label)
                navigation.setOptions({
                    title: detailConservation1.data.label
                })

            } catch (e) {
                console.log(e)
            }

        }
        // lay thong tin cuoc tro chuyen
        loadDetailConversation()
    }, [])

    async function updateGroupName() {
        try {
            const token = await getToken()
            await changeGroupName(route.params.conservationId, groupName, token)
            showMessage({
                message: "Thông báo",
                description: "Cập nhật tên nhóm thành công",
                type: "success",
            })

            // resset lai man hinh cuoc tro chuyen
            route.params.setReload(preVal => {return !preVal})
            navigation.goBack()
        }catch (e) {
            console.log(e)
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                value={groupName}
                onChangeText={setGroupName}
                placeholder='Tên nhóm...'
                style={{
                    backgroundColor: "white",
                    width: "95%",
                    borderRadius: 5,
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderWidth: 1,
                    borderColor: "#cccccc",
                    marginVertical: 10
                }}
            />
            <TouchableOpacity
                onPress={() => {
                    if(groupName === "") {
                        showMessage({
                            message: "Thông báo",
                            description: "Tên nhóm không được để trống",
                            type: "danger",
                        })
                        return
                    }
                    updateGroupName()
                }}
                style={{
                    backgroundColor: "#1e90ff",
                    width: "95%",
                    borderRadius: 5,
                    padding: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    marginVertical: 10
                }}
            >
                <Text style={{fontWeight: "bold", color: "white"}}>Cập nhật</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
});

export default RenameGroup