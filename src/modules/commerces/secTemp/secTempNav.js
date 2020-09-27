import React from 'react'
import SecTemp from './secTemp'
import {createStackNavigator} from '@react-navigation/stack';
import stackScreen from '../../../components/general/StackScreen'
const Stack = createStackNavigator();

export default function secTempNav({ navigation }) {
  return(
    <Stack.Navigator
      initialRouteName="secTemp"
    >
      {stackScreen({
        Stack,
        name:'secTemp',
        navigation,
        component:SecTemp,
        title:'Sección de Temporada',
        menu:true
      })}
    </Stack.Navigator>
  )
}