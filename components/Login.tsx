import { useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import useStore from "@/store/zustand";
import { router } from "expo-router";

interface loginProps {
    setLoading: (value: boolean) => void;
    setShowSignUp: () => any;
    setShowSocial: () => any;
}
const Login: React.FC<loginProps> = ({
    setLoading,
    setShowSignUp = () => { },
    setShowSocial = () => { }
}) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const { setUserData } = useStore();

    const handleLogin = async () => {
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("User signed in:", userCredential.user.email);
            const userData = {
                id: userCredential.user.uid,
                name: userCredential.user.displayName || "Pransu Pathak",
                email: userCredential.user.email
            }
            setUserData(userData);
            router.push("/profile")
        } catch (error: any) {
            console.error("Error signing in:", error.message);
        } finally {
            setLoading(false)
        }
    };


    return (
        <View>
            <TextInput
                placeholder="Email"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                placeholder="Password"
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText} >Log In</Text>
            </TouchableOpacity>
            <View style={[styles.flexRowContainer, { paddingTop: 10 }]}>
                <View style={styles.divider} />
                <Text style={{ textAlign: 'center', color: '#fff' }}>or</Text>
                <View style={styles.divider} />
            </View>
            <View style={[styles.flexRowContainer]}>
                <TouchableOpacity onPress={() => setShowSocial()}>
                    <Text style={[styles.buttonText, { color: '#2a2a2a' }]}>Other options </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowSignUp()}>
                    <Text style={[styles.buttonText, { color: '#2a2a2a' }]}>Don't have an account? </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default Login;
const styles = StyleSheet.create({
    input: {
        marginVertical: 4,
        height: 48,
        borderWidth: 1,
        borderColor: '#545454',
        borderRadius: 24,
        padding: 14,
        backgroundColor: '#ffff'
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 44,
        backgroundColor: '#000',
        borderRadius: 25,
        marginVertical: 4,
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'MontserratMedium',
        paddingHorizontal: 10,
    },
    divider: {
        width: '45%',
        height: 1,
        backgroundColor: '#fff',
    },
    flexRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 10
    },
})