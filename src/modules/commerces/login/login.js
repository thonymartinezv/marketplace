import React from 'react';
import {View,Text,StyleSheet,Image,Dimensions,Platform,ToastAndroid,AlertIOS, KeyboardAvoidingView} from 'react-native';
import {Item,Input,Button} from 'native-base'
import UsuarioSvg from '../../../../assets/icon/general/usuario.svg'
import CandadoSvg from '../../../../assets/icon/general/candado.svg'
import AdminCommerces from '../../../model/AdminCommerces';


export default class Login extends React.Component{

    constructor(props){
        super(props)
        /*
        this.state = {
            email:"",
            pass:""
        }
        */
        this.state = {
            email:"correo.proof.5244@gmail.com",
            pass:"12345678"
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
        var result = await AdminCommerces.loginCommerce(this.state.email,this.state.pass)
        if(result){
          this.notifyMessage("Usuario Logueado correctamente")
          this.props.navigation.navigate('historyBuyNav')
        }else{
          this.notifyMessage("El usuario o la contraseña que ingreso son incorrectos")
        }
    }

    render(){
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
                        onPress={() => this.props.navigation.navigate('recoverCo')} 
                        transparent style={styles.btn_small}>
                            <Text style={styles.text_btn_small}>¿Olvidaste tu constraseña?</Text>
                    </Button>
                    <Button 
                        onPress={this.login} 
                        style={styles.btn_login} block>
                            <Text style={styles.text_btn_login}>Iniciar sesión</Text>
                    </Button>
                    <Button 
                        onPress={() => this.props.navigation.navigate('registerCo')} 
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