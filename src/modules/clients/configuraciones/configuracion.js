import React from 'react'
import { StyleSheet,View,Image,Dimensions} from 'react-native';
import {Button,Text} from 'native-base'
import Logo from "../../../../assets/icon/general/logo.svg";
import Animated from 'react-native-reanimated';

export default class Configuracion extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
      return (
          <View style={styles.container}>
            <Animated.View
              style={{
                ...StyleSheet.absoluteFill,
                display: "flex",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Logo
                width={160}
                height={145}
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#clip)"
              />
            </Animated.View>
            <View style={styles.marginImg}>
              <Button style={styles.btn_login} block bordered danger  onPress={() => {
                  this.props.navigation.navigate("pedidos");
              }}>
                  <Text style={styles.text_btn_login}>Mis Pedidos</Text>
              </Button>
              <Button style={styles.btn_login} block bordered danger onPress={() => {
                  this.props.navigation.navigate("editPerfil");
              }}>
                  <Text style={styles.text_btn_login}>Editar Perfil</Text>
              </Button>
            </View>
          </View>
      )
  }
}

var widhScreen = Dimensions.get('window').width
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 40,
    marginTop:Dimensions.get('window').height*0.05,
    flex: 1,
    alignItems: "center",
  },
  marginImg: {
    marginTop: 200,
    width: "98%"
  },
  btn_login:{
    width: "100%",
    height: 70,
    marginVertical: 16,
    paddingVertical: 60,
    alignSelf:'center',
    borderColor:"#5F27A4",
    backgroundColor: "#5F27A4",
    borderRadius: 10
  },
  text_btn_login:{
    color:"#FFFFFF",
    fontFamily: 'WorkSans-Bold',
    fontSize:widhScreen*0.05
  },
})