import React from 'react'
import CarBuy from './carBuy'
import ConfirmBuy from './confirmBuy'
import {createStackNavigator} from '@react-navigation/stack';
import stackScreen from '../../../components/general/StackScreen'
const Stack = createStackNavigator();

export default function carBuy({ navigation }) {
  return(
    <Stack.Navigator
      initialRouteName="carBuy"
    >
      {stackScreen({
        Stack,
        name:'carBuy',
        navigation,
        component:CarBuy,
        title:'Carrito de Compras',
        menu:true
      })}
        {stackScreen({
        Stack,
        name:'confirmBuy',
        navigation,
        component:ConfirmBuy,
        title:'Confirmación de Pedido',
        menu:true
      })}
    </Stack.Navigator>
  )
}