import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import UsersScreen from '../Screens/UsersScreen';
import SignupScreen from '../Screens/SignupScreen';
import SigninScreen from '../Screens/SigninScreen';
import { enableScreens } from 'react-native-screens';
import EditUser from '../Screens/EditUserScreen';

enableScreens();


const Stack = createStackNavigator();
function AppNav() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name='Signup' component={SignupScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Users" component={UsersScreen} />
                <Stack.Screen name="Signin" component={SigninScreen} />
                <Stack.Screen name='EditUser' component={EditUser} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNav;