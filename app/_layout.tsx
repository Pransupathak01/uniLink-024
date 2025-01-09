import { useEffect, useState } from 'react';
import { View, ActivityIndicator, StatusBar, useColorScheme } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useFonts } from 'expo-font';
import useStore from '@/store/zustand';
import { auth } from "@/firebase";


export default function RootLayout() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<null>(null);
  const colorScheme = useColorScheme();
  const router = useRouter();
  const segments: string[] = useSegments();

  const { userEmail } = useStore();

  const [fontsLoaded] = useFonts({
    Montserrat: require('@/assets/fonts/Montserrat-Regular.ttf'),
    MontserratMedium: require('@/assets/fonts/Montserrat-Medium.ttf'),
    MontserratSemiBold: require('@/assets/fonts/Montserrat-SemiBold.ttf'),
    MontserratBold: require('@/assets/fonts/Montserrat-Bold.ttf'),
  });

  // const handleAuthStateChanged = (authUser: any | null) => {
  //   console.log('Auth state changed:', authUser); 
  //   setUser(authUser);
  //   //setUser(authUser || userEmail);
  //   if (initializing) setInitializing(false);
  // };

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(handleAuthStateChanged);
  //   return () => unsubscribe();
  // }, []);

  // useEffect(() => {
  //   if (initializing || !fontsLoaded) return;

  //   const inAuthGroup = segments[0] === '(auth)';
  //   if (user && !inAuthGroup) {
  //     router.replace('/(auth)/profile');
  //   } else if (!user && inAuthGroup) {
  //     router.replace('/');
  //   }
  // }, [user, initializing, fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={'#FC6C85'} />
      </View>
    );
  }
  return (
    <>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent={false}
      />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}



