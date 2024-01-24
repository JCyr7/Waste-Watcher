import LogoutPage from './src/Pages/LogoutPage'
import LoginPage from './src/Pages/LoginPage'
import ForgotPassword from './src/Pages/ForgotPassword'
import MainPage from './src/Pages/MainPage'

import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {LogBox} from 'react-native'
LogBox.ignoreAllLogs()

export default function App() {
  //Call create stack navigator function
  const Stack = createNativeStackNavigator()
  // Is loggedd in constant: changes the inital route of the stack based on whether user is logged in or not
  // const isLoggedin = AsyncStorage.getItem('loggedIn')
  // const isLoggedin = AsyncStorage.getItem('username')
  const isLoggedin = false

  return (
    //Navigation container for application. Stack consists of the login page, logout page and main application page
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLoggedin ? 'MainPage' : 'LogoutPage'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name='LogoutPage' component={LogoutPage}></Stack.Screen>
        <Stack.Screen name='LoginPage' component={LoginPage}></Stack.Screen>
        <Stack.Screen
          name='ForgotPassword'
          component={ForgotPassword}></Stack.Screen>
        <Stack.Screen name='MainPage' component={MainPage}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
