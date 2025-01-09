import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import useStore from '@/store/zustand';
import { router } from 'expo-router';

const profile = () => {
    const { userData, setUserData } = useStore();
    const logout = async () => {
        try {
            setUserData(null)
            router.replace('/')
        } catch (e: any) {
            console.error(e);
        }
    };

    return (
        <View style={styles.container}>
            <Text>Welcome back {userData?.name} </Text>
            <Button title=" Sign Out" onPress={logout} />
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