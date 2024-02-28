import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native';
import { BLUE } from '../colors/Colors';

function TabStatusFriends() {
    return (
        <View style={{ justifyContent: 'flex-start', alignItems: 'center', height: 450 }}>
            <Text style={{ fontWeight: 'bold', marginTop: 80 }}>Cho Phép hiển thị trạng thái truy cập</Text>
            <Text style={{ color: "gray" }}>Bạn cũng có thể thấy bạn bè truy cập. Bạn bè cũng</Text>
            <Text style={{ color: "gray" }}>xem được trạng thái truy cập của bạn</Text>
            <TouchableOpacity style={{ paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, backgroundColor: "#e5f3f5", marginTop: 15 }}>
                <Text style={{ fontWeight: '600', color: "#3498db" }}>CHO PHÉP</Text>
            </TouchableOpacity>
        </View>
    );
}

export default TabStatusFriends