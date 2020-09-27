import React from "react";
import { StyleSheet,View,Dimensions,ScrollView} from 'react-native';
import {Button,Text,Item,Input,List,ListItem,Left,Body,Thumbnail} from 'native-base'
import IndumentariaSvg from '../../../../assets/icon/rubros/indumentaria.svg'
import FindSvg from '../../../../assets/icon/general/lupa.svg'
import { Divider } from "react-native-elements";
import CarSvg from '../../../../assets/icon/general/carro.svg'


export default function Product({navigation}) {

    return(
        <View>
        <ScrollView style={{height:Dimensions.get('window').height*0.7}}>
            <Divider/>
            <View style={{paddingVertical:Dimensions.get('window').width*0.03,paddingHorizontal:Dimensions.get('window').width*0.04}}>
              <View style={{flexDirection:'row',justifyContent: 'center'}}>
                <View style={{
                    justifyContent:'center',
                    paddingRight:7.5
                }}>
                    <Text style={styles.textCategory}>TEMPORADA</Text>
                </View>
                <Button style={{backgroundColor:'#E84B27'}}  small>
                    <Text style={{
                        color:'white'
                    }}>
                        INVIERNO 2020
                    </Text>
                </Button>
              </View>
            </View>
            <Divider/>
            <Item style={{borderColor:'#c9c9c9',marginTop:Dimensions.get('window').height*0.025}} rounded>
              <FindSvg style={{
                      width:Dimensions.get('window').height*0.04,
                      height:Dimensions.get('window').height*0.04,
                      marginLeft:Dimensions.get('window').height*0.015
                  }} 
                  active name="find"
              />
              <Input placeholder='Buscar...' />
            </Item>
            <List style={styles2.container}>
                <ListItem thumbnail style={styles2.viewItem} onPress={()=>{/*navigation.navigate('productoDetalle')*/}}>
                    <Left style={styles2.thumbail}>
                        <Thumbnail square style={styles2.image} source={require("../../../../assets/img/prendas/prenda1.png")} />
                    </Left>
                    <Body style={styles2.body}>
                        <Text numberOfLines={1} style={styles2.stop}>Stop: 70 Und</Text>
                        <View style={{flex: 1, alignItems: "center", alignContent: "center", marginTop:10}}>
                            <Text numberOfLines={2} style={styles2.title}>Falda Rosa</Text>
                            <Text numberOfLines={2} style={styles2.text}>Marca Estilos</Text>
                            <Text numberOfLines={2} style={styles2.text}>Talla: SS / S / M / L / XL</Text>
                            <Text numberOfLines={2} style={styles2.text}>Colores: Gris, Negro, Verde</Text>
                            <Text numberOfLines={1} style={styles2.text2}>S/ 50</Text>
                        </View>
                    </Body>
                </ListItem>
                <ListItem thumbnail style={styles2.viewItem} onPress={()=>{/*navigation.navigate('productoDetalle')*/}}>
                    <Left style={styles2.thumbail}>
                        <Thumbnail square style={styles2.image} source={require("../../../../assets/img/prendas/prenda2.png")} />
                    </Left>
                    <Body style={styles2.body}>
                    <Text numberOfLines={1} style={styles2.stop}>Stop: 70 Und</Text>
                        <View style={{flex: 1, alignContent: "center", alignItems: "center", marginTop: 10}}>
                            <Text numberOfLines={2} style={styles2.title}>Falda Rosa</Text>
                            <Text numberOfLines={2} style={styles2.text}>Marca Estilos</Text>
                            <Text numberOfLines={2} style={styles2.text}>Talla: SS / S / M / L / XL</Text>
                            <Text numberOfLines={2} style={styles2.text}>Colores: Gris, Negro, Verde</Text>
                            <Text numberOfLines={1} style={styles2.text2}>S/ 50</Text>
                        </View>
                    </Body>
                </ListItem>
                <ListItem thumbnail style={styles2.viewItem} onPress={()=>{/*navigation.navigate('productoDetalle')*/}}>
                    <Left style={styles2.thumbail}>
                        <Thumbnail square style={styles2.image} source={require("../../../../assets/img/prendas/prenda3.png")} />
                    </Left>
                    <Body style={styles2.body}>
                        <Text numberOfLines={1} style={styles2.stop}>Stop: 70 Und</Text>
                        <View style={{flex: 1, alignContent: "center", alignItems: "center", marginTop: 10}}>
                            <Text numberOfLines={2} style={styles2.title}>Falda Rosa</Text>
                            <Text numberOfLines={2} style={styles2.text}>Marca Estilos</Text>
                            <Text numberOfLines={2} style={styles2.text}>Talla: SS / S / M / L / XL</Text>
                            <Text numberOfLines={2} style={styles2.text}>Colores: Gris, Negro, Verde</Text>
                            <Text numberOfLines={1} style={styles2.text2}>S/ 50</Text>
                        </View>
                    </Body>
                </ListItem>
                <ListItem thumbnail style={styles2.viewItem} onPress={()=>{/*navigation.navigate('productoDetalle')*/}}>
                    <Left style={styles2.thumbail}>
                        <Thumbnail square style={styles2.image} source={require("../../../../assets/img/prendas/prenda4.png")} />
                    </Left>
                    <Body style={styles2.body}>
                        <Text numberOfLines={1} style={styles2.stop}>Stop: 70 Und</Text>
                        <View style={{flex: 1, alignContent: "center", alignItems: "center", marginTop: 10}}>
                            <Text numberOfLines={2} style={styles2.title}>Falda Rosa</Text>
                            <Text numberOfLines={2} style={styles2.text}>Marca Estilos</Text>
                            <Text numberOfLines={2} style={styles2.text}>Talla: SS / S / M / L / XL</Text>
                            <Text numberOfLines={2} style={styles2.text}>Colores: Gris, Negro, Verde</Text>
                            <Text numberOfLines={1} style={styles2.text2}>S/ 50</Text>
                        </View>
                    </Body>
                </ListItem>
            </List>
        </ScrollView>
        <View style={styles.content_btn_carBuy}>
            <Button style={styles.btn_carBuy} block>
                <CarSvg style={{
                    width: Dimensions.get('window').width*0.075,
                    height: Dimensions.get('window').width*0.075,
                    marginHorizontal:Dimensions.get('window').width*0.001
                }} />
                <Text style={styles.text_btn_carBuy}>
                    Ver Carrito
                </Text>
            </Button>
            <Button style={styles.btn_carBuy_2} block>
                <Text style={styles.text_btn_carBuy_2}>
                    S/ 50
                </Text>
            </Button>
        </View>
        </View>
    )
    
}

const styles = StyleSheet.create({
    ContentTextCategory:{
      flex:1,
      flexDirection:'row',
      alignItems: 'center',
    },
    textCategory:{
      color:'#5F27A4',
      paddingLeft:Dimensions.get('window').width*0.015
    },
    items_icon:{
      width: Dimensions.get('window').width*0.1,
      height: Dimensions.get('window').width*0.1
    },
    btn_carBuy:{
        backgroundColor:'#5F27A4',
    },
    btn_carBuy_2:{
        backgroundColor:'#cccccc',
    },
    text_btn_carBuy:{
        color:"#FFFFFF",
        fontSize:Dimensions.get('window').width*0.04
    },
    text_btn_carBuy_2:{
        color:"#000000",
        fontSize:Dimensions.get('window').width*0.04
    },
    content_btn_carBuy:{
        paddingHorizontal:Dimensions.get('window').width*0.1,
        height:Dimensions.get('window').height*0.3,
        flex:1,
        justifyContent:'flex-start',
        paddingVertical:Dimensions.get('window').height*0.014
    }
});

const styles2 = StyleSheet.create({
    container: {
       marginTop: 10
    },
    viewItem: {
        borderWidth: 1,
        marginRight: 5,
        marginLeft: 5,
        marginBottom: 8,
        borderColor: "transparent",
        overflow: 'visible',
        shadowColor: "#C2820F",
        shadowOpacity: 1,
        shadowRadius: 12,
        elevation: 4,
        borderRadius: 8,
        paddingVertical: 2
    },
    thumbail: {
        marginLeft: 10,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 16,
        borderRadius: 15,
        borderColor: "#B3B3B3"
    },
    body: {
        borderWidth: 0,
        borderColor: "transparent",
    },
    textDate: {
        marginVertical: 6,
        fontSize: 9,
        right: 8,
        position: "absolute",
        bottom: 2,
        color: "#C2820F"
    },
    image: {
        width: 100,
        height: 100,
    },
    stop: {
        fontSize: 12,
        fontFamily: 'WorkSans-Regular',
        color: "#FFFFFF",
        backgroundColor: "#5F27A4",
        width: "86%",
        paddingVertical: 4,
        paddingLeft: 4
    },
    title: {
        fontSize: 16,
        fontFamily: 'WorkSans-Bold',
        color: "#5F27A4"
    },
    text: {
        marginBottom: -2,
        fontSize: 12,
        fontFamily: 'WorkSans-Regular',
        color: "#4D4D4D"
    },
    text2: {
        marginBottom: -2,
        fontSize: 14,
        fontFamily: 'WorkSans-Regular',
        color: "#4D4D4D",
        fontWeight: "bold"
    }
});