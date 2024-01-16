import React from 'react';
import { Button, View, StyleSheet, Text } from 'react-native';
import { useAuth } from '../context/AuthContext';

function HomeScreen({ navigation }) {
    const { isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin } = useAuth();

    const handleUsersPress = () => {
        navigation.navigate('Users');
    };

    const handleSignOut = () => {
        setIsLoggedIn(false);
        setIsAdmin(false);
    };

    return (
        <View style={styles.container}>
            {isLoggedIn ? (
                <>
                    <View style={styles.buttonContainer}>
                        <Button title="Users" onPress={handleUsersPress} style={styles.button} />
                        <View style={styles.buttonGap} />
                        <Button title="Sign Out" onPress={handleSignOut} style={styles.button} />
                    </View>
                </>
            ) : (
                <>
                    <Text style={styles.welcomeText}>Welcome to Mobile App</Text>
                    <View style={styles.buttonContainer}>
                        <Button title="Sign In" onPress={() => navigation.navigate('Signin')} style={styles.button} />
                        <View style={styles.buttonGap} />
                        <Button title="Sign Up" onPress={() => navigation.navigate('Signup')} style={styles.button} />
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color:'black'
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    buttonGap: {
        width: 20,
    },
    button: {
        flex: 1,
    },
});

export default HomeScreen;