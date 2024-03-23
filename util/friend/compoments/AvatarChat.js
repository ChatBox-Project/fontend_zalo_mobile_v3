import React from 'react'
import { Image, View } from 'react-native';
import Icon2 from 'react-native-vector-icons/FontAwesome';

function AvatarChat({ image }) {
    return (
        <>
            {
                image
                    ?
                    <Image
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 30,
                        }}
                        source={{
                            uri: 'https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-gai-xinh.jpg',
                        }}
                    />
                    :
                    <View style={{ width: 50, height: 50, borderRadius: 30, backgroundColor: "#cccccc", justifyContent: 'center', alignItems: 'center' }}>
                        <Icon2 name='user' size={22} color={"white"} />
                    </View>
            }
        </>
    )
}

export default AvatarChat;