import React from 'react'
import EditPerfil from './editPerfil'
import {createStackNavigator} from '@react-navigation/stack';
import stackScreen from '../../../components/general/StackScreen'
const Stack = createStackNavigator();

export default function myShopNav({ navigation }) {
  return(
    <Stack.Navigator
      initialRouteName="editPerfil"
    >
      {stackScreen({
        Stack,
        name:'editPerfil',
        navigation,
        component:EditPerfil,
        title:'Editar Perfil',
        menu:true
      })}
    </Stack.Navigator>
  )
}