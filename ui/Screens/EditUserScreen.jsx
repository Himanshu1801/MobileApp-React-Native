import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const EditUser = ({ route, navigation }) => {
    const { userId } = route.params;
    const [userData, setUserData] = useState(null);
    const [editedUser, setEditedUser] = useState({
        name: '',
        age: '',
        emailId: '',
        password: ''
    });

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`http://10.0.2.2:3000/users/${userId}`);

            if (response.status !== 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            setUserData(response.data);
            setEditedUser({
                name: response.data.name || '',
                age: response.data.age || '',
                emailId: response.data.emailId || '',
                password: response.data.password || '',
            });
        } catch (error) {
            console.error('Error fetching user data:', error.message);
        }
    };
    useEffect(() => {
        fetchUserData();
    }, [userId]);

    const handleSaveChanges = async () => {
        try {
            const response = await axios.put(`http://10.0.2.2:3000/users/${userId}`, editedUser);

            if (response.status !== 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            setUserData(response.data);
            navigation.navigate('Users');

        } catch (error) {
            console.error('Error updating user data:', error.message);
        }
    };

    return (
        <View style={styles.container}>
            {userData ? (
                <>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        style={styles.input}
                        value={editedUser.name}
                        onChangeText={(text) => setEditedUser({ ...editedUser, name: text })}
                    />

                    <Text style={styles.label}>Age</Text>
                    <TextInput
                        style={styles.input}
                        value={editedUser.age.toString()}
                        onChangeText={(text) => setEditedUser({ ...editedUser, age: text })}
                    />

                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        value={editedUser.emailId}
                        onChangeText={(text) => setEditedUser({ ...editedUser, emailId: text })}
                    />
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        value={editedUser.password}
                        onChangeText={(text) => setEditedUser({ ...editedUser, password: text })}
                    />

                    <Button title="Save Changes" onPress={handleSaveChanges} />
                </>
            ) : (
                <Text>Loading...</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
});

export default EditUser;