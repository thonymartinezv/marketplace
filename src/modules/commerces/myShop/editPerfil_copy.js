import React,{Component} from "react"
import {StyleSheet,ImageBackground,Dimensions,Image,KeyboardAvoidingView,Picker} from 'react-native'
import {View, Container, Header,Content, FooterTab, Footer, Thumbnail, Form, Item, Input, Label, Text, Left, Body, Title, Button, Icon } from 'native-base';
import Carousel from "../../../components/productos/Carousel"


import PhoneSvg from '../../../../assets/icon/general/phone.svg';
import EmailSvg from '../../../../assets/icon/general/email.svg';
import LocationSvg from '../../../../assets/icon/general/location.svg';
import { ScrollView } from "react-native-gesture-handler";

export default class EditPerfil extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            category:"0",
            _categories:[
                {id:"1",name:"Mendoza, Avenida Top 23"},
                {id:"2",name:"AV. JOSE LARCO NRO. 1232"}
            ]
        }
    }

    render(){
        return(
            <ScrollView>
            <KeyboardAvoidingView style={{flex:1,flexDirection:'column'}} keyboardVerticalOffset={-150} behavior="position" enabled>
                <View style={styles.titleStore}>
                    <Text style={[styles.titleTextStore, styles.fontFamily]}>NOMBRE DE LA TIENDA</Text>
                </View>
                <Carousel
                    arrayImages={[]}
                    height={180}
                    width={Dimensions.get('window').width}
                    type={"prueba"}
                />
            <View style={{ flexDirection: 'column', marginHorizontal: 20, marginTop: 15 }}>
                <Form>
                    <Item floatingLabel>
                        <Label>Nombre</Label>
                        <Input value={"NOMBRE DE LA TIENDA"}/>
                    </Item>
                    <Item floatingLabel last>
                        <Label>RUC</Label>
                        <Input value={"1221651565165"}/>
                    </Item>
                    <View style={{padding:Dimensions.get('window').height*0.008, flex: 1, marginTop: 10, flexDirection: "row", alignContent: "center", alignItems: "center"}}>
                        <PhoneSvg style={{marginTop: 15}} width={44} height={44} />
                        <Item style={{width: "86%"}} floatingLabel last>
                            <Label>Teléfono</Label>
                            <Input value={"+54 1233213213"}/>
                        </Item>
                    </View>
                    <View style={{padding:Dimensions.get('window').height*0.008, marginTop: 10, marginBottom:Dimensions.get('window').height*0.01, flex: 1, flexDirection: "row", alignContent: "center", alignItems: "center"}}>
                        <LocationSvg style={{marginTop: 15}} width={44} height={44} />
                            <View
                                style={{
                                    marginTop:Dimensions.get('window').width*0.03,
                                    width: "86%",
                                    borderColor: '#cccccc',
                                    borderBottomWidth:1,
                                    borderTopWidth:1,
                                    borderLeftWidth:1,
                                    borderRightWidth:1,
                                    borderRadius: 10,
                                    alignSelf: 'center',
                                    marginLeft:Dimensions.get('window').width*0.02
                            }}>
                                <Picker  
                                    selectedValue='2'
                                    mode="dropdown"
                                    onValueChange={(cat) =>{
                                        this.setState({category: cat})
                                        //this.getCommerces(cat)
                                    }}
                                >
                                <Picker.Item value="0" label="Seleccionar..."/>
                                {
                                    this.state._categories.map( (item) => {
                                        return <Picker.Item value={item.id} label={item.name} />
                                    })
                                }
                                </Picker>
                            </View>
                    </View>
                    <View style={{padding:Dimensions.get('window').height*0.008, flex: 1, flexDirection: "row", alignContent: "center", alignItems: "center"}}>
                        <EmailSvg style={{marginTop: 15}} width={44} height={44} />
                        <Item style={{width: "86%"}} floatingLabel last>
                            <Label>Correo Electrónico</Label>
                            <Input value={"nombre.tienda@mail.com"}/>
                        </Item>
                    </View>
                    <Button style={styles.btn_login2} block bordered light >
                            <Text style={styles.text_btn_login2}>Cambiar Contraseña</Text>
                    </Button>
                    <View style={styles.containerButton}>
                        <Button style={styles.btn_login3} block bordered light  onPress={() => {
                        }}>
                            <Text style={styles.text_btn_login3}>Cancelar</Text>
                        </Button>
                        <Button style={styles.btn_login} block bordered danger >
                            <Text style={styles.text_btn_login}>Actualizar</Text>
                        </Button>
                    </View>
                </Form>
            </View>
            </KeyboardAvoidingView>
            </ScrollView>
        )
    }
}


var widhScreen = Dimensions.get('window').width
var heightScreen = Dimensions.get('window').height
const styles = StyleSheet.create({
    titleStore: {
        paddingVertical: Dimensions.get('window').height*0.015,
        backgroundColor: '#5F27A4',
        alignItems: "center"
    },
    titleTextStore: {
        color: "#ffffff",
        fontSize: 15
    },
    fontFamily: {
        fontFamily: "WorkSans-Regular"
    },
    map_image:{
        width: Dimensions.get('window').width*0.9,
        height:Dimensions.get('window').height*0.1
    },
    imageBackground:{
        width:Dimensions.get('window').width*1.3,
        height:Dimensions.get('window').height*0.3,
    },
    view_image:{
        paddingVertical:Dimensions.get('window').width*0.05,
        paddingHorizontal:Dimensions.get('window').width*0.1,
        backgroundColor:"rgba(0, 0, 0, 0.5)",
        height:"100%",
        width:"100%"
    },
    items_icon:{
        color:"#E84B27",
        width: 42,
        height: 42
    },
    footerTab:{
      backgroundColor:"#F2F2F2"
    },
    icon:{
        color:"#8d8d8d",
        width: 40,
        height: 40
    },
    icon_active:{
        color:"#E84B27"
    },
    button_online:{
        marginTop:Dimensions.get('window').width*0.01
    },
    text_horario:{
        fontWeight:"bold",
        color:"#E84B27"
    },
    content:{
        alignItems: 'center',
    },
    text:{
        fontSize:25,
        fontWeight:"bold",
        flex: 1,
        textAlignVertical:"bottom",
        color:'white'
    },
    text_small:{
        fontSize:15,
        fontWeight:"bold",
        color:'white'
    },
    buttonContainer: {
        marginTop: 20,
        width: "48%",
    },
    containerButton: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 20,
    },
    btn_login2:{
        marginVertical: 30,
        alignSelf:'center',
        borderColor:"#5F27A4",
        width: "60%",
        borderRadius: 6,
        backgroundColor: "#5F27A4"
    },
    text_btn_login2:{
        color:"#FFFFFF",
        fontWeight: "bold",
        fontSize: 14
    },
    btn_login:{
        marginVertical: 5,
        paddingHorizontal: 20,
        alignSelf:'center',
        borderRadius: 6,
        borderColor:"#5F27A4"
    },
    btn_login3:{
        marginVertical: 5,
        marginRight: 20,
        paddingHorizontal: 20,
        alignSelf:'center',
        borderRadius: 6,
        borderColor:"#8d8d8d"
    },
    text_btn_login:{
        color:"#5F27A4",
        fontWeight:"bold",
        fontSize:widhScreen*0.04
    },
    text_btn_login3:{
        color:"#8d8d8d",
        fontWeight:"bold",
        fontSize:widhScreen*0.04
    },
    content:{
        alignItems: 'center',
        paddingTop:Dimensions.get('window').height*0.035
    },
    profile:{
        width:Dimensions.get('window').width*0.35,
        height:Dimensions.get('window').width*0.35,
        borderRadius:Dimensions.get('window').width*0.5
    },
    containerButton: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 20,
        justifyContent: "center"
    },
});