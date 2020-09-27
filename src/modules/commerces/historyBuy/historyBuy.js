import React from 'react'
import { Container, Content, List, ListItem, Thumbnail,Input,Item,Text, Left, Body } from 'native-base'
import { StyleSheet ,Dimensions} from "react-native"
import FindSvg from '../../../../assets/icon/general/lupa.svg'

export default function ListStoreScreen(props) {
    const { navigation } = props;
    
    const detalleStore = ()=>{
        navigation.navigate('pedidoDetailHistory')
    }

    return (
        <Container>
            <Content>
                <Item style={{borderColor:'#c9c9c9',marginTop:15}} rounded>
                    <FindSvg style={{
                            width:Dimensions.get('window').height*0.04,
                            height:Dimensions.get('window').height*0.04,
                            marginLeft:Dimensions.get('window').height*0.015
                        }} 
                        active name="find"
                    />
                    <Input placeholder='Buscar...' />
                </Item>
                <List style={styles.container}>
                <ListItem thumbnail style={styles.viewItem} onPress={() => detalleStore()}>
                        <Left style={styles.thumbail}>
                            <Thumbnail square style={styles.image} source={require("../../../../assets/img/customer/cliente1.jpg")} />
                        </Left>
                        <Body style={styles.body}>
                            <Text numberOfLines={1} style={styles.title}>Pedido #123445</Text>
                            <Text numberOfLines={1} style={styles.textFail}>Pago pendiente</Text>
                            <Text note numberOfLines={1} style={styles.textDate}> 25/06/2020 08:00pm</Text>
                        </Body>
                    </ListItem>
                    <ListItem thumbnail style={styles.viewItem} onPress={() => detalleStore()}>
                        <Left style={styles.thumbail}>
                            <Thumbnail square style={styles.image} source={require("../../../../assets/img/customer/cliente2.jpg")} />
                        </Left>
                        <Body style={styles.body}>
                            <Text numberOfLines={1} style={styles.title}>Pedido #123445</Text>
                            <Text numberOfLines={1} style={styles.textSucces}>Pedido Cancelado</Text>
                            <Text note numberOfLines={1} style={styles.textDate}> 25/06/2020 07:00am</Text>
                        </Body>
                    </ListItem>
                    <ListItem thumbnail style={styles.viewItem} onPress={() => detalleStore()}>
                        <Left style={styles.thumbail}>
                            <Thumbnail square style={styles.image} source={require("../../../../assets/img/customer/cliente3.jpg")} />
                        </Left>
                        <Body style={styles.body}>
                            <Text numberOfLines={1} style={styles.title}>Pedido #123445</Text>
                            <Text numberOfLines={1} style={styles.textSucces}>Pedido Cancelado</Text>
                            <Text note numberOfLines={1} style={styles.textDate}> 23/06/2020 06:00pm</Text>
                        </Body>
                    </ListItem>
                    <ListItem thumbnail style={styles.viewItem} onPress={() => detalleStore()}>
                        <Left style={styles.thumbail}>
                            <Thumbnail square style={styles.image} source={require("../../../../assets/img/customer/cliente4.jpg")} />
                        </Left>
                        <Body style={styles.body}>
                            <Text numberOfLines={1} style={styles.title}>Pedido #123445</Text>
                            <Text numberOfLines={1} style={styles.textSucces}>Pedido Cancelado</Text>
                            <Text note numberOfLines={1} style={styles.textDate}> 22/06/2020 10:00pm</Text>
                        </Body>
                    </ListItem>
                </List>
            </Content>
        </Container>
    );
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
    }
});