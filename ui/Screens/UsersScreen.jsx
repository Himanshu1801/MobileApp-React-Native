import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function UsersScreen({ navigation }) {
    const { isAdmin, loggedUser } = useAuth();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://app-react-native.onrender.com/users');

                if (response.status !== 200) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error.message);
            }
        };

        fetchData();
    }, []);

    const handleEdit = (userId) => {
        navigation.navigate('EditUser', { userId });
    };

    const handleDelete = async (userId) => {
        try {
            const response = await axios.delete(`https://app-react-native.onrender.com/users/${userId}`);

            if (response.status !== 200) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            setUserData((prevData) => prevData.filter((user) => user._id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error.message);
        }
    };

    return (
        <View style={styles.container}>
            {userData ? (
                userData.map((user) => (
                    <View key={user._id} style={styles.userContainer}>
                        <Text style={styles.name}>Name: {user?.name} {(user.isAdmin)?'(admin)':''}</Text>
                        <Text>Age: {user?.age}</Text>
                        <Text>Email: {user?.emailId}</Text>
                        {isAdmin ? (
                            (user.emailId !== loggedUser.emailId) ? (
                                <TouchableOpacity onPress={() => handleDelete(user._id)}>
                                    <Text style={styles.deleteText}>Delete</Text>
                                </TouchableOpacity>) : ('')

                        ) :
                            (user.emailId === loggedUser.emailId) ?
                                (<TouchableOpacity onPress={() => handleEdit(user._id)}>
                                    <Text style={styles.editText}>Edit</Text>
                                </TouchableOpacity>) : ('')
                        }
                    </View>
                ))
            ) : (
                <Text>No Users Found!</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'top',
    },
    userContainer: {
        backgroundColor: '#bad9d6',
        marginBottom: 20,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    name: {
        fontWeight: '900',
        fontSize: 18,
    },
    editText: {
        color: 'blue',
        marginTop: 5,
    },
    deleteText: {
        color: 'red',
        marginTop: 5,
    },
});

export default UsersScreen;