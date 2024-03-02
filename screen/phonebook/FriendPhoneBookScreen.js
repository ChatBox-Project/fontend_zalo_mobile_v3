import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

function FriendPhoneBookScreen({ navigation }) {

    const [search, setSearch] = React.useState("");

    const updateSearch = (search) => {
        setSearch(search);
    };

    return (
        <View style={styles.container} >
            <View style={{ width: "100%" }}>
                <Text>Loading...</Text>
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

export default FriendPhoneBookScreen