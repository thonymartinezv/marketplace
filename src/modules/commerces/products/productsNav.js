import React from 'react'
import Products from './products'
import {createStackNavigator} from '@react-navigation/stack';
import stackScreen from '../../../components/general/StackScreen'
const Stack = createStackNavigator();

export default function productsNav({ navigation }) {
  return(
    <Stack.Navigator
      initialRouteName="products"
    >
      {stackScreen({
        Stack,
        name:'products',
        navigation,
        component:Products,
        title:'Lista de Productos',
        menu:true
      })}
    </Stack.Navigator>
  )
}