import { View, Text } from 'react-native'
import React from 'react'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';

export default function Main() {
  return (
    <DrawerContentScrollView>
      <Text>Main</Text>
    </DrawerContentScrollView>
  )
}