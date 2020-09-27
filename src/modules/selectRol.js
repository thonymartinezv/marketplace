import React from 'react'
import {Dimensions,Image} from 'react-native'
import { View , Text} from 'native-base'
import UsuarioSvg from '../../assets/icon/general/usuario.svg'
import TiendaSvg from '../../assets/icon/general/tienda.svg'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function selectRol({navigation}) {
    return(
        <View style={{
            flexDirection:'column',
            alignItems:'center',
            paddingVertical:Dimensions.get('window').height*0.05
        }}>
            <Image style={{
                width:Dimensions.get('window').width,
                height:Dimensions.get('window').height,
                position:"absolute",
                left: 0,
                top: 0,
                bottom:0,
            }} source={require('../../assets/background/fondo_login2.png')}/>
            <View style={{
                marginTop:Dimensions.get('window').height*0.6
            }}>
                <TouchableOpacity style={{
                    width:Dimensions.get('window').width,
                    paddingHorizontal:Dimensions.get('window').width*0.15
                }}
                    onPress={()=>navigation.navigate('clientsNav')}
                >
                    <View style={{
                        width:"100%",
                        flexDirection:'row',
                        justifyContent:'center',
                        paddingHorizontal:Dimensions.get('window').width*0.05,
                        borderRadius:Dimensions.get('window').width*0.035,
                        backgroundColor:'white',
                        borderWidth:1,
                        borderColor:'#5F27A4',
                    }}>
                        <UsuarioSvg style={{
                            width:Dimensions.get('window').width*0.225,
                            height:Dimensions.get('window').width*0.225
                        }}/>
                        <View style={{
                            flexDirection:'column',
                            justifyContent:'center',
                            alignItems:'center',
                            paddingHorizontal:Dimensions.get('window').width*0.07,
                        }}>
                            <Text style={{
                                fontSize:Dimensions.get('window').width*0.03,
                                color:'gray'
                            }}>
                                Ingresar Como
                            </Text>
                            <Text style={{
                                fontSize:Dimensions.get('window').width*0.055,
                                fontWeight:'bold',
                                color:'#5F27A4'
                            }}>
                                Cliente
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    width:Dimensions.get('window').width,
                    paddingHorizontal:Dimensions.get('window').width*0.15
                }}
                    onPress={()=>navigation.navigate('commercesNav')}
                >
                    <View style={{
                        width:"100%",
                        marginTop:Dimensions.get('window').height*0.01,
                        flexDirection:'row',
                        justifyContent:'center',
                        paddingHorizontal:Dimensions.get('window').width*0.05,
                        borderRadius:Dimensions.get('window').width*0.035,
                        backgroundColor:'white',
                        borderWidth:1,
                        borderColor:'#5F27A4',
                    }}>
                        <View style={{
                            padding:Dimensions.get('window').width*0.0375
                        }}>
                            <TiendaSvg style={{
                                width:Dimensions.get('window').width*0.15,
                                height:Dimensions.get('window').width*0.15
                            }}/>
                        </View>
                        <View style={{
                            flexDirection:'column',
                            justifyContent:'center',
                            alignItems:'center',
                            paddingHorizontal:Dimensions.get('window').width*0.04,
                        }}>
                            <Text style={{
                                fontSize:Dimensions.get('window').width*0.03,
                                color:'gray'
                            }}>
                                Ingresar Como
                            </Text>
                            <Text style={{
                                fontSize:Dimensions.get('window').width*0.055,
                                fontWeight:'bold',
                                color:'#5F27A4'
                            }}>
                                Tienda
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}