import * as React from 'react';
import {Dimensions,StatusBar,YellowBox} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import { Spinner } from 'native-base'
import { Ionicons } from '@expo/vector-icons';
import {decode, encode} from 'base-64'

import SelectRol from './src/modules/selectRol'
import ClientsNav from './src/modules/clients/clientsNav'
import CommercesNav from './src/modules/commerces/commercesNav'

console.disableYellowBox = true
YellowBox.ignoreWarnings(['Warning:'])

if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }


const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
    }
    StatusBar.setHidden(true)
  }

  async componentDidMount() {
    await Font.loadAsync({
      'WorkSans-Bold': require('./assets/fonts/WorkSans-Bold.ttf'),
      'WorkSans-Regular': require('./assets/fonts/WorkSans-Regular.ttf'),
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    const  { fontLoaded } = this.state;
    if(!fontLoaded) {
      return <Spinner 
              size={Dimensions.get('window').height*0.10}
              style={{
                  flex: 1,
                  marginTop:Dimensions.get('window').height*0.05,
                  alignSelf:'center'
              }}
              color='#FDD501'
            />
    }

    return (
      <NavigationContainer>
        <Stack.Navigator   
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen
            name="selectRolApp" 
            component={SelectRol}
          />
          <Stack.Screen
            name="clientsNav"
            component={ClientsNav}
          />
          <Stack.Screen
            name="commercesNav"
            component={CommercesNav}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
