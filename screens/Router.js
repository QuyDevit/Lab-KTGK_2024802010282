import 'react-native-gesture-handler'
import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator  } from '@react-navigation/native-stack';
import {logout, useMyContextController} from '../store'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import Icon from 'react-native-vector-icons/FontAwesome'


const Stack = createNativeStackNavigator();

const Router = () => {
  const contextValue = useMyContextController();

  const [controller, dispatch] = contextValue;
  const { userLogin } = controller;

  const handleSignOut = () => {
    logout(dispatch)
  };
  return (
   <Stack.Navigator inititalRouteName ='Login' screenOptions={{ headerTitleAlign:'center' }}>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="Home" component={Home} options={{headerBackVisible: false,title:userLogin ?"Xin Chào, "+ userLogin.fullname : "Logout",headerRight:() =>(<Icon
              name="sign-out"
              size={30}
              color="black"
              style={{ marginRight: 10 }}
              onPress={handleSignOut}
            />)}}/>
    </Stack.Navigator>
  )
}

export default Router