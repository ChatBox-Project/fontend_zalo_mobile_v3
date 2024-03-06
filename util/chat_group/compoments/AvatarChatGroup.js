import React from 'react'
import { View } from 'react-native'
import AvatarSingle from './AvatarSingle'

function AvatarChatGroup({ images }) {
    return (
        <View style={{ width: 51, height: 51, justifyContent: 'center', alignItems: 'center', marginHorizontal: 10, marginVertical: 10, position: 'relative' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 2, zIndex: 2 }}>
                <View style={{ right: -2, zIndex: 1 }}>
                    <AvatarSingle image={1} />
                </View>
                <View style={{ left: -2 }}>
                    <AvatarSingle image={1} />
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 1 }}>
                <View style={{ right: -2, zIndex: 1 }}>
                    <AvatarSingle image={1} />
                </View>
                <View style={{ left: -2 }}>
                    <AvatarSingle number={2} />
                </View>
            </View>
        </View>
    )
}

export default AvatarChatGroup