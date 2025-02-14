import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import useStore from '@/store/zustand';
import { router } from 'expo-router';
import { useNotification } from "@/context/NotificationContext";

const profile = () => {
    const { userData, setUserData } = useStore();
    const { expoPushToken, notification, error } = useNotification();
    if (error) {
        return <Text>Error:{error.message}</Text>
    }
    console.log("Latest Notification:", JSON.stringify(notification, null, 2));
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
            <Text>Your push token:</Text>
            <Text>{expoPushToken}</Text>
            <Text>Latest notification:</Text>
            <Text>{notification?.request.content.subtitle}</Text>
            <Text>
                {JSON.stringify(notification?.request.content.data, null, 2)}
            </Text>
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