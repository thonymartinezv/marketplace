import React from 'react'
import Notify from './notifyTab'
import PagoDetail from './pagoDetail'
import PedidoDetail from './pedidosDetail'
import {createStackNavigator} from '@react-navigation/stack';
import stackScreen from '../../../components/general/StackScreen'
const Stack = createStackNavigator();

export default function notifyNav({ navigation }) {
  return(
    <Stack.Navigator
      initialRouteName="notify"
    >
      {stackScreen({
        Stack,
        name:'notify',
        navigation,
        component:Notify,
        title:'Notificaciones',
        menu:true
      })}
      {stackScreen({
        Stack,
        name:'pagosDetailCo',
        navigation,
        component:PagoDetail,
        title:'Detalle del Pedido',
        beforeScreen:'notify',
        menu:true
      })}
      {stackScreen({
        Stack,
        name:'pedidoDetailCo',
        navigation,
        component:PedidoDetail,
        title:'Detalle del Pedido',
        beforeScreen:'notify',
        menu:true
      })}
    </Stack.Navigator>
  )
}