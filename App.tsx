import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
// import {
//   createDrawerNavigator,
//   DrawerContentScrollView,
//   DrawerItemList,
//   DrawerItem,
// } from '@react-navigation/drawer';

const AuthStack = createNativeStackNavigator();

import Login from './src/screens/auth/Login';
import Register from './src/screens/auth/Register';

export default function App() {
  return (
    <NavigationContainer>
      <AuthStack.Navigator screenOptions={{headerShown: false}}>
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="Register" component={Register} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}
