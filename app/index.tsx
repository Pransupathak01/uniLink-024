import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import * as AppleAuthentication from 'expo-apple-authentication';
import { LinearGradient } from "expo-linear-gradient";
import GradientText from '@/components/GradientText';
import { useRouter } from 'expo-router';
import useStore from '@/store/zustand';
import Login from '@/components/Login';
import SignUp from '@/components/SignUp';

export default function App() {
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  const [showComponent, setShowComponent] = useState<string>("Social");

  const { setUserData } = useStore();
  const router = useRouter();

  useEffect(() => {
    GoogleSignin.configure({
      //  iosClientId: '886343330580-or55jenkoo5n3ls15jrbehneop8oq11i.apps.googleusercontent.com',
      webClientId: "886343330580-0cgn9q1pgjhfuhlg8b9h5t3fm6mb1kkf.apps.googleusercontent.com",
    });
  }, []);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const googleSignIn = async () => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      const userData = {
        id: user.data?.user.id || null,
        name: user.data?.user.name || null,
        email: user.data?.user.email || null,
      };
      setUserData(userData);
      console.log("user", user.data?.user);
      setError(null);
      if(user.data?.user){
        router.push('/profile');
      }
    } catch (e: any) {
      console.error(e);
      setError(e);
    } finally {
      setLoading(false);
    }
  };
  const appleSignIn = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      console.log("apple data", credential)
      const { fullName, email } = credential;

      console.log('Full Name:', fullName);
      console.log('Email:', email);
      if(credential){
        router.push('/profile');
      }
    } catch (error) {
      console.error("Apple login failed: ", error);
    }
  };

  const renderComponent = () => {
    switch (showComponent) {
      case "Login":
        return <Login setLoading={setLoading} setShowSignUp={() => setShowComponent("SignUp")} setShowSocial={() => setShowComponent("Social")} />;
      case "SignUp":
        return <SignUp setLoading={setLoading} setShowLogin={() => setShowComponent("Login")} setShowSocial={() => setShowComponent("Social")} />;
      default:
        return (
          <View>
            <TouchableOpacity 
            style={[styles.button, { backgroundColor: "#000" }]}
            onPress={appleSignIn}
            >
              <Image style={{ height: 24, width: 24 }} source={require("@/assets/images/apple.png")} />
              <Text style={[styles.buttonText, { color: "#fff" }]}>Continue With Apple</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#fff" }]}
              onPress={googleSignIn}
            >
              <Image style={{ height: 24, width: 24 }} source={require("@/assets/images/google.jpeg")} />
              <Text style={styles.buttonText}>Continue With Google</Text>
            </TouchableOpacity>
            <View style={[styles.flexRowContainer, { paddingTop: 16 }]}>
              <View style={styles.divider} />
              <Text style={{ textAlign: "center", color: "#fff" }}>or</Text>
              <View style={styles.divider} />
            </View>
            <View style={[styles.flexRowContainer]}>
              <TouchableOpacity onPress={() => setShowComponent("Login")}>
                <Text style={[styles.buttonText, { color: "#2a2a2a" }]}>Login </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowComponent("SignUp")}>
                <Text style={[styles.buttonText, { color: "#2a2a2a" }]}>
                  Don't have an account?{" "}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding"  >
        <View style={[styles.titleContainer, { height: keyboardVisible ? "50%" : "65%" }]}>
          <GradientText>Begin Your</GradientText>
          <GradientText fontFamily="MontserratBold">Mindful Journey</GradientText>
          <Text style={styles.text}>
            Log In Or Sign Up To Unified platform for managing all your social connections
          </Text>
        </View>

        <LinearGradient
          colors={["#FFA652", "#FC7F9C"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.bottomContainer, { height: keyboardVisible ? "50%" : "35%" }]}
        >
          {renderComponent()}

        </LinearGradient>
      </KeyboardAvoidingView>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#87CEFA"/>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  flexRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  titleContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "60%",
    width: "100%",
    padding: 20,
  },
  text: {
    fontSize: 15,
    fontFamily: "MontserratMedium",
    textAlign: "center",
    paddingVertical: 10,
    color: "#2a2a2a",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 54,
    borderRadius: 28,
    marginVertical: 6,
  },
  buttonText: {
    textAlign: "center",
    color: "#2a2a2a",
    fontFamily: "MontserratMedium",
    paddingHorizontal: 10,
    paddingTop: 4,
  },
  divider: {
    width: "45%",
    height: 1,
    backgroundColor: "#fff",
  },
  bottomContainer: {
    justifyContent: "center",
    bottom: 0,
    height: "40%",
    width: "100%",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
