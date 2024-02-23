import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Button, CheckBox, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from "@react-native-community/datetimepicker";

function BirthDayAndSexScreen() {

    const [sex, setSex] = useState(-1)
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false)
    const [mode, setMode] = useState('date')

    const onChange = (e, selectedDate) => {
        setShow(false)
        setDate(selectedDate);
    };

    const showMode = (modeToShow) => {
        setShow(true)
        setMode(modeToShow)
    }


    return (
        <View style={styles.container}>
            <View style={{ width: "100%", padding: 12, backgroundColor: "rgba(244, 244, 244, 1)" }}>
                <Text>Hãy chọn ngày sinh và giới tính của bạn</Text>
            </View>
            <View style={{ width: "100%", padding: 10, borderBottomWidth: 5, borderBottomColor: "rgba(244, 244, 244, 1)", height: 230 }}>
                <Text style={{ fontWeight: '600', fontSize: 16 }}>Giới tính</Text>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 40 }}>
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <CheckBox checked={sex === 0 ? true : false} size={32} onPress={() => { setSex(0) }} />
                            <Icon name='female' color={"pink"} size={70} onPress={() => { setSex(0) }} />
                        </View>
                        <Text style={{ fontWeight: '500', fontSize: 18 }}>Nữ</Text>
                    </View>
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <CheckBox checked={sex === 1 ? true : false} size={32} onPress={() => { setSex(1) }} />
                            <Icon name='male' color={"#007bff"} size={70} onPress={() => { setSex(1) }} />
                        </View>
                        <Text style={{ fontWeight: '500', fontSize: 18 }}>Nam</Text>
                    </View>
                </View>
            </View>
            <View style={{ width: "100%", padding: 10, height: 230 }}>
                <Text style={{ fontWeight: '600', fontSize: 16 }}>Ngày sinh</Text>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 40 }}>
                    <Text>{`Ngày:  ${date.getDate()}`}</Text>
                    <Text>{`Tháng:  ${date.getMonth() + 1}`}</Text>
                    <Text>{`Năm: ${date.getFullYear()}`}</Text>
                </View>
                <Button
                    title="Chọn ngày sinh"
                    disabled={false}
                    buttonStyle={{
                        borderRadius: 5,
                    }}
                    containerStyle={{
                        width: 200,
                        height: 45,
                        marginTop: 20
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