import React from 'react'
import HistoryBuy from './historyBuy'
import PedidoDetail from './pedidoDetail'
import {createStackNavigator} from '@react-navigation/stack';
import stackScreen from '../../../components/general/StackScreen'
const Stack = createStackNavigator();

export default function historyBuyNav({ navigation }) {
  return(
    <Stack.Navigator
      initialRouteName="historyBuy"
    >
      {stackScreen({
        Stack,
        name:'historyBuy',
        navigation,
        component:HistoryBuy,
        title:'Historial de Compras',
        menu:true
      })}
      {stackScreen({
        Stack,
        name:'pedidoDetailHistory',
        navigation,
        component:PedidoDetail,
        title:'Detalle de Compra',
        beforeScreen:'historyBuy',
        menu:true
      })}
    </Stack.Navigator>
  )
}