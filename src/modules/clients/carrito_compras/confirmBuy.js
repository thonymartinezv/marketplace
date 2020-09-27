import React, { useState, useRef, useCallback } from 'react';
import { StyleSheet, View, Dimensions, Text, ScrollView, Alert, CheckBox } from "react-native";
import { Button, Divider, Input } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import { Container, Content, List, ListItem, Thumbnail, Left, Body, Item, Label } from 'native-base';
import LocationSvg from '../../../../assets/icon/general/location.svg'

const screenWidth = Dimensions.get('window').width;

export default function pedidosDetail({navigation, route}) {
    const id = route.params?.id;
    const [commerce, setCommerce] = useState(null);
    const [photo, setPhoto] = useState(null);
    const locationData = {
        latitude: -12.029395928969581,
        latitudeDelta: 0.004825250563506245,
        longitude: -77.05021491274238,
        longitudeDelta: 0.002999715507016276
    };
    useFocusEffect(
        useCallback(() => {
      
        }, [])
    );

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.titleStore}>
                <Text style={[styles.titleTextStore, styles.fontFamily]}>Nro. Pedido #123344</Text>
            </View>

            <Divider style={styles.divider} />
            
            <Content style={{height: "100%"}}>
                <List style={styles2.container}>
                    <ListItem thumbnail style={styles2.viewItem}>
                        <Left style={styles2.thumbail}>
                            <Text numberOfLines={2} style={styles2.title}>Tienda Confenety</Text>
                            <Thumbnail square style={styles2.image} source={require("../../../../assets/img/prendas/prenda3.png")} />
                        </Left>
                        <Body style={styles2.body}>
                            <View style={{flex: 1, alignContent: "flex-end", alignItems: "flex-end", marginTop: -6}}>
                                <Text numberOfLines={1} style={styles2.stop}>6</Text>
                            </View>
                            <View style={{flex: 1, alignContent: "center", alignItems: "center", marginLeft: -50, marginTop: -6}}>
                                <Text numberOfLines={2} style={styles2.title}>Falda Azul</Text>
                                <Text numberOfLines={2} style={styles2.text}>Talla: SS</Text>
                                <Text numberOfLines={2} style={styles2.text}>Color: Azul</Text>
                                <Text numberOfLines={1} style={styles2.text2}>S/ 50</Text>
                            </View>
                        </Body>
                    </ListItem>
                    <ListItem thumbnail style={styles2.viewItem}>
                        <Left style={styles2.thumbail}>
                            <Text numberOfLines={2} style={styles2.title}>Tienda Uno Dos</Text>
                            <Thumbnail square style={styles2.image} source={require("../../../../assets/img/prendas/prenda4.png")} />
                        </Left>
                        <Body style={styles2.body}>
                            <View style={{flex: 1, alignContent: "flex-end", alignItems: "flex-end"}}>
                                <Text numberOfLines={1} style={styles2.stop}>3</Text>
                            </View>
                            <View style={{flex: 1, alignContent: "center", alignItems: "center", marginLeft: -50, marginTop: -6}}>
                            <Text numberOfLines={2} style={styles2.title}>Falda Rosa</Text>
                                <Text numberOfLines={2} style={styles2.text}>Talla: SS</Text>
                                <Text numberOfLines={2} style={styles2.text}>Color: Rosado</Text>
                                <Text numberOfLines={1} style={styles2.text2}>S/ 50</Text>
                            </View>
                        </Body>
                    </ListItem>
                    <ListItem thumbnail style={styles2.viewItem2}>
                        <Body style={styles2.body}>
                            <View style={{flex: 1, alignContent: "flex-end", alignItems: "flex-end"}}>
                                <Text numberOfLines={1} style={styles2.stop}>9</Text>
                            </View>
                            <View style={{flex: 1, alignContent: "center", alignItems: "center", marginLeft: -40, marginTop: -6}}>
                            <Text numberOfLines={2} style={styles2.title}>Total: S/ 250</Text>
                            <Text numberOfLines={2} style={styles2.text}>Metodo de pago: Depósito</Text>
                            <View style={{padding:Dimensions.get('window').height*0.04, flex: 1, flexDirection: "row", alignContent: "center", alignItems: "center"}}>
                                <LocationSvg style={{marginTop: 15}} width={44} height={44} />
                                <Item style={{width: "90%"}} floatingLabel last>
                                    <Label>Confirmar dirección de entrega</Label>
                                    <Input value={"Dirección"}/>
                                </Item>
                            </View>
                            <View style={{
                                flexDirection:'row',
                                width:'85%'
                            }}>
                                <View>
                                    <CheckBox tintColors={{ true: '#5F27A4', false: 'black' }} value={true}/>
                                </View>
                                <View>
                                    <Text>
                                        Costo del envío
                                    </Text>
                                </View>
                            </View>
                                <Button
                                    title="Comprar"
                                    type="outline"
                                    containerStyle={styles.containerButtomPrimary}
                                    buttonStyle={styles.ButtonStylePrimary}
                                    titleStyle= {styles.ButtonTextPrimary}
                                    onPress={() => {

                                    }}
                                />
                            </View>
                        </Body>
                    </ListItem>
                </List>
            </Content>
        </ScrollView>
    );
}

function defaultFormValue() {
    return {
        rechazo: "",
    };
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
        paddingVertical: 2
    },
    viewItem2: {
        borderWidth: 1,
        marginRight: 5,
        marginLeft: 5,
        marginBottom: 8,
        borderColor: "transparent",
        paddingVertical: 2
    },
    thumbail: {
        marginLeft: 20,
        paddingHorizontal: 5,
        paddingVertical: 5,
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
        paddingHorizontal: 10,
        marginRight: 10,
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