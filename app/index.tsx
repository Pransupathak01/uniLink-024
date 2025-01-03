import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

export default function App() {
  const [error, setError] = useState<Error | null>(null);
  const [userInfo, setUserInfo] = useState<any | null>(null);

  useEffect(() => {
    GoogleSignin.configure({
    //  iosClientId: '886343330580-or55jenkoo5n3ls15jrbehneop8oq11i.apps.googleusercontent.com',
      webClientId: "886343330580-0cgn9q1pgjhfuhlg8b9h5t3fm6mb1kkf.apps.googleusercontent.com",
    });
  }, []);

  const signin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      setUserInfo(user);
      console.log(user);
      setError(null);
    } catch (e:any) {
      console.error(e);
      setError(e);
    }
  };

  const logout = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUserInfo(null);
    } catch (e:any) {
      console.error(e);
      setError(e);
    }
  };

  return (
    <View style={styles.container}>
      {error && <Text style={{ color: 'red' }}>{`Error: ${error.message}`}</Text>}
      {userInfo ? (
        <>
          <Text>{JSON.stringify(userInfo.user, null, 2)}</Text>
          <Button title="Logout" onPress={logout} />
        </>
      ) : (
        <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signin}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
