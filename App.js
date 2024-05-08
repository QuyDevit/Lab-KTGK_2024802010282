import { View, Text } from 'react-native'
import React from 'react'
import Router from './screens/Router'
import { MyContextControllerProvider } from './store'
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
    <MyContextControllerProvider>
      <NavigationContainer >
        <Router></Router>
      </NavigationContainer>
    </MyContextControllerProvider>
  )
}

export default App