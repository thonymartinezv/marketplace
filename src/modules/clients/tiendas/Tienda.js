import React, { useState, useRef, useCallback } from 'react'
import { StyleSheet, View, Dimensions, Text,Image, ScrollView, Alert ,Modal,TouchableOpacity} from "react-native"
import Carousel from "../../../components/productos/Carousel"
import { Divider, Input } from "react-native-elements"
import { useFocusEffect } from "@react-navigation/native"
import { Container, Content, List, Button,ListItem, Thumbnail, Left, Body,Picker} from 'native-base'
import AtrasSvg from '../../../../assets/icon/header/atras.svg'
import PhoneSvg from '../../../../assets/icon/general/phone.svg'
import LocationSvg from '../../../../assets/icon/general/location.svg'
import EmailSvg from '../../../../assets/icon/general/email.svg'
import IndumentariaSvg from '../../../../assets/icon/rubros/indumentaria.svg'

const screenWidth = Dimensions.get('window').width;

export default class StoreRegistration extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            modalVisible:false,
            pickerColor:'0'
        }
    }

    Modal = ({})=>{
        var PickerColor = this.Picker
        var Quantity = this.Quantity
        return(
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {

                }}
            >
                <View style={{
                    width:"100%",
                    height:"100%",
                    backgroundColor:"rgba(0, 0, 0, 0.4)",

                }}>
                    <ScrollView>
                        <View style={{
                            width:Dimensions.get('window').width*0.96,
                            marginVertical:Dimensions.get('window').height*0.025,
                            marginHorizontal:Dimensions.get('window').width*0.02,
                            backgroundColor:"white",
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 3,
                            },
                            shadowOpacity: 0.29,
                            shadowRadius: 4.65,
                            elevation:7,
                            paddingTop:Dimensions.get('window').height*0.025,
                            paddingBottom:Dimensions.get('window').height*0.025,
                            paddingHorizontal:Dimensions.get('window').width*0.05,
                        }}>
                            <View style={{
                                flexDirection:'row'
                            }}>
                                <Button style={{
                                    backgroundColor:'rgba(0,0,0,0)',
                                    elevation:0
                                }}
                                onPress={()=>{
                                    this.setState({
                                        modalVisible:false
                                    })
                                }}>
                                    <AtrasSvg 
                                        width={Dimensions.get('window').width*0.1}
                                        height={Dimensions.get('window').width*0.1}
                                        style={styles.iconBack}
                                    />
                                </Button>
                                <View style={{
                                    width:Dimensions.get('window').width*0.96,
                                    marginLeft:-Dimensions.get('window').width*0.15,
                                    alignItems:'center'
                                }}>
                                    <View style={{
                                        alignItems:'center'
                                    }}>
                                        <Text style={{
                                            color:'#5F27A4',
                                            fontSize:Dimensions.get('window').width*0.045
                                        }}>
                                            Microondas XLY
                                        </Text>
                                        <Text style={{
                                            color:'#656565',
                                            fontSize:Dimensions.get('window').width*0.03
                                        }}>
                                            Marca Samsung
                                        </Text>
                                        <Text style={{
                                            fontWeight:'bold',
                                            fontSize:Dimensions.get('window').width*0.04
                                        }}>
                                            S/390
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{
                                marginTop:Dimensions.get('window').height*0.025,
                                alignItems:'center'
                            }}>
                                <Image source={require('../../../../assets/img/productos/microondas_samsung.png')} 
                                    style={{
                                        width:Dimensions.get('window').width*0.48,
                                        height:Dimensions.get('window').width*0.28
                                    }}
                                />
                                <View style={{
                                    marginTop:Dimensions.get('window').height*0.025,
                                    width:Dimensions.get('window').width*0.96
                                }}>
                                    <Button block style={{
                                        backgroundColor:'#5F27A4'
                                    }}>
                                        <Text style={{
                                            color:'white'
                                        }}>
                                            Caracteristicas
                                        </Text>
                                    </Button>
                                </View>
                            </View>
                            <PickerColor
                                style={{
                                    marginTop:Dimensions.get('window').height*0.01
                                }}
                                reference={this.state.pickerColor} 
                                label="Color"
                                items={[
                                    {id:'1',name:'Negro'},
                                    {id:'2',name:'Azul'},
                                    {id:'3',name:'Morado'}
                                ]}
                                onChange={(value)=>{
                                    this.setState({
                                        pickerColor:value
                                    })
                                }}
                            />
                            <View style={{
                                width:Dimensions.get('window').width*0.96,
                                flexDirection:'row',
                                marginLeft:Dimensions.get('window').width*-0.1,
                                justifyContent:'center',
                                alignItems:'center',
                                marginTop:Dimensions.get('window').height*0.015
                            }}>
                                <Text style={{
                                    color:'#5F27A4',
                                    marginRight:10,
                                    marginTop:7.5
                                }}>
                                    Stop
                                </Text>
                                <Quantity />
                            </View>
                            <View style={{
                                width:Dimensions.get('window').width*0.86,
                            }}>
                                <View style={{
                                    width:Dimensions.get('window').width*0.86,
                                    alignItems:'center',
                                    marginTop:Dimensions.get('window').height*0.025
                                }}>
                                    <Text style={{
                                        fontSize:Dimensions.get('window').width*0.045,
                                        color:'#5F27A4'
                                    }}>
                                        Descripción técnica
                                    </Text>
                                </View>
                                <ScrollView style={{
                                    height:Dimensions.get('window').height*0.1,
                                    marginTop:Dimensions.get('window').height*0.015
                                }}>
                                    <Text style={{
                                        color:'#656565'
                                    }}>
                                        Hasta 16 recetas preprogramadas para tu comodidad. 
                                        Cocina todo fácilmente; desde guisantes hasta arroz integral, 
                                        pechugas de pollo deshuesadas hasta filetes de salmón al horno; sin dudas, el resultado será un alimento húmedo y lleno de sabor.
                                    </Text>
                                </ScrollView>
                            </View>
                            <Button block style={{
                                backgroundColor:'#5F27A4',
                                marginTop:Dimensions.get('window').height*0.025
                                }}
                                onPress={()=>{
                                    this.setState({
                                        modalVisible:false
                                    })
                                }}
                            >
                                <Text style={{
                                    color:'white'
                                }}>
                                    Aceptar
                                </Text>
                            </Button>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        )
    }

    Quantity = ()=>{
        return(
            <View style={{
                flexDirection:'row',
                borderWidth:0.25,
                borderColor:'#5F27A4',
                marginTop:Dimensions.get('window').height*0.01,
                width:Dimensions.get('window').width*0.3
            }}>
                <TouchableOpacity onPress={()=>{
                }}>
                    <View style={{
                        width:Dimensions.get('window').width*0.1,
                        borderWidth:1,
                        borderColor:'#5F27A4',
                        alignItems:'center'
                    }}>
                        <Text>
                            -
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={{
                    width:Dimensions.get('window').width*0.1,
                    alignItems:'center',
                    backgroundColor:'#5F27A4',
                    borderWidth:1,
                    borderColor:'#5F27A4',
                }}>
                    <Text style={{
                        color:'white'
                    }}>
                        001
                    </Text>
                </View>
                <TouchableOpacity onPress={()=>{
                }}>
                    <View style={{
                        width:Dimensions.get('window').width*0.1,
                        borderWidth:1,
                        borderColor:'#5F27A4',
                        alignItems:'center'
                    }}>
                        <Text>
                            +
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    Picker = ({label,items,onChange,reference,style})=>{
        return(
            <View style={[{
                flexDirection:'column',
                paddingRight:Dimensions.get('window').width*0.01
            },style]}>
                <View>
                    <Text style={{
                        fontSize:Dimensions.get('window').width*0.04,
                        color:'#5F27A4'
                    }}>
                        {label}
                    </Text>
                </View>
                <View style={{
                    width: Dimensions.get('window').width*0.84,
                    borderColor: '#cccccc',
                    borderBottomWidth:1,
                    borderTopWidth:1,
                    borderLeftWidth:1,
                    borderRightWidth:1,
                    borderRadius: 5,
                    alignSelf: 'center',
                    marginTop:Dimensions.get('window').height*0.0075,
                    paddingHorizontal:Dimensions.get('window').width*0.03
                }}>
                    <Picker  
                        selectedValue={reference}
                        mode="dropdown"
                        style={{
                            color:'#656565'
                        }}
                        onValueChange={(value) =>{
                            onChange(value)
                        }}
                    >
                    <Picker.Item value="0" label={"Seleccione "+label}/>
                    {
                        items.map( (item) => {
                            return <Picker.Item value={item.id} label={item.name} />
                        })
                    }
                    </Picker>
                </View>
            </View>
        )
    }

    render(){
        var ModalProduct = this.Modal
        return (
            <ScrollView style={styles.scrollView}>
                <ModalProduct />
                <View style={styles.titleStore}>
                    <Text style={[styles.titleTextStore, styles.fontFamily]}>NOMBRE DE LA TIENDA</Text>
                </View>
                <Carousel
                    arrayImages={[]}
                    height={180}
                    width={screenWidth}
                    type={"prueba"}
                />
                <View style={styles.rubro}>
                    <View>
                        <IndumentariaSvg width={32} height={32}/>
                    </View>
                    <View style={styles.infoRubro}>
                        <Text style={[styles.titleSvgRubro, styles.fontFamily]}>Prenda de Vestir</Text>
                        <Text style={[styles.titleSubCategory, , styles.fontFamily]}>Dama</Text>
                    </View>
                </View>
    
                <Divider style={styles.divider} />
    
                <View style={styles.data}>
                    <PhoneSvg width={32} height={32}/>
                    <Text style={[styles.textData]}>+51 985696369</Text>
                </View>
                <View style={styles.data}>
                    <EmailSvg width={32} height={32}/>
                    <Text style={[styles.textData]}>correosdsadsadsadsa@mail.com</Text>
                </View>
                <View style={styles.data}>
                    <LocationSvg width={32} height={32}/>
                    <Text style={[styles.textData]}>San Martin de Porres</Text>
                </View>
    
                <Divider style={styles.divider} />
                
                <Content style={{height: "100%"}}>
                    <List style={styles2.container}>
                        <ListItem thumbnail style={styles2.viewItem} onPress={()=>this.setState({modalVisible:true})}>
                            <Left style={styles2.thumbail}>
                                <Thumbnail square style={styles2.image} source={require("../../../../assets/img/prendas/prenda1.png")} />
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
                        <ListItem thumbnail style={styles2.viewItem} onPress={()=>this.setState({modalVisible:true})}>
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
                        <ListItem thumbnail style={styles2.viewItem} onPress={()=>this.setState({modalVisible:true})}>
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
                        <ListItem thumbnail style={styles2.viewItem} onPress={()=>this.setState({modalVisible:true})}>
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
                </Content>
            </ScrollView>
        );
    }
}

function defaultFormValue() {
    return {
        rechazo: "",
    };
}

const styles = StyleSheet.create({
    data: {
        flex: 1,
        flexDirection: "row",
        marginHorizontal: 12,
        marginVertical: 2
    },
    titleStore: {
        paddingVertical: 10,
        backgroundColor: '#5F27A4',
        flex: 1,
        alignItems: "center"
    },
    titleTextStore: {
        color: "#ffffff",
        fontSize: 15
    },
    rubro: {
        flex: 2,
        flexDirection: "row",
        marginHorizontal: 12,
        marginVertical: 10
    },
    divider: {
        backgroundColor: "#B3B3B3",
        marginHorizontal: 4
    },
    titleSvgRubro: {
        fontSize: 14,
        color: "#5F27A4"
    },
    titleSubCategory: {
        fontSize: 14,
        position: "absolute",
        right: 0,
        marginRight: 40,
        backgroundColor: "#5F27A4",
        color: "#FFFFFF",
        paddingVertical: 2,
        paddingHorizontal: 10,
    },
    fontFamily: {
        fontFamily: "WorkSans-Regular"
    },
    textData: {
        marginTop: 4,
        marginLeft: 10,
        fontSize: 14,
        color: "#5F27A4"
    },
    infoRubro: {
        marginTop: 5,
        marginHorizontal: 8,
        flexDirection: "row",
        width: "100%"
    },
    scrollView: {
        height: "100%",
        backgroundColor: "#ffffff",
    },
    containerButton: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 20,
        justifyContent: "center"
    },
    containerButtomPrimary: {
        marginTop: 20,
        width: "48%",
    },
    containerButtomSecundary: {
        marginTop: 20,
        width: "48%",
    },
    ButtonStyleSecundary: {
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#C6C6C6",
        backgroundColor: "transparent",
        paddingVertical: 2,
        marginHorizontal: 5,
        marginBottom: 20
    },
    ButtonTextSecundary: {
        color: "#999999",
        fontFamily: 'WorkSans-Regular',
        fontSize: 18,
        paddingVertical: 0
    },
    ButtonStylePrimary: {
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#5F27A4",
        backgroundColor: "#5F27A4",
        paddingVertical: 2,
        marginHorizontal: 5,
        marginBottom: 20
    },
    ButtonTextPrimary: {
        color: "#FFFFFF",
        fontFamily: 'WorkSans-Regular',
        fontSize: 18,
        paddingVertical: 0
    },
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