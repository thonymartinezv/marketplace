import React from 'react';
import RegisterData from './registerData'
import {createStackNavigator} from '@react-navigation/stack';
import stackScreen from '../../../components/general/StackScreen'
import { Alert } from 'react-native';
const Stack = createStackNavigator();

export default function registerDataNav({ navigation ,route}) {
  
    return (
      <Stack.Navigator
        initialRouteName="dataClient"
      >
      {stackScreen({
        Stack,
        name:'dataClient',
        ruta:route,
        navigation,
        component:RegisterData,
        title:'Data de Usuario'
      })}
      </Stack.Navigator>
    )
}