import React from 'react'
import Pedidos from './pedidos'
import Pagos from './pago'
import Temporada from './temporada'
import { Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


const Tab = createMaterialTopTabNavigator();

export default function App({navigation}) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Pedido" component={Pedidos} />
      <Tab.Screen name="Pago" component={Pagos} />
      <Tab.Screen name="Temporada" component={Temporada} />
    </Tab.Navigator>
  );
}