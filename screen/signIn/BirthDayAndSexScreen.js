import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Button, CheckBox, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from "@react-native-community/datetimepicker";
import { BLUE, GRAY } from '../colors/Colors';

function BirthDayAndSexScreen({ navigation, route }) {

    let profile = route.params.profile
    // console.log(profile)
    const [gender, setGender] = useState(0)
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false)
    const [mode, setMode] = useState('date')
    const [typeSex, setTypeSex] = React.useState([
        {
            title: "Nữ",
            icon: <Icon name='female' color={"pink"} size={25} onPress={() => { setGender(0) }} />,
            value: 0
        },
        {
            title: "Nam",
            icon: <Icon name='male' color={BLUE} size={25} onPress={() => { setGender(1) }} />,
            value: 1
        },
        {
            title: "Khác",
            icon: <Icon name='male-female' color={"yellow"} size={25} onPress={() => { setGender(2) }} />,
            value: 2
        }
    ])

    const onChange = (e, selectedDate) => {
        setShow(false)
        setDate(selectedDate);
    };

    const showMode = (modeToShow) => {
        setShow(true)
        setMode(modeToShow)
    }

    const updateProfile = () => {
        const newProfile = {
            ...profile,
            gender: (gender === 0) ? "FEMALE" : (gender === 1) ? "MALE" : "OTHER",
            birth_day: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
        }
        return newProfile
    }

    return (
        <View style={styles.container}>
            <View style={{ width: "100%", padding: 12, backgroundColor: GRAY }}>
                <Text>Hãy chọn ngày sinh và giới tính của bạn</Text>
            </View>
            <View style={{ width: "100%", padding: 10, borderBottomWidth: 10, borderBottomColor: "rgba(244, 244, 244, 1)", height: 150 }}>
                <Text style={{ fontWeight: '600', fontSize: 16 }}>Giới tính</Text>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 40 }}>
                    {
                        typeSex.map((sex, index) => {
                            return (
                                <View key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <CheckBox title={sex.title} checked={gender === sex.value ? true : false} size={18} onPress={() => { setGender(sex.value) }} />
                                        {sex.icon}
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
            <View style={{ width: "100%", padding: 10, height: 200 }}>
                <Text style={{ fontWeight: '600', fontSize: 16 }}>Ngày sinh</Text>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 40 }}>
                    <Text style={{ fontWeight: 'bold' }}>Ngày: </Text>
                    <Text>{date.getDate()}</Text>
                    <Text style={{ fontWeight: 'bold' }}>Tháng: </Text>
                    <Text>{date.getMonth() + 1}</Text>
                    <Text style={{ fontWeight: 'bold' }}>Năm: </Text>
                    <Text>{date.getFullYear()}</Text>
                </View>
                <Button
                    title="Chọn ngày sinh"
                    disabled={false}
                    containerStyle={{
                        width: 200,
                        height: 45,
                        marginTop: 20
                    }}
                    buttonStyle={{
                        borderRadius: 5,
                        backgroundColor: BLUE
                    }}
                    onPress={() => { showMode("date") }}
                />
                {
                    show &&
                    <DateTimePicker
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        onChange={onChange}
                    />
                }
            </View>
            <View style={{ alignSelf: 'flex-end' }}>
                <Button
                    title={'Tiếp tục'}
                    containerStyle={{
                        width: 100,
                        marginHorizontal: 20,
                        marginVertical: 10,
                    }}
                    buttonStyle={{
                        backgroundColor: BLUE
                    }}
                    onPress={() => {
                        const newProfile = updateProfile()
                        navigation.push("AvatarScreen", { profile: newProfile })
                    }}
                />
            </View>
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

export default BirthDayAndSexScreen