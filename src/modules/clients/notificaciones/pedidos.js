import React from 'react'
import { Container, Content, List, ListItem, Thumbnail, Text, Left, Body, Item, Spinner, View } from 'native-base'
import { Dimensions, StyleSheet } from "react-native"
import { FlatList } from 'react-native-gesture-handler'
import AdminUsers from '../../../model/AdminUsers'
import 'firebase/storage'
import firebase from '../../../firebase/Firebase'
import GallerySvg from '../../../../assets/icon/general/galeria.svg'
class Photo extends React.Component{

    constructor(props){
        super(props)
    }

    render(){
            switch (this.props.status) {
                case -1:
                    return(
                        <Thumbnail 
                            square 
                            style={this.props.style} 
                            source={require('../../../../assets/img/general/unCheck.png')} 
                        />
                    )
                case 0:
                    return(
                        <Thumbnail 
                            square 
                            style={this.props.style} 
                            source={require('../../../../assets/img/general/waitCheck.png')} 
                        />
                    )
                case 1:
                    return(
                        <Thumbnail 
                            square 
                            style={this.props.style} 
                            source={require('../../../../assets/img/general/check.png')} 
                        />
                    )
                default:
                    return(<GallerySvg 
                        style={this.props.style} 
                    />)
            }
    }
}

export default class ListStoreScreen extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            pedidos:[],
            onLoad:false,
            focus:true
        }
        this.props.navigation.addListener('focus', () => {
            this.setState({pedidos:[],onLoad:false,focus:true})
            AdminUsers.getDataPedidosFromUser()
            .then((pedidos)=>{
                if (this.state.focus) {
                    this.setState({pedidos,onLoad:true})
                }
            })
        })
        this.props.navigation.addListener('blur', () => {
            this.setState({focus:false})
        })
    }
    
    detalleStore = (pedido)=>{
        this.props.navigation.navigate('pedidoConfig',{pedido:pedido})
    }

    item = ({pedido})=>{
        var work = (fun)=>{return fun()}
        return(
        <ListItem thumbnail style={styles.viewItem} onPress={() => this.detalleStore(pedido)}>
            <Left style={styles.thumbail}>
                <Photo 
                    status={pedido.state}
                    style={styles.image}
                />
            </Left>
            <Body style={styles.body}>
                <Text numberOfLines={1} style={styles.title}>Pedido #{pedido.id}</Text>
                {work(()=>{
                    switch (pedido.state){
                        case -1:
                            return (
                                <Text numberOfLines={1} style={styles.textFail}>
                                    Ha sido rechazado
                                </Text>
                            )
                        case 0:
                            return (
                                <Text numberOfLines={1} style={styles.textProcess}>
                                    En proceso
                                </Text>
                            )
                        case 1:
                            return (
                                <Text numberOfLines={1} style={styles.textSucces}>
                                    Ha sido aprobado
                                </Text>
                            )
                    }
                })}
                <Text note numberOfLines={1} style={styles.textDate}>
                    {pedido.listProducts[pedido.listProducts.length-1].createAt.getDate()}-
                    {pedido.listProducts[pedido.listProducts.length-1].createAt.getMonth()+1}-
                    {pedido.listProducts[pedido.listProducts.length-1].createAt.getFullYear()}
                </Text>
            </Body>
        </ListItem>
        )
    }

    render(){
        if(!this.state.onLoad) {
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
        if(this.state.pedidos.length < 1){
            return (
                <View style={{
                    width:'100%',
                    height:'90%',
                    alignItems:'center',
                    justifyContent:'center'
                }}>
                    <Text style={{
                        color:"#b3b3b3",
                        fontSize:Dimensions.get('window').width*0.05
                    }}>
                        No has realizado pedidos aún.
                    </Text>
                </View>
            )
        }
        var Item = this.item
        return (
            <Container>
                <Content>
                    <List style={styles.container}>
                    <FlatList
                        data={this.state.pedidos}
                        renderItem={({item})=>{
                            return (<Item 
                                pedido={item}
                            />)
                        }}
                    />
                    </List>
                </Content>
            </Container>
        )
    }
    
}

const styles = StyleSheet.create({
    container: {
       marginTop: 10
    },
    viewItem: {
        borderWidth: 1,
        marginHorizontal: 18,
        marginBottom: 8,
        borderColor: "transparent",
        overflow: 'visible',
        shadowColor: "#C2820F",
        shadowOpacity: 1,
        shadowRadius: 24,
        elevation: 4,
        borderRadius: 8,
        paddingVertical: 2
    },
    thumbail: {
        paddingLeft: 5,
        marginTop: 5
    },
    body: {
        borderWidth: 0,
        borderColor: "transparent",
    },
    textDate: {
        marginVertical: 6,
        fontSize: 9,
        right: 0,
        position: "absolute",
        bottom: 2,
        color: "#C2820F"
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 15
    },
    title: {
        fontSize: 16,
        fontFamily: 'WorkSans-Bold',
        marginTop: -10, color: "#5F27A4"
    },
    text: {
        marginBottom: 10,
        fontSize: 12,
        fontFamily: 'WorkSans-Regular',
        color: "#5F27A4"
    },
    textSucces:{
        marginBottom: 10,
        fontSize: 12,
        fontFamily: 'WorkSans-Regular',
        color: "#009245"
    },
    textFail:{
        marginBottom: 10,
        fontSize: 12,
        fontFamily: 'WorkSans-Regular',
        color: "#EA5743"
    },
    textProcess:{
        marginBottom: 10,
        fontSize: 12,
        fontFamily: 'WorkSans-Regular',
        color: "#3f48cc"
    }
});