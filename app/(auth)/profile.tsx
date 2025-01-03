import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { router } from 'expo-router';
const profile = () => {
    // const user = auth().currentUser;
    // const handleSignOut = () =>{
    //     if(user){
    //         auth().signOut()
    //     }
    // }
    return (
        <View style={styles.container}>
            <Text>Welcome back </Text>
            <Button title=" Sign Out" />

        </View>
    )
}

export default profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
})