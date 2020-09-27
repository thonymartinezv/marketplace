import React from 'react'
import { StyleSheet,View,Image,Dimensions} from 'react-native';
import {Button,Text} from 'native-base'
import Logo from "../../../../assets/icon/general/logo.svg";
import Animated from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';

export default class PaySubs extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
      return (
        <ScrollView>
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
                width={150}
                height={135}
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#clip)"
              />
            </Animated.View>
            <View style={styles.marginImg}>
              <Button style={[styles.btn_login]} block bordered danger  onPress={() => {
              }}>
                  <View style={{
                      alignItems:'center'
                  }}>
                  <Text style={styles.text_btn_login}>Mensual</Text>
                  <Text style={styles.text_btn_login}>S/150</Text>
                  </View>
              </Button>
              <Button style={styles.btn_login2} block bordered danger  onPress={() => {
              }}>
                  <View style={{
                      alignItems:'center'
                  }}>
                    <Text style={styles.text_btn_login2}>Semestrar</Text>
                    <Text style={styles.text_btn_login2}>S/580</Text>
                  </View>
              </Button>
              <Button style={styles.btn_login} block bordered danger onPress={() => {
              }}>
                  <View style={{
                      alignItems:'center'
                  }}>
                    <Text style={styles.text_btn_login}>Anual</Text>
                    <Text style={styles.text_btn_login}>S/980</Text>
                  </View>
              </Button>
              <Button style={{borderColor:'#5F27A4',borderWidth:3,marginTop:20}} block bordered onPress={() => {
              }}>
                  <View style={{
                      alignItems:'center'
                  }}>
                    <Text style={{color:'#5F27A4',fontWeight:'bold'}}>Suscribirse</Text>
                  </View>
              </Button>
            </View>
          </View>
          </ScrollView>
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
    marginTop: 174,
    width: "98%"
  },
  btn_login:{
    width: "100%",
    height: Dimensions.get('window').height*0.1,
    marginVertical: Dimensions.get('window').height*0.015,
    paddingVertical: 60,
    alignSelf:'center',
    borderColor:"#5F27A4",
    backgroundColor: "#5F27A4",
    borderRadius: 10,
    alignItems:'center'
  },
  btn_login2:{
    width: "100%",
    height: Dimensions.get('window').height*0.1,
    marginVertical: Dimensions.get('window').height*0.015,
    paddingVertical: 60,
    alignSelf:'center',
    borderColor:"#5F27A4",
    borderRadius: 10,
    alignItems:'center'
  },
  text_btn_login:{
    color:"#FFFFFF",
    fontFamily: 'WorkSans-Bold',
    fontSize:widhScreen*0.05,
  },
  text_btn_login2:{
    color:"#5F27A4",
    fontFamily: 'WorkSans-Bold',
    fontSize:widhScreen*0.05,
  },
})