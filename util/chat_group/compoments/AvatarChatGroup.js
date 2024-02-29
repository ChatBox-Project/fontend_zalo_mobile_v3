import React from 'react'
import { View } from 'react-native'
import AvatarSingle from './AvatarSingle'

function AvatarChatGroup({ images }) {
    return (
        <View style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', marginHorizontal: 12, marginVertical: 12, position: 'relative' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 8, zIndex: 1 }}>
                <AvatarSingle image={1} />
                <AvatarSingle image={1} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 5 }}>
                <AvatarSingle image={1} />
                <AvatarSingle image={1} />
            </View>
        </View>
    )
}

export default AvatarChatGroup