import React, { useState } from 'react';
import { Button, TextInput, View, Alert, StyleSheet, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function SignupScreen({ navigation }) {
    const { setIsLoggedIn, setIsAdmin, setLoggedUser } = useAuth();
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async () => {
        try {
            const newUser = {
                name: name,
                age: age,
                emailId: email,
                password: password,
            };

            const response = await axios.post('https://app-react-native.onrender.com/users', newUser);

            Alert.alert('Successfully Signed Up');

            const userEmail = 'him@gmail.com';
            if (email.toLowerCase() === userEmail.toLowerCase()) {
                setIsAdmin(true);
            }

            setIsLoggedIn(true);
            setLoggedUser(newUser);
            navigation.navigate('Home');
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor='black'
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Age"
                placeholderTextColor='black'
                value={age}
                onChangeText={setAge}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor='black'
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor='black'
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Sign Up" onPress={handleSignUp} style={styles.button} />
            <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
                <Text style={styles.link}>Already a User, Sign In</Text>
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
        color:'black'
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

export default SignupScreen;