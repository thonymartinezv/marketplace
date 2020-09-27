import React from 'react'
import notificacionesTab from './notificacionesTab'
import EnviosDetail from './enviosDetail'
import PedidoDetail from './pedidosDetail'
import {createStackNavigator} from '@react-navigation/stack';
import stackScreen from '../../../components/general/StackScreen'
const Stack = createStackNavigator();

export default function notify({ navigation }) {
  return(
    <Stack.Navigator
      initialRouteName="notifyTab"
    >
      {stackScreen({
        Stack,
        name:'notifyTab',
        navigation,
        component:notificacionesTab,
        title:'Notificaciones',
        menu:true
      })}
      {stackScreen({
        Stack,
        name:'enviosDetail',
        navigation,
        component:EnviosDetail,
        title:'Detalle del Pedido',
        beforeScreen:'notifyTab',
        menu:true
      })}
      {stackScreen({
        Stack,
        name:'pedidoDetail',
        navigation,
        component:PedidoDetail,
        title:'Detalle del Pedido',
        beforeScreen:'notifyTab',
        menu:true
      })}
    </Stack.Navigator>
  )
}