import React from 'react';
import Configuracion from './configuracion'
import EditPerfil from './editPerfil'
import Pedidos from './pedidos'
import Pedido from './pedido'
import {StyleSheet,Dimensions} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import stackScreen from '../../../components/general/StackScreen'
const Stack = createStackNavigator();

export default function ShopNav(props) {
  const {navigation} = props
  return(
    <Stack.Navigator
    initialRouteName={props.screen?props.screen:"configuracionSelect"}
    >
      {stackScreen({
        Stack,
        name:'configuracionSelect',
        navigation,
        component:Configuracion,
        title:'Configuraciones',
        menu:true
      })}
      {stackScreen({
        Stack,
        name:'editPerfil',
        navigation,
        component:EditPerfil,
        title:'Editar Perfil',
        beforeScreen:props.screen?null:'configuracionSelect',
        menu:true
      })}
      {stackScreen({
        Stack,
        name:'pedidos',
        navigation,
        component:Pedidos,
        title:'Mis Pedidos',
        beforeScreen:'configuracionSelect',
        menu:true
      })}
      {stackScreen({
        Stack,
        name:'pedidoConfig',
        navigation,
        component:Pedido,
        title:'Detalle del Pedido',
        beforeScreen:'pedidos',
        menu:true
      })}
    </Stack.Navigator>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    items_icon:{
      width: Dimensions.get('window').width*0.1,
      height: Dimensions.get('window').width*0.1
    }
  });