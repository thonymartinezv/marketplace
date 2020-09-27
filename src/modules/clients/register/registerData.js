import React,{Component} from "react"
import {StyleSheet,View,Dimensions, Modal, Alert, KeyboardAvoidingView, Platform, ToastAndroid} from 'react-native'
import {Thumbnail, Form, Item, Input, Label, Text, Button, Spinner} from 'native-base';
import PhoneSvg from '../../../../assets/icon/general/phone.svg';
import EmailSvg from '../../../../assets/icon/general/email.svg';
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import User from '../../../model/User'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import AdminUsers from '../../../model/AdminUsers'
import LocationSvg from '../../../../assets/icon/general/location.svg'
import firebase from '../../../firebase/Firebase'
import 'firebase/storage'
export default class Perfil extends Component{

    constructor(props){
        super(props)
        this.state = {
            user:new User(),
            image:null,
            modalVisible:false,
            setData:false
        }
        var user = this.state.user
        user.email = AdminUsers.getCurrentUser().email
        this.setState({user})
    }

    selectPicture = async ()=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if(status != 'granted'){
            console.error("permissions CAMERA_ROLL is denied");
        }
        await this._pickImage()
    }

    selectPictureCamera = async ()=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA)
        if(status != 'granted'){
            console.error("permissions CAMERA is denied");
        }
        await this._pickImageCamera()
    }

    notifyMessage(msg) {
        if (Platform.OS === 'android') {
          ToastAndroid.show(msg, ToastAndroid.LONG)
        } else {
            AlertIOS.alert(msg);
        }
    }

    setData = async ()=>{

        if(!this.state.setData){
            this.setState({
                setData:true
            })
            if(
                this.state.user.name &&
                this.state.user.dni &&
                this.state.user.dir &&
                this.state.user.code_phone &&
                this.state.user.phone &&
                this.state.user.email &&
                this.state.user.profile &&
                this.state.image 
            ){
                try{
                    await this.uploadImageAsync(this.state.image,this.state.user.profile)
                    var result = await AdminUsers.setUserData(this.state.user)
                    if(result){
                        this.notifyMessage("Se han guardado los resultados exitosamente")
                        this.setState({
                            setData:false
                        })
                        this.props.navigation.navigate("notificacionesNav")
                    }else{
                        this.setState({
                            setData:false
                        })
                        this.notifyMessage("Hubo un problema al registrar los datos")
                    }
                }catch(e){
                    this.setState({
                        setData:false
                    })
                    console.error(e);
                }
            }
            else{
                this.setState({
                    setData:false
                })
                this.notifyMessage("Verifique que todos los campos estén completados")
            }

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

    _pickImage = async () => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          if (!result.cancelled) {
            this.setState({ image: result.uri });
            var image = this.state.image.split("/")
            var user = this.state.user
            user.profile = image[image.length-1]
            this.setState({user})
          }
        } catch (E) {
          console.error(E);
        }
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
            this.setState({ image: result.uri });
            var image = this.state.image.split("/")
            var user = this.state.user
            user.profile = image[image.length-1]
            this.setState({user})
          }
        } catch (E) {
          console.error(E);
        }
    }


    modal = () =>{
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
                                this.setState({modalVisible:false})
                                this.selectPicture()
                            }}
                            style={{
                                backgroundColor:'#5F27A4',
                                marginBottom:Dimensions.get('window').height*0.025
                        }}>
                            <Text style={{color:"white"}}>Seleccionar desde Galería</Text>
                        </Button>
                        <Button block 
                            onPress={()=>{
                                this.setState({modalVisible:false})
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
    
    render(){
        if(this.state.setData){
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
            <ScrollView style={{backgroundColor:'white'}}>
                    {this.modal()}
                <KeyboardAvoidingView style={{paddingHorizontal:Dimensions.get('window').width*0.025}} keyboardVerticalOffset={-750} behavior="position" enabled>
                <View style={styles.content}>
                    <TouchableOpacity onPress={()=>{
                        this.setState({
                            modalVisible:true
                        })
                    }}>
                        {this.state.user.profile && this.state.image?
                            <Thumbnail large source={{uri:this.state.image}}
                                style={styles.profile}
                            />
                        :
                            <Thumbnail large source={require("../../../../assets/img/general/user.png")}
                                style={styles.profile}
                            />
                        }
                    </TouchableOpacity>
                </View>
                <Form>
                    <Item floatingLabel>
                        <Label style={{marginTop:-5}}>Nombre</Label>
                        <Input value={this.state.user.name}
                            onChangeText={(name)=>{
                                var user = this.state.user
                                user.name = name
                                this.setState({
                                    user
                                })
                            }}
                        />
                    </Item>
                    <Item floatingLabel>
                        <Label style={{marginTop:-5}}>DNI</Label>
                        <Input value={this.state.user.dni}
                            onChangeText={(dni)=>{
                                var user = this.state.user
                                user.dni = dni
                                this.setState({
                                    user
                                })
                            }}
                        />
                    </Item>
                    <View style={{flexDirection: "row", alignContent: "center", alignItems: "center"}}>
                        <LocationSvg width={44} height={44} />
                        <View style={{
                             flexDirection:'column',
                             paddingTop:5
                        }}>
                            <View style={{
                                marginBottom:-Dimensions.get('window').height*0.015,
                                marginHorizontal:Dimensions.get('window').width*0.0125
                            }}>
                                <Text style={{
                                    fontSize:Dimensions.get('window').width*0.035,
                                    color:'#656565'
                                }}>
                                    Coloque Dirección
                                </Text>
                            </View>
                            <View style={{
                                flexDirection:'row',
                                width:Dimensions.get('window').width*0.85
                            }}>
                                <Input placeholderTextColor="#656565"
                                    placeholder="Dirección" 
                                    value={this.state.user.dir}
                                    onChangeText={(dir)=>{
                                        var user = this.state.user
                                        user.dir = dir
                                        this.setState({
                                            user
                                        })
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{flexDirection: "row", alignContent: "center", alignItems: "center"}}>
                        <PhoneSvg width={44} height={44} />
                        <View style={{
                             flexDirection:'column',
                        }}>
                            <View style={{

                            }}>
                                <Text style={{
                                    fontSize:Dimensions.get('window').width*0.03,
                                    color:'#656565'
                                }}>
                                    Teléfono
                                </Text>
                            </View>
                            <View style={{
                                flex:1,
                                flexDirection:'row',
                                width:Dimensions.get('window').width*0.85
                            }}>
                                <View style={{
                                    width:Dimensions.get('window').width*0.1
                                }}>
                                    <Input placeholderTextColor="#656565"
                                        placeholder="+00" 
                                        value={this.state.user.code_phone}
                                        onChangeText={(code_phone)=>{
                                            var user = this.state.user
                                            user.code_phone = code_phone
                                            this.setState({
                                                user
                                            })
                                        }}
                                    />
                                </View>
                                <View style={{
                                    width:Dimensions.get('window').width*0.75
                                }}>
                                    <Input 
                                        placeholderTextColor="#656565"
                                        placeholder="000-000-000" 
                                        value={this.state.user.phone}
                                        onChangeText={(phone)=>{
                                            var user = this.state.user
                                            user.phone = phone
                                            this.setState({
                                                user
                                            })
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{flexDirection: "row", alignContent: "center", alignItems: "center"}}>
                        <LocationSvg width={44} height={44} />
                        <View style={{
                             flexDirection:'column',
                             paddingTop:5
                        }}>
                            <View style={{
                                marginBottom:-Dimensions.get('window').height*0.015,
                                marginHorizontal:Dimensions.get('window').width*0.0125
                            }}>
                                <Text style={{
                                    fontSize:Dimensions.get('window').width*0.035,
                                    color:'#656565'
                                }}>
                                    Correo Electrónico
                                </Text>
                            </View>
                            <View style={{
                                flexDirection:'row',
                                width:Dimensions.get('window').width*0.85
                            }}>
                                <Input placeholderTextColor="#656565"
                                    placeholder="ejemplo@gmail.com" 
                                    value={this.state.user.email}
                                    onChangeText={(email)=>{
                                        var user = this.state.user
                                        user.email = email
                                        this.setState({
                                            user
                                        })
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                    <Button style={styles.btn_login2} block bordered light >
                            <Text style={styles.text_btn_login2}>Cambiar Contraseña</Text>
                    </Button>
                    <View style={styles.containerButton}>
                        <Button style={styles.btn_login3} block bordered light  onPress={() => {
                            this.props.navigation.pop();
                        }}>
                            <Text style={styles.text_btn_login3}>Cancelar</Text>
                        </Button>
                        <Button style={styles.btn_login} block bordered danger onPress={this.setData}>
                            <Text style={styles.text_btn_login}>Guardar</Text>
                        </Button>
                    </View>
                </Form>
            </KeyboardAvoidingView>
            </ScrollView>
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
        justifyContent: "center"
    },
    btn_login2:{
        marginTop: 20,
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
        marginVertical: 20,
        paddingHorizontal: 20,
        alignSelf:'center',
        borderRadius: 6,
        borderColor:"#5F27A4"
    },
    btn_login3:{
        marginVertical: 20,
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