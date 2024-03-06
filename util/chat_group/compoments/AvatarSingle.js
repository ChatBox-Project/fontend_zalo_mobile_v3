import React from 'react'
import { Image, Text, View } from 'react-native'

function AvatarSingle({ image, number }) {
    return (
        <>
            {
                image ?
                    <Image
                        style={{
                            width: 26,
                            height: 26,
                            borderWidth: 2,
                            borderRadius: 15,
                            borderColor: "white",
                        }}
                        source={{
                            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmAnV3-BfumZuxq58opLduuw5U0yEEnBPL_A&usqp=CAU',
                        }}
                    />
                    :
                    <View
                        style={{
                            width: 26,
                            height: 26,
                            borderWidth: 2,
                            borderRadius: 15,
                            borderColor: "white",
                            backgroundColor: "gray",
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <Text style={{ color: "white", fontSize: 10, fontWeight: 'bold' }} >{number}</Text>
                    </View>

            }
        </>
    )
}

export default AvatarSingle