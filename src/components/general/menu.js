import React from 'react';
import { StyleSheet,View,Dimensions,ImageBackground} from 'react-native';
import ItemMenu from './item-menu'
import {Thumbnail,Button,Text} from 'native-base'

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
              }} large source={require('../../../assets/icon/header/logo_fondo.png')} />
            </View>
            <View style={{height:2,backgroundColor:'#cccccc',marginHorizontal:Dimensions.get('window').width*0.04,marginVertical:Dimensions.get('window').height*0.025}} />
            <ItemMenu text="Sección de Temporada" icon="estrella" onClick={() => props.navigation.navigate('sec_temporadaNav')} />
            <ItemMenu text="Productos" icon="etiqueta" onClick={() => props.navigation.navigate('productosNav')} />
            <ItemMenu text="Tiendas" icon="tienda" onClick={() => props.navigation.navigate('tiendasNav')} />
            <ItemMenu text="Carrito de Compras" icon="car" onClick={() => props.navigation.navigate('carBuyNav')} />
            <ItemMenu text="Notificaciones" icon="campana" onClick={() => props.navigation.navigate('notificacionesNav')} />
            <ItemMenu text="Configuraciones" icon="ajustes" onClick={() => props.navigation.navigate('ajustesNav')} />
            <View style={{paddingLeft:Dimensions.get('window').width*0.05}}>
              <ItemMenu text="Mis Pedidos" icon="mas" onClick={() => props.navigation.navigate('pedidosNav')} />
              <ItemMenu text="Editar Perfil" icon="editar" onClick={() => props.navigation.navigate('editPerfilNav')} />
            </View>
            <View style={{flexDirection:'column',flex:1,paddingVertical:Dimensions.get('window').height*0.025,justifyContent:'flex-end'}}>
              <ItemMenu text="Cerrar Sesión" icon="salir" onClick={() => props.navigation.navigate('selectRolApp')} />
            </View>
          </View>
    )
}