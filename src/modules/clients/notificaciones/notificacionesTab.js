import React from 'react'
import Pedidos from './pedidos'
import Envios from './envios'
import { Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

export default function App({navigation}) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Pedido" component={Pedidos} />
      <Tab.Screen name="Entrega" component={Envios} />
    </Tab.Navigator>
  );
}