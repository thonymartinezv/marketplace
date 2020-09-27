import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import stackScreen from '../../../components/general/StackScreen'
import Register from './register'
const Stack = createStackNavigator();

export default function registerNav({ navigation }) {
    return(
        <Stack.Navigator
            initialRouteName="registerT"
        >
            {stackScreen({
                Stack,
                name:'registerT',
                navigation,
                component:Register,
                title:'Registrar Tienda',
                beforeScreen:'loginCo',
                menu:false
            })}
        </Stack.Navigator>
    )
}