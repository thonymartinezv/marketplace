import React from 'react'
import PaySubs from './paySubs'
import {createStackNavigator} from '@react-navigation/stack';
import stackScreen from '../../../components/general/StackScreen'
const Stack = createStackNavigator();

export default function paySubsNav({ navigation }) {
  return(
    <Stack.Navigator
      initialRouteName="paySubs"
    >
      {stackScreen({
        Stack,
        name:'paySubs',
        navigation,
        component:PaySubs,
        title:'Pagos por Suscripción',
        menu:true
      })}
    </Stack.Navigator>
  )
}