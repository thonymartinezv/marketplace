import React from 'react';
import {View,Text,StyleSheet,Image,Dimensions,Platform,ToastAndroid,AlertIOS, KeyboardAvoidingView, Alert} from 'react-native';
import {Item,Input,Button, Spinner} from 'native-base'
import UsuarioSvg from '../../../../assets/icon/general/usuario.svg'
import CandadoSvg from '../../../../assets/icon/general/candado.svg'
import AdminUsers from '../../../model/AdminUsers'


export default class Login extends React.Component{

    constructor(props){
        super(props)
        /*
        this.state = {
            email:"",
            pass:"",
            login:false
        }
        */
        this.state = {
            email:"anthony.mart1996@gmail.com",
            pass:"12345678",
            login:false
        }
    }
    notifyMessage(msg) {
        if (Platform.OS === 'android') {
          ToastAndroid.show(msg, ToastAndroid.SHORT)
        } else {
          AlertIOS.alert(msg);
        }
    }

    login = async ()=>{
        if(!this.state.login){
            this.setState({login:true})
            try{
                var user = await AdminUsers.loginUser(this.state.email,this.state.pass)
                //console.error('message',"resp: "+JSON.stringify(user))
                //return false
                if(user){
                    if(/*user.emailVerified*/true){
                        var userData = await AdminUsers.getDataUser(user.uid)
                        if(userData){
                            this.notifyMessage("Usuario Logueado correctamente")
                            this.props.navigation.navigate('productosNav')
                            this.setState({login:false})
                        }else{
                            this.notifyMessage('Ingrese sus datos')
                            this.props.navigation.navigate('registerData')
                            this.setState({login:false})
                        }
                    }else{
                        this.notifyMessage("Por favor verifique su correo eletrónico antes de ingresar")
                        this.setState({login:false})
                    }
                }else{
                    this.notifyMessage("El usuario o la contraseña que ingreso son incorrectos")
                    this.setState({login:false})
                }
            }catch(e){
                console.error("error: "+e);
                this.setState({login:false})
            }
        }
    }



    render(){
        if(this.state.login){
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
            <KeyboardAvoidingView keyboardVerticalOffset={-150} behavior="position" enabled>
            <View style={{
                flexDirection:'column',
                alignItems:'center',
                paddingVertical:Dimensions.get('window').height*0.05,
                paddingHorizontal:Dimensions.get('window').width*0.1
            }}>
                <Image style={{
                    width:Dimensions.get('window').width,
                    height:Dimensions.get('window').height,
                    position:"absolute",
                    left: 0,
                    top: 0,
                    bottom:0,
                }} source={require('../../../../assets/background/fondo_login2.png')}/>

                <View style={styles.content_form} >
                    <Text style={styles.text}>
                        Iniciar Sesión
                    </Text>
                    <Item style={styles.content_input} inlineLabel>
                        <UsuarioSvg style={styles.iconInput} />
                        <Input value={this.state.email} onChangeText={(email)=>this.setState({email})} 
                        placeholder="Ingresar Correo" style={styles.input}/>
                    </Item>
                    <Item style={styles.content_input} inlineLabel>
                        <CandadoSvg style={styles.iconInput} />
                        <Input value={this.state.pass} onChangeText={(pass)=>this.setState({pass})}
                        secureTextEntry={true} placeholder="Ingresar Contraseña" style={styles.input}/>
                    </Item>
                    <Button 
                        onPress={() => this.props.navigation.navigate('recover')} 
                        transparent style={styles.btn_small}>
                            <Text style={styles.text_btn_small}>¿Olvidaste tu constraseña?</Text>
                    </Button>
                    <Button 
                        onPress={this.login} 
                        style={styles.btn_login} block>
                            <Text style={styles.text_btn_login}>Iniciar sesión</Text>
                    </Button>
                    <Button 
                        onPress={() => this.props.navigation.navigate('register')} 
                        transparent style={styles.btn_small}>
                            <Text style={styles.text_btn_small}>¿Aún no te has registrado? Únete aquí</Text>
                    </Button>
                </View>
            </View>
            </KeyboardAvoidingView>
        )
    }

}

const styles = StyleSheet.create({
    content_input:{
        marginTop:Dimensions.get('window').height*0.015,
        backgroundColor:'white',
    },
    content_form:{
        width:'100%',
        alignItems:'center',
        marginTop: Dimensions.get('window').height*0.44
    },
    input: {
        marginVertical: -10
    },
    text:{
        marginTop:Dimensions.get('window').height*0.105,
        color:"#5F27A4",
        fontSize:Dimensions.get('window').width*0.0525,
        fontWeight: "bold"
    },
    iconInput:{
        width: Dimensions.get('window').width*0.09,
        height: Dimensions.get('window').width*0.1
    },
    btn_small:{
        alignSelf:'center'
    },
    text_btn_small:{
        fontSize:Dimensions.get('window').width*0.034,
        color:"#FFFFFF"
    },
    btn_login:{
        backgroundColor:'#5F27A4',
    },
    text_btn_login:{
        color:"#FFFFFF",
        fontSize:Dimensions.get('window').width*0.04
    }
});