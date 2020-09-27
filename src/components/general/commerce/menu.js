import React from 'react';
import { StyleSheet,View,Dimensions,ImageBackground, Alert} from 'react-native';
import ItemMenu from '../item-menu'
import {Thumbnail,Button,Text} from 'native-base'
import AdminCommerce from '../../../model/AdminCommerces'
export default function Menu(props) {
    return(
        <View style={{
            width:'100%',
            height:'100%'
          }}>
            <View style={{
              width:'100%',
              flexDirection:'column',
              alignItems:'center',
              paddingTop:Dimensions.get('window').width*0.07
            }}>
              <Thumbnail style={{
                width:Dimensions.get('window').width*0.3,
                height:Dimensions.get('window').width*0.3,
                borderRadius:Dimensions.get('window').width*0.5
              }} large source={require('../../../../assets/icon/header/logo_fondo.png')} />
            </View>
            <View style={{height:2,backgroundColor:'#cccccc',marginHorizontal:Dimensions.get('window').width*0.04,marginVertical:Dimensions.get('window').height*0.025}} />
            <ItemMenu text="Pagos por Suscripción" icon="dinero" onClick={() => props.navigation.navigate('paySubsNav')} />
            <ItemMenu text="Productos" icon="etiqueta" onClick={() => props.navigation.navigate('productsNav')} />
            <ItemMenu text="Sección de Temporada" icon="estrella" onClick={() => props.navigation.navigate('secTempNav')} />
            <ItemMenu text="Notificaciones" icon="campana" onClick={() => props.navigation.navigate('notifyNav')} />
            <ItemMenu text="Historial de Compras" icon="historial" onClick={() => props.navigation.navigate('historyBuyNav')} />
            <ItemMenu text="Mi Tienda" icon="usuario" onClick={() => props.navigation.navigate('myShopNav')} />
            <View style={{paddingLeft:Dimensions.get('window').width*0.05}}>
              <ItemMenu text="Editar Perfil" icon="editar" onClick={() => props.navigation.navigate('myShopNav')} />
            </View>
            <View style={{flexDirection:'column',flex:1,paddingVertical:Dimensions.get('window').height*0.025,justifyContent:'flex-end'}}>
              <ItemMenu text="Cerrar Sesión" icon="salir" onClick={async() =>{await AdminCommerce.logout()?Alert.alert("message",'sesión cerrada'):Alert.alert("message",'sesión no cerrada');props.navigation.navigate('selectRolApp')}} />
            </View>
          </View>
    )
}