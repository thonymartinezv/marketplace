import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Menu from '../../components/general/menu'
import Shop from '../../modules/clients/tiendas/ShopNav'
import Product from '../../modules/clients/productos/productosNav'
import SecTemp from '../../modules/clients/sec_temporada/secTempNav'
import Configuraciones from '../../modules/clients/configuraciones/configNav'
import EditarPerfil from '../../modules/clients/configuraciones/editPerfilNav'
import Pedidos from '../../modules/clients/configuraciones/pedidosNav'
import Login from '../../modules/clients/login/login'
import Recover from '../../modules/clients/recover/recover'
import Notification from "../../modules/clients/notificaciones/notificNav";
import CarritoCompras from '../../modules/clients/carrito_compras/carBuyNav'
import Register from '../../modules/clients/register/register'
import RegisterData from '../../modules/clients/register/registerDataNav'

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
    initialRouteName="login">
        <Drawer.Screen name="login" component={Login} />
        <Drawer.Screen name="notificacionesNav" component={Notification} />
        <Drawer.Screen 
          name="tiendasNav" 
          component={Shop}
        />
        <Drawer.Screen name="productosNav" component={Product} />
        <Drawer.Screen name="sec_temporadaNav" component={SecTemp} />
        <Drawer.Screen name="ajustesNav" component={Configuraciones} />
        <Drawer.Screen name="recover" component={Recover} />
        <Drawer.Screen name="editPerfilNav" component={EditarPerfil} />
        <Drawer.Screen name="pedidosNav" component={Pedidos} />
        <Drawer.Screen name="carBuyNav" component={CarritoCompras} />
        <Drawer.Screen name="register" component={Register} />
        <Drawer.Screen name="registerData" component={RegisterData} />
    </Drawer.Navigator>
  );
}