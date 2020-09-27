import React,{Component} from "react"
import {StyleSheet,View,ImageBackground,Dimensions,Modal,KeyboardAvoidingView,Image, Alert, Platform, ToastAndroid} from 'react-native'
import { Container, Header, Content, FooterTab, Footer, Thumbnail, Form, Item, Input, Label, Text, Left, Body, Title, Button, Icon, Spinner } from 'native-base';
import AdminUsers from "../../../model/AdminUsers";
import User from "../../../model/User";
import PhoneSvg from '../../../../assets/icon/general/phone.svg';
import EmailSvg from '../../../../assets/icon/general/email.svg';
import LocationSvg from '../../../../assets/icon/general/location.svg';
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import GallerySvg from '../../../../assets/icon/general/galeria.svg';
import EditarCircleSvg from '../../../../assets/icon/general/editar_circle.svg'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import firebase from '../../../firebase/Firebase'
import 'firebase/storage'
import {Pedido,getNewArrayProductP,getNewArrayMed} from '../../../model/Pedido'

export default class EditPerfil extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            userData: new User(),
            userDataResp:new User(),
            image:null,
            imageResp:null,
            modalPhoto:false,
            load:false,
            modalPass:false,
            pass:"",
            newPass:"",
            newPassRepeat:""
        }
        this.user = AdminUsers.getCurrentUser()
        AdminUsers.getDataUser(this.user.uid)
        .then((userData)=>{
            let userResp = new User(JSON.parse(JSON.stringify(userData)))
            this.getUrl(userData.profile)
            this.setState({userData,userDataResp:userResp,load:true})
        })
    }

    cancelar = ()=>{
        let userResp = new User(JSON.parse(JSON.stringify(this.state.userDataResp)))
        this.setState({userData:userResp,image:this.state.imageResp})
    }

    selectPicture = async ()=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if(status != 'granted'){
            console.error("permissions CAMERA_ROLL is denied");
        }
        await this._pickImage()
    }

    _pickImage = async () => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          if (!result.cancelled) {
            var userData = this.state.userData
            var image = result.uri.split("/")
            userData.profile = image[image.length-1]
            this.setState({userData,image:result.uri})
          }
        } catch (E) {
          console.error(E);
        }
    }

    selectPictureCamera = async ()=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA)
        if(status != 'granted'){
            console.error("permissions CAMERA is denied");
        }
        await this._pickImageCamera()
    }

    _pickImageCamera = async () => {
        try {
          let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          if (!result.cancelled) {
            var userData = this.state.userData
            var image = result.uri.split("/")
            userData.profile = image[image.length-1]
            this.setState({userData,image:result.uri})
          }
        } catch (E) {
          console.error(E);
        }
    }

    uploadImageAsync = async (image_uri,image_name)=>{
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function() {
            resolve(xhr.response);
          };
          xhr.onerror = function(e) {
            console.error(e);
            reject(new TypeError('Network request failed'));
          };
          xhr.responseType = 'blob';
          xhr.open('GET',image_uri, true);
          xhr.send(null);
        });
      
        const ref = firebase
          .storage()
          .ref()
          .child("client_profile/"+image_name);
        const snapshot = await ref.put(blob);
      
        blob.close();
        return await snapshot.ref.getDownloadURL();
    }

    actualizar = async()=>{
        let user = this.state.userData
        if(user.email != this.state.userDataResp.email){
            if (await AdminUsers.checkedEmail(user.email)) {
                Alert.alert("Mensaje","El correo que ingresó ya fue registrado anteriormente, por favor verifique")
                this.setState({load:true})
                return false
            }
            if (!await AdminUsers.updateUserEmail(user.email)) {
                Alert.alert("Mensaje","La actualización de perfil ha fallado")
                this.setState({load:true})
                return false
            }
        }
        if(this.state.userData.profile && this.state.image){
            await this.uploadImageAsync(this.state.image,this.state.userData.profile)
        }
        if(await AdminUsers.updateUserData(user)){
            Alert.alert("Mensaje","Actualización de perfil exitosa")
            let userResp = new User(JSON.parse(JSON.stringify(this.state.userData)))
            this.setState({load:true,userDataResp:userResp,imageResp:this.state.image})
        }else{
            Alert.alert("Mensaje","La actualización de perfil ha fallado")
            this.setState({load:true})
        }
    }

    modalPhoto = () =>{
        return(
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalPhoto}
                onRequestClose={() => {

                }}
            >
                <View style={{
                    width:"100%",
                    height:"100%",
                    backgroundColor:"rgba(0, 0, 0, 0.4)",

                }}>
                    <View style={{
                        width:Dimensions.get('window').width*0.8,
                        marginVertical:Dimensions.get('window').height*0.3,
                        marginHorizontal:Dimensions.get('window').width*0.1,
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
                        paddingHorizontal:Dimensions.get('window').width*0.025,
                    }}>
                        <Button block 
                            onPress={()=>{
                                    this.setState({modalPhoto:false})
                                    this.selectPicture()
                                }
                            }
                            style={{
                                backgroundColor:'#5F27A4',
                                marginBottom:Dimensions.get('window').height*0.025
                            }}
                        >
                            <Text style={{color:"white"}}>Seleccionar desde Galería</Text>
                        </Button>
                        <Button block 
                            onPress={()=>{
                                this.setState({modalPhoto:false})
                                this.selectPictureCamera()
                            }}
                            style={{
                                backgroundColor:'#5F27A4',
                                marginBottom:Dimensions.get('window').height*0.025
                        }}>
                            <Text style={{color:"white"}}>Seleccionar desde Cámara</Text>
                        </Button>
                    </View>
                </View>
            </Modal>
        )
    }

    async getUrl(imageName){
        try{
            var storage = firebase.storage()
            var pathReference = storage.ref("client_profile/"+imageName)
            var image = await pathReference.getDownloadURL()
            this.setState({image,imageResp:image})
        }catch(err){
            console.error("error en: ",err);
        }
    }

    

    render(){
        var ModalPhoto = this.modalPhoto
        var ModalPass = this.modalPassword
        if(!this.state.load) {
            return (<Spinner 
                size={Dimensions.get('window').height*0.10}
                style={{
                    flex: 1,
                    marginTop:Dimensions.get('window').height*0.05,
                    alignSelf:'center'
                }}
                color='#FDD501'
            />)
        }
        return(
            <View style={{ flex: 1, flexDirection: 'column', marginHorizontal: 20, marginTop: 15 }}>
                <ModalPhoto />
                <ModalPass />
                <View style={styles.content}>
                    <View style={{
                        width:Dimensions.get('window').width*0.5,
                        height:Dimensions.get('window').width*0.35,
                        alignItems:'center',
                        justifyContent:'center'
                    }}>
                        {this.state.userData.profile && this.state.image?
                            <Thumbnail large source={{uri:this.state.image}}
                                style={styles.profile}
                            />
                        :
                            <Thumbnail large source={require("../../../../assets/img/general/user.png")}
                                style={styles.profile}
                            />
                        }
                        <View style={{
                            position:'absolute',
                            paddingLeft:Dimensions.get('window').width*0.35
                        }}>
                            <TouchableOpacity onPress={()=>{
                                this.setState({modalPhoto:true})
                            }}>
                                <EditarCircleSvg 
                                    width={Dimensions.get('window').width*0.1} 
                                    height={Dimensions.get('window').width*0.1}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <Form>
                    <Item floatingLabel last>
                        <Label>Nombre</Label>
                        <Input value={this.state.userData.name}
                            style={{
                                fontSize:Dimensions.get('window').width*0.04,
                                color:"#B3B3B3"
                            }} 
                            onChangeText={(text)=>{
                                /*
                                let userData = this.state.userData
                                userData.name = text
                                this.setState({userData})
                                */
                            }}
                        />
                    </Item>
                    <Item floatingLabel last>
                        <Label>DNI</Label>
                        <Input value={this.state.userData.dni}
                            style={{
                                fontSize:Dimensions.get('window').width*0.04,
                                color:"#B3B3B3"
                            }}
                            onChangeText={(text)=>{
                                /*
                                let userData = this.state.userData
                                userData.dni = text
                                this.setState({userData})
                                */
                            }}
                        />
                    </Item>
                    <View style={{
                        paddingTop:Dimensions.get('window').height*0.02, 
                        flexDirection: "row", alignContent: "center", 
                        alignItems: "center"
                    }}>
                        <PhoneSvg 
                            style={{marginTop: 15}} 
                            width={Dimensions.get('window').width*0.1} 
                            height={Dimensions.get('window').width*0.1} 
                        />
                        <View style={{
                            flexDirection:'column'
                        }}>
                            <View>
                                <Text style={{
                                    fontSize:Dimensions.get('window').width*0.04,
                                    color:'#9e9e9e'
                                }}>
                                    Teléfono
                                </Text>
                            </View>
                            <View style={{
                                width:Dimensions.get('window').width*0.8,
                                flexDirection:'row',
                                height:Dimensions.get('window').width*0.1,
                                alignItems:'center'
                            }}>
                                <View style={{
                                    width:Dimensions.get('window').width*0.115,
                                    borderBottomWidth:1,
                                    borderColor:'#d4d4d4',
                                    paddingLeft:Dimensions.get('window').width*0.03
                                }}>
                                    <TextInput
                                        style={{
                                            fontSize:Dimensions.get('window').width*0.04,
                                            color:"#B3B3B3"
                                        }} 
                                        value={this.state.userData.code_phone}
                                        maxLength={3}
                                    />
                                </View>
                                <View style={{
                                    width:Dimensions.get('window').width*0.685,
                                    borderBottomWidth:1,
                                    borderColor:'#d4d4d4',
                                }}>
                                    <TextInput
                                        style={{
                                            fontSize:Dimensions.get('window').width*0.04
                                        }} 
                                        value={this.state.userData.phone}
                                        onChangeText={(text)=>{
                                            let userData = this.state.userData
                                            userData.phone = text
                                            this.setState({userData})
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{flexDirection: "row", alignContent: "center", alignItems: "center"}}>
                        <LocationSvg style={{marginTop: 15}} 
                            width={Dimensions.get('window').width*0.1} 
                            height={Dimensions.get('window').width*0.1}  />
                        <Item style={{width:Dimensions.get('window').width*0.8}} floatingLabel last>
                            <Label>Dirección</Label>
                            <Input value={this.state.userData.dir}
                                style={{
                                    fontSize:Dimensions.get('window').width*0.04
                                }}
                                onChangeText={(text)=>{
                                    let userData = this.state.userData
                                    userData.dir = text
                                    this.setState({userData})
                                }} 
                            />
                        </Item>
                    </View>
                    <View style={{flexDirection: "row", alignContent: "center", alignItems: "center"}}>
                        <EmailSvg style={{marginTop: 15}} 
                            width={Dimensions.get('window').width*0.1} 
                            height={Dimensions.get('window').width*0.1}  />
                        <Item style={{width:Dimensions.get('window').width*0.8}} floatingLabel last>
                            <Label>Correo Electrónico</Label>
                            <Input value={this.state.userData.email}
                                style={{
                                    fontSize:Dimensions.get('window').width*0.04,
                                    color:"#B3B3B3"
                                }}
                                onChangeText={(text)=>{
                                    /*
                                    let userData = this.state.userData
                                    userData.email = text
                                    this.setState({userData})
                                    */
                                }} 
                            />
                        </Item>
                    </View>
                    <Button style={styles.btn_login2} block bordered light onPress={()=>{
                        this.setState({modalPass:true})
                    }}>
                            <Text style={styles.text_btn_login2}>Cambiar Contraseña</Text>
                    </Button>
                    <View style={styles.containerButton}>
                        <Button style={styles.btn_login3} block bordered light  onPress={() => {
                            this.cancelar()
                        }}>
                            <Text style={styles.text_btn_login3}>Cancelar</Text>
                        </Button>
                        <Button style={styles.btn_login} block bordered danger onPress={() => {
                            this.setState({load:false})
                            this.actualizar()
                        }}>
                            <Text style={styles.text_btn_login}>Actualizar</Text>
                        </Button>
                    </View>
                </Form>
            </View>
        )
    }
    changePass = async()=>{
        if(this.state.pass && this.state.newPass && this.state.newPassRepeat){
            if(this.state.newPass.length < 6){
                this.notifyMessage('La contraseña debe poseer al menos 6 caracteres,por favor intente de nuevo')
                this.setState({load:true,newPass:"",newPassRepeat:""})
                return false
            }
            if(this.state.newPass != this.state.newPassRepeat){
                this.notifyMessage('La contraseñas no coinciden, por favor intente de nuevo')
                this.setState({load:true,newPass:"",newPassRepeat:""})
                return false
            }
            var user = this.state.userData
            if(!await AdminUsers.loginUser(user.email,this.state.pass)){
                this.notifyMessage('La contraseña actual no es correcta, por favor intente de nuevo')
                this.setState({load:true,pass:""})
                return false
            }
            if (!await AdminUsers.updateUserPass(this.state.newPass)) {
                this.setState({load:true,pass:"",newPass:"",newPassRepeat:""})
                this.notifyMessage('Ha ocurrido un error inesperado')
                return false
            }
        }else{
            this.notifyMessage('Todos los campos son obligatorios')
            this.setState({load:true})
            return false
        }
        this.notifyMessage('La contraseña ha sido modificada exitosamente')
        this.setState({modalPass:false,load:true,pass:"",newPass:"",newPassRepeat:""})
    }
    notifyMessage(msg) {
        if (Platform.OS === 'android') {
          ToastAndroid.show(msg, ToastAndroid.SHORT)
        } else {
          AlertIOS.alert(msg);
        }
    }
    modalPassword = () =>{
        return(
            <Modal
                animationType="fade"
                transparent={true}
                visible={
                    this.state.modalPass
                }
                onRequestClose={() => {

                }}
            >
                <View style={{
                    width:"100%",
                    height:"100%",
                    backgroundColor:"rgba(0, 0, 0, 0.4)",
                    
                }}>
                <KeyboardAvoidingView 
                    keyboardVerticalOffset={-500} 
                    behavior="position" 
                    enabled
                >
                    <View style={{
                        width:Dimensions.get('window').width*0.8,
                        marginVertical:Dimensions.get('window').height*0.3,
                        marginHorizontal:Dimensions.get('window').width*0.1,
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
                        paddingHorizontal:Dimensions.get('window').width*0.025,
                    }}>
                        <View style={{
                            borderWidth:1,
                            borderColor:'#E6E6E6',
                            padding:10,
                            marginBottom:Dimensions.get('window').height*0.025
                        }}>
                            <TextInput 
                                placeholder="Ingrese su contraseña actual"
                                value={this.state.pass}
                                secureTextEntry={true}
                                onChangeText={(pass)=>{
                                    this.setState({pass})
                                }}
                            />
                        </View>
                        <View style={{
                            borderWidth:1,
                            borderColor:'#E6E6E6',
                            padding:10,
                            marginBottom:Dimensions.get('window').height*0.025
                        }}>
                            <TextInput 
                                placeholder="Ingrese la nueva contraseña"
                                value={this.state.newPass}
                                secureTextEntry={true}
                                onChangeText={(newPass)=>{
                                    this.setState({newPass})
                                }}
                            />
                        </View>
                        <View style={{
                            borderWidth:1,
                            borderColor:'#E6E6E6',
                            padding:10,
                            marginBottom:Dimensions.get('window').height*0.025
                        }}>
                            <TextInput 
                                placeholder="Ingrese una vez mas la nueva contraseña"
                                value={this.state.newPassRepeat}
                                secureTextEntry={true}
                                onChangeText={(newPassRepeat)=>{
                                    this.setState({newPassRepeat})
                                }}
                            />
                        </View>
                        <View style={styles.containerButton}>
                            <Button style={{
                                marginVertical: 5,
                                marginRight: 20,
                                paddingHorizontal: 10,
                                alignSelf:'center',
                                borderRadius: 6,
                                borderColor:"#8d8d8d"
                            }}  bordered light  onPress={() => {
                                this.setState({modalPass:false})
                            }}>
                                <Text style={{
                                    color:"#8d8d8d",
                                    fontWeight:"bold",
                                    fontSize:widhScreen*0.04
                                }}>
                                    Cancelar
                                </Text>
                            </Button>
                            <Button style={{
                                marginVertical: 5,
                                paddingHorizontal: 10,
                                alignSelf:'center',
                                borderRadius: 6,
                                borderColor:"#5F27A4"
                            }} bordered danger onPress={() => {
                                this.setState({load:false})
                                this.changePass()
                            }}>
                                <Text style={{
                                    color:"#5F27A4",
                                    fontWeight:"bold",
                                    fontSize:widhScreen*0.04
                                }}>
                                    Actualizar
                                </Text>
                            </Button>
                        </View>
                    </View>
                </KeyboardAvoidingView>
                </View>
            </Modal>
        )
    }
}


var widhScreen = Dimensions.get('window').width
var heightScreen = Dimensions.get('window').height
const styles = StyleSheet.create({
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
        marginVertical: 20,
        alignSelf:'center',
        borderColor:"#5F27A4",
        width: "100%",
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