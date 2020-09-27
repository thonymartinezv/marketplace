import React from 'react';
import {View,Text,StyleSheet,Image,Dimensions} from 'react-native';
import {Item,Input,Button} from 'native-base'
import UsuarioSvg from '../../../../assets/icon/general/usuario.svg'
import CandadoSvg from '../../../../assets/icon/general/candado.svg'


export default class Recover extends React.Component{

    constructor(props){
        super(props)

        
    }

    render(){
        return(
            <View style={{
                flexDirection:'column',
                alignItems:'center',
                paddingVertical:Dimensions.get('window').height*0.05,
                paddingHorizontal:Dimensions.get('window').width*0.1
            }}>
                <Image style={{
                    width:Dimensions.get('window').width,
                    height:Dimensions.get('window').height,
                    position:"absolute"
                }} source={require('../../../../assets/background/fondo_login2.png')}/>

              
                <View style={styles.content_form} >
                <Text style={styles.text}>
                    Recuperar Contraseña
                </Text>
                <Text style={styles.text_btn_small}>
                    Ingrese la dirección de correo electrónico para recuperar su constraseña
                </Text>
                <Item style={styles.content_input} inlineLabel>
                    <UsuarioSvg style={styles.iconInput} />
                    <Input placeholder="Ingresar Correo" style={styles.input}/>
                </Item>
                <Button style={styles.btn_login} block>
                        <Text style={styles.text_btn_login}>Recuperar</Text>
                </Button>
                <Button transparent style={styles.btn_small}
                    onPress={() => this.props.navigation.navigate('login')} 
                >
                        <Text style={styles.text_btn_small2}>Volver</Text>
                </Button>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    content_input:{
        marginVertical:Dimensions.get('window').height*0.02,
        backgroundColor:'white'
    },
    text:{
        marginTop:Dimensions.get('window').height*0.12,
        color:"#5F27A4",
        fontSize:Dimensions.get('window').width*0.0525,
        fontWeight: "bold"
    },
    content_form:{
        width:'100%',
        alignItems:'center',
        marginTop: Dimensions.get('window').height*0.44
    },
    input: {
        marginVertical: -4
    },
    iconInput:{
        width: Dimensions.get('window').width*0.09,
        height: Dimensions.get('window').width*0.09
    },
    btn_small:{
        alignSelf:'center'
    },
    text_btn_small:{
        fontSize:Dimensions.get('window').width*0.025,
        marginTop:Dimensions.get('window').height*0.015,
        color:"#FFFFFF"
    },
    text_btn_small2:{
        fontSize:Dimensions.get('window').width*0.034,
        marginTop:Dimensions.get('window').height*0.015,
        color:"#FFFFFF"
    },
    btn_login:{
        backgroundColor:'#5F27A4'
    },
    text_btn_login:{
        color:"#FFFFFF",
        fontSize:Dimensions.get('window').width*0.04
    }
});