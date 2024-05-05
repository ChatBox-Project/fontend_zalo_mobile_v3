import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

function TabItem({ title, tab, setTab, count, id }) {
    return (
        <TouchableOpacity
            onPress={() => { setTab(id) }}
            style={{
                borderWidth: 1,
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 20,
                marginLeft: 15,
                borderColor: "#dfe6e9",
                backgroundColor: tab === id ? "#dfe6e9" : "white",
            }}>
            <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                <Text style={{ color: tab === id ? "black" : "gray", fontWeight: tab === id ? "500" : "normal" }}>{title}</Text>
                {
                    count ?
                        <Text style={{ color: tab === id ? "black" : "gray", marginLeft: 5 }}>{count}</Text>
                        : <></>
                }
            </View>
        </TouchableOpacity>
    )
}

export default TabItem