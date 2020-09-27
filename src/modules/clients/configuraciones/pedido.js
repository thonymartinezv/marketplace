import React from 'react';
import { StyleSheet, View, Dimensions, Text, ScrollView, Alert } from "react-native";
import { Button, Divider, Input } from "react-native-elements";
import { Content, List, ListItem, Thumbnail, Left, Body, Spinner } from 'native-base';
import AdminCommerces from '../../../model/AdminCommerces';
import GallerySvg from '../../../../assets/icon/general/galeria.svg'
import 'firebase/storage'
import firebase from '../../../firebase/Firebase'

const screenWidth = Dimensions.get('window').width;

class Photo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            uri:""
        }
        if(this.props.producto.imagen1 && !this.props.producto.imagenUri1){
            this.getUrl(this.props.producto.imagen1)
        }
    }
    async getUrl(image){
        try{
            var storage = firebase.storage()
            var pathReference = storage.ref("commerce_profile/"+image)
            var uri = await pathReference.getDownloadURL()
            this.props.onLoadImage(uri)
            this.setState({uri})
        }catch(err){
            console.error("error en: ",err);
        }
    }
    render(){
        if(this.state.uri){
            return(<Thumbnail square style={styles2.image} source={{uri:this.state.uri}} />)
        }
        return(<GallerySvg
            style={styles2.image}
        />)
    }
}

class ProductPedido extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            load:false
        }
        this.commerce = null
        AdminCommerces.getDataCommerce(this.props.productPedido.idTIenda)
        .then((commerce)=>{
            this.commerce = commerce
            this.setState({load:true})
        })
    }

    render(){
        
        let productPedido = this.props.productPedido
        return(
            productPedido.medidas.map((medida)=>{
                if (!this.state.load) {
                    return(<View style={{
                        width:"100%",
                        height:Dimensions.get('window').height*0.2
                    }}>
                        <Spinner 
                            size={Dimensions.get('window').height*0.075}
                            style={{
                                flex: 1,
                                alignSelf:'center'
                            }}
                            color='#FDD501'
                        />
                    </View>)
                }
                return(<ListItem thumbnail style={styles2.viewItem}>
                    <Left style={styles2.thumbail}>
                        <View style={{height:Dimensions.get('window').height*0.0075}}/>
                        <Text style={styles2.title}>{this.commerce.name}</Text>
                        <Photo 
                            producto={this.props.productPedido}
                            onLoadImage={(uri)=>{
                                
                            }} 
                        />
                        <View style={{height:Dimensions.get('window').height*0.01}}/>
                    </Left>
                    <Body style={styles2.body}>
                        <View style={{
                            flex: 1,
                            alignItems: "flex-end",
                            position:'absolute',
                            width:'100%',
                            padding:15
                        }}>
                            <Text style={styles2.stop}>
                                {medida.stock}
                            </Text>
                        </View>
                        <View style={{flex: 1, alignContent: "center", alignItems: "center", marginLeft: -50}}>
                            <Text numberOfLines={2} style={styles2.title}>{productPedido.name}</Text>
                            {medida.talla?
                            <Text numberOfLines={2} style={styles2.text}>Talla: {medida.talla}</Text>
                            :null}
                            <Text numberOfLines={2} style={styles2.text}>Color:{medida.color}</Text>
                            <Text numberOfLines={1} style={styles2.text2}>S/ {productPedido.price}</Text>
                        </View>
                    </Body>
                </ListItem>)
            })
        )
    }
}

export default class pedidosDetail extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            constructor:true,
            focus:false
        }
        this.pedido = props.route.params.pedido
        this.props.navigation.addListener('focus', () => {
            if (this.state.constructor) {
                this.setState({constructor:false,focus:true})
            }else{
                console.log("no hubo constructor")
                this.props.navigation.navigate("pedidos")
            }
        })
        this.props.navigation.addListener('blur', () => {
            this.setState({focus:false})
        })
        let {stock , price} = this.total()
        this.stock = stock
        this.price = price
    }

    total = ()=>{
        let stock = 0
        let price = 0
        this.pedido.listProducts.map((productPedido)=>{
            productPedido.medidas.map((medida)=>{
                stock+=parseInt(medida.stock)
                price+=(parseInt(productPedido.price)*parseInt(medida.stock))
            })
        })
        return {stock,price}
    }

    

    render(){
        if (!this.state.focus) {
            //return(<View></View>)
        }
        return (
            <ScrollView style={styles.scrollView}>
                <View style={styles.titleStore}>
        <Text style={[styles.titleTextStore, styles.fontFamily]}>Nro. Pedido #{this.pedido.id}</Text>
                </View>
    
                <Divider style={styles.divider} />
                
                <Content style={{height: "100%"}}>
                    <List style={styles2.container}>
                        {this.pedido.listProducts.map((productPedido)=>{
                            return (<ProductPedido
                                productPedido={productPedido} 
                            />)
                        })}
                        <ListItem thumbnail style={styles2.viewItem2}>
                            <Left style={styles2.thumbail}>
                                <Text numberOfLines={2} style={[styles2.title, {marginBottom: 10}]}>Depósito</Text>
                                <Thumbnail square style={styles2.image} source={require("../../../../assets/img/yape.png")} />
                            </Left>
                            <Body style={styles2.body}>
                                <View style={{flex: 1, alignContent: "flex-end", alignItems: "flex-end"}}>
                                <Text numberOfLines={1} style={styles2.stop}>{this.stock}</Text>
                                </View>
                                <View style={{flex: 1, alignContent: "center", alignItems: "center", marginLeft: -40, marginTop: -6}}>
                                    <Text numberOfLines={2} style={styles2.title}>Total: S/ {this.price}</Text>
                                    <Text numberOfLines={2} style={styles2.text}>Metodo de pago: Depósito</Text>
                                    <Button
                                        title="Aprobado"
                                        type="outline"
                                        containerStyle={styles.containerButtomPrimary}
                                        buttonStyle={styles.ButtonStylePrimary}
                                        titleStyle= {styles.ButtonTextPrimary}
                                        onPress={async () => {
                                            
                                        }}
                                    />
                                </View>
                            </Body>
                        </ListItem>
                    </List>
                </Content>
            </ScrollView>
        )
    }
}



const styles = StyleSheet.create({
    data: {
        flex: 1,
        flexDirection: "row",
        marginHorizontal: 12,
        marginVertical: 2
    },
    imageProfile: {
        marginTop: 10,
        width: 120,
        height: 120,
        borderRadius: 60,
        marginRight: 5
    },
    containerImage: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        width: "100%",
        marginHorizontal: 20,
        marginBottom: 20,
        marginTop: -20
      },
    titleStore: {
        paddingVertical: 10,
        flex: 1,
        alignItems: "flex-end",
        marginRight: 10
    },
    titleTextStore: {
        color: "#5F27A4",
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
        width: "80%",
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
        paddingVertical: Dimensions.get('window').height*0.01,
        height:Dimensions.get('window').height*0.2
    },
    viewItem2: {
        borderWidth: 1,
        marginRight: 5,
        marginBottom: 8,
        borderColor: "transparent",
        paddingVertical: 2
    },
    thumbail: {
        marginLeft: 20,
        paddingHorizontal: 5,
        flexDirection: "column",
        alignItems: "center",
        width: "36%",
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
        borderRadius: 50,
        paddingVertical: 6,
        paddingHorizontal: 10
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