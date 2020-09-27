import React from 'react';
import Tiendas from './Tiendas'
import {createStackNavigator} from '@react-navigation/stack';
import stackScreen from '../../../components/general/StackScreen'
import Tienda from './Tienda'
const Stack = createStackNavigator();

export default function ShopNav({ navigation }) {
  return(
    <Stack.Navigator
      initialRouteName="tiendas"
    >
      {stackScreen({
          Stack,
          name:'shops',
          navigation,
          component:Tiendas,
          title:'Listado de Tiendas',
          menu:true
      })}
      {stackScreen({
          Stack,
          name:'tienda',
          navigation,
          component:Tienda,
          title:'Detalles de la Tienda',
          beforeScreen:'shops',
          menu:true
      })}
    </Stack.Navigator>
  )
}