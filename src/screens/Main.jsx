import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
const AuthStack = createNativeStackNavigator();
import Login from './auth/Login';
import Register from './auth/Register';
import Index from './Index';
import Profile from './user/Index';
import EditProfile from './user/EditProfile';
import CreateUser from './user/CreateUser';

export default function Main() {
  // const token = useSelector(state => state.auth.data.token);

  return (
    <NavigationContainer>
      <AuthStack.Navigator screenOptions={{headerShown: false}}>
        <AuthStack.Screen name="Home" component={Index} />
        <AuthStack.Screen name="Profile" component={Profile} />
        <AuthStack.Screen name="EditProfile" component={EditProfile} />
        <AuthStack.Screen name="CreateUser" component={CreateUser} />
        <AuthStack.Screen name="Register" component={Register} />
        <AuthStack.Screen name="Login" component={Login} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}
