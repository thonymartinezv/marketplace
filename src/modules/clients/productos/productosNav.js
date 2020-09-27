import React from 'react'
import Productos from './productos'
import ProductosCat from './productosCat'
import Producto from './producto'
import {createStackNavigator} from '@react-navigation/stack';
import stackScreen from '../../../components/general/StackScreen'
const Stack = createStackNavigator();

export default function ShopNav({ navigation }) {
  return(
    <Stack.Navigator
      initialRouteName="productosList"
    >
      {stackScreen({
        Stack,
        name:'productosCategory',
        navigation,
        component:ProductosCat,
        title:'Listado de Productos',
        menu:true
      })}
      {stackScreen({
        Stack,
        name:'productosList',
        navigation,
        component:Productos,
        title:'Listado de Productos',
        beforeScreen:'productosCategory',
        menu:true
      })}
      {stackScreen({
        Stack,
        name:'productoDetalle',
        navigation,
        component:Producto,
        title:'Detalles del Producto',
        beforeScreen:'productosList',
        menu:true
      })}
    </Stack.Navigator>
  )
}