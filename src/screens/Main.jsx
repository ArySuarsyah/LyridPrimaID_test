import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const AuthStack = createNativeStackNavigator();
import Login from './auth/Login';
import Register from './auth/Register';

export default function Main() {
  const token = useSelector(state => state.auth.token);
  console.log('userTioken', token);
  return (
    <NavigationContainer>
      <AuthStack.Navigator screenOptions={{headerShown: false}}>
        <AuthStack.Screen name="Register" component={Register} />
        <AuthStack.Screen name="Login" component={Login} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}
