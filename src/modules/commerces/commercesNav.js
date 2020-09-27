import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Menu from '../../components/general/commerce/menu'
import Login from './login/login'
import HistoryBuyNav from './historyBuy/historyBuyNav'
import PaySubsNav from './paySubs/paySubsNav'
import ProductsNav from './products/productsNav'
import SecTempNav from './secTemp/secTempNav'
import NotifyNav from './notify/notifyNav'
import MyShopNav from './myShop/myShopNav'
import Recover from './recover/recover'
import Register from './register/registerNav'

console.disableYellowBox = true
function CustomDrawerContent({navigation}) {
  return(
    <Menu navigation={navigation} />
  )
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Drawer.Navigator
    drawerPosition="right"
    drawerContent={(props) => <CustomDrawerContent {...props} />} 
    initialRouteName="loginCo">
        <Drawer.Screen name="loginCo" component={Login} />
        <Drawer.Screen name="recoverCo" component={Recover} />
        <Drawer.Screen name="registerCo" component={Register} />
        <Drawer.Screen name="historyBuyNav" component={HistoryBuyNav} />
        <Drawer.Screen name="paySubsNav" component={PaySubsNav} />
        <Drawer.Screen name="productsNav" component={ProductsNav} />
        <Drawer.Screen name="secTempNav" component={SecTempNav} />
        <Drawer.Screen name="notifyNav" component={NotifyNav} />
        <Drawer.Screen name="myShopNav" component={MyShopNav} />
    </Drawer.Navigator>
  );
}