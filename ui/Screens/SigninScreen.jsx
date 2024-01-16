import React, { useState } from 'react';
import { Button, TextInput, View, Alert, StyleSheet, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function SigninScreen({ navigation }) {
    const { setIsLoggedIn, setIsAdmin, setLoggedUser } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async () => {
        try {
            if (!email || !password) {
                Alert.alert('Error', 'Email and password are required');
                return;
            }

            const user = {
                emailId: email,
                password: password,
            };

            const response = await axios.post(
                'http://10.0.2.2:3000/authenticate',
                user
            );
            const token = response.data.token;

            const userEmail = 'him@gmail.com';
            if (email.toLowerCase() === userEmail.toLowerCase()) {
                setIsAdmin(true);
            }

            setIsLoggedIn(true);
            setLoggedUser(user);
            navigation.navigate('Home');
        } catch (error) {
            console.error(error.response);
            Alert.alert('Error', 'Invalid credentials. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Sign In" onPress={handleSignIn} style={styles.button} />
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.link}>New User, Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    button: {
        marginBottom: 16,
    },
    link: {
        color: 'blue',
        textAlign: 'center',
        marginTop: 10
    },
});

export default SigninScreen;