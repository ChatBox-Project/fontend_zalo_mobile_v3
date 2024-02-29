import React from 'react'
import { Image, View } from 'react-native'

function AvatarSingle({ image }) {
    return (
        <>
            {
                image ?
                    <Image
                        style={{ width: 20, height: 20, borderWidth: 1, borderRadius: 10, borderColor: "white", }}
                        source={{
                            uri: 'https://reactnative.dev/img/tiny_logo.png',
                        }}
                    />
                    :
                    <View style={{ width: 20, height: 20, borderWidth: 1, borderRadius: 10, borderColor: "white", backgroundColor: "gray" }}></View>

            }
        </>
    )
}

export default AvatarSingle