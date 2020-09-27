import React from "react";
import { StyleSheet,View,Dimensions,ScrollView, Alert, ToastAndroid} from 'react-native';
import {Button,Text,Item,Content,List,ListItem,Left,Body,Thumbnail, Spinner, Picker, Input, Textarea} from 'native-base'
import { Divider } from "react-native-elements";
import GallerySvg from '../../../../assets/icon/general/galeria.svg'
import CarSvg from '../../../../assets/icon/general/carro.svg'
import CarritoSvg from '../../../../assets/icon/general/carrito.svg'
import IndumentariaSvg from '../../../../assets/icon/rubros/indumentaria.svg'
import ElectrodomesticosSvg from '../../../../assets/icon/rubros/electrodomesticos.svg'
import DeportivoSvg from '../../../../assets/icon/rubros/deportivo.svg'
import LenceriaSvg from '../../../../assets/icon/rubros/lenceria.svg'
import MuebleSvg from '../../../../assets/icon/rubros/mueble.svg'
import TecnologiaSvg from '../../../../assets/icon/rubros/tecnologia.svg'
import CalzadoSvg from '../../../../assets/icon/rubros/calzado.svg'
import AccesorioSvg from '../../../../assets/icon/rubros/accesorio.svg'
import MaquillajeSvg from '../../../../assets/icon/rubros/maquillaje.svg'
import PerfumeSvg from '../../../../assets/icon/rubros/perfume.svg'
import dataRubro from '../../../components/dataRubro'
import dataCategory from '../../../components/dataCategory'
import dataSubCategory from '../../../components/dataSubCategory'
import AdminProductos from '../../../model/AdminProductos'
import Producto from '../../../model/Producto'
import 'firebase/storage'
import firebase from '../../../firebase/Firebase'
import FichaSvg from '../../../../assets/icon/general/ficha.svg'
import { TextInput, FlatList } from "react-native-gesture-handler";

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
            console.log("error en: ",err);
        }
    }
    render(){
        if(this.props.producto.imagen1 && !this.props.producto.imagenUri1){
            return(<Thumbnail square style={{width:Dimensions.get('window').width*0.3,height:Dimensions.get('window').height*0.125}} source={{uri:this.state.uri}} />)
        }
        if(this.props.producto.imagenUri1){
            return(<Thumbnail square style={{width:Dimensions.get('window').width*0.3,height:Dimensions.get('window').height*0.125}} source={{uri:this.props.producto.imagenUri1}} />)
        }
        return(<GallerySvg
            width={Dimensions.get('window').width*0.3}
            height={Dimensions.get('window').height*0.125}
        />)
    }
}


export default class Productos extends React.Component{

    constructor(props){
        super(props)
        this.state ={
            productos: AdminProductos.getNewArrayProducts(),
            onLoad:false,
            results:false,
            filter:null,
            idFilter:null,
            id:null,
            rubro:null,
            category:null,
            subCategory:null,
            categories:new Array(),
            subCategories:new Array(),
            proof:"",
            loadMore:false,
            allResults:false
        }
        this.cont = 0
        this.Uris = []
        AdminProductos.getDataProductosPag("A",7)
        .then((productos)=>{
            if(productos.length < 1){
                this.setState({results:false,onLoad:true})
            }else{
                this.setState({productos,results:true,onLoad:true})
            }
        })
    }

    getRubro = ()=>{
        var rubro = null
        dataRubro.forEach((item)=>{
            if(item.id == this.state.id){
                rubro = item
            }
        })
        if(rubro){
            return rubro
        }else{
            return {id:-1,name:"todos"}
        }
    }

    checkedFilter = (filter)=>{
        if(filter && filter > 0 &&filter != "0"){
            return true
        }
        return false
    }
    notifyMessage(msg) {
        if (Platform.OS === 'android') {
          ToastAndroid.show(msg, ToastAndroid.SHORT)
        } else {
          AlertIOS.alert(msg);
        }
    }

    applyFilter = ()=>{
        var filter = null
        var idFilter = null
        var id = null
        if(this.checkedFilter(this.state.rubro)){
            id = this.state.rubro
            this.setState({loadMore:false,allResults:false,results:false,onLoad:false,filter,idFilter,productos:AdminProductos.getNewArrayProducts()})
            if(this.checkedFilter(this.state.category)){
                if(this.checkedFilter(this.state.subCategory)){
                    filter = 2
                    idFilter = this.state.subCategory
                }else{
                    filter = 1
                    idFilter = this.state.category
                }
            }else{
                filter = 0
                idFilter = this.state.rubro
            }
            AdminProductos.getDataProductosFromFilter(this.getFilter(filter),idFilter,"A",7)
            .then((productos)=>{
                if(productos.length < 1){
                    this.setState({results:false,onLoad:true,filter,idFilter,id})
                }else{
                    this.setState({productos,results:true,onLoad:true,filter,idFilter,id})
                }
            })
        }else{
            this.notifyMessage("No se ha aplicado ningún filtro")
        }
    }

    loadMore = ()=>{
        if(!this.state.loadMore && !this.state.allResults && this.state.onLoad && this.state.results){
            this.setState({loadMore:true})
            var product = this.state.productos[this.state.productos.length-1]
            if(this.state.filter != null){
                AdminProductos.getDataProductosFromFilter(this.getFilter(this.state.filter),this.state.idFilter,product.idTienda,7)
                .then((products)=>{
                    if(products.length < 1){
                        this.setState({loadMore:false,allResults:true})
                    }else{
                        var productos = this.state.productos
                        products.forEach((producto)=>{
                            productos.push(producto)
                        })
                        this.setState({productos,loadMore:false})
                    }
                })
            }else{
                AdminProductos.getDataProductosPag(product.idTienda,7)
                .then((products)=>{
                    if(products.length < 1){
                        this.setState({loadMore:false,allResults:true})
                    }else{
                        var productos = this.state.productos
                        products.forEach((producto)=>{
                            productos.push(producto)
                        })
                        this.setState({productos,loadMore:false})
                    }
                })
            }
        }
    }
    
    getCategory = ()=>{
        var category = null
        dataCategory.forEach((item)=>{
            if(item.id == this.state.idFilter){
                category = item
            }
        })
        if(category){
            return category
        }else{
            return {name:""}
        }
    }

    getSubCategory = ()=>{
        var subCategory = null
        dataSubCategory.forEach((item)=>{
            if(item.id == this.state.idFilter){
                subCategory = item
            }
        })
        if(subCategory){
            return subCategory
        }else{
            return {name:""}
        }
    }

    getCategoriesById = (id)=>{
        var categories = new Array()
        dataCategory.forEach((item)=>{
            if(item.rubro == parseInt(id)){
                categories.push(item)
            }
        })
        return categories
    }
    getSubCategoriesById = (id)=>{
        var subCategories = new Array()
        dataSubCategory.forEach((item)=>{
            if(item.category == parseInt(id)){
                subCategories.push(item)
            }
        })
        return subCategories
    }

    filters = ()=>{
        return(<View>
            <View style={{
            }}>
                <View style={{
                    flexDirection:'column',
                }}>
                    <View>
                        <Text style={{
                            fontSize:Dimensions.get('window').width*0.03,
                            color:'#5F27A4'
                        }}>
                            Rubro
                        </Text>
                    </View>
                    <View style={{
                        width:Dimensions.get('window').width*0.92,
                        borderColor: '#cccccc',
                        borderBottomWidth:1,
                        borderTopWidth:1,
                        borderLeftWidth:1,
                        borderRightWidth:1,
                        borderRadius: 5,
                        alignSelf: 'center',
                        marginTop:Dimensions.get('window').height*0.0075,
                        paddingHorizontal:Dimensions.get('window').width*0.03
                    }}>
                        <Picker  
                            selectedValue={this.state.rubro}
                            mode="dropdown"
                            style={{
                                color:'#656565'
                            }}
                            onValueChange={(rubro) =>{
                                this.setState({
                                    rubro:rubro,
                                    category:null,
                                    subCategory:null,
                                    categories:this.getCategoriesById(rubro),
                                    subCategories:new Array()
                                })
                            }}
                        >
                        <Picker.Item value="0" label="Seleccione Rubro"/>
                        {
                            dataRubro.map( (item) => {
                                return <Picker.Item value={item.id} label={item.name} />
                            })
                        }
                        </Picker>
                    </View>
                </View>
            </View>
            <View style={{
                marginTop:Dimensions.get('window').height*0.015,
            }}>
                <View style={{
                    flexDirection:'column',
                }}>
                    <View>
                        <Text style={{
                            fontSize:Dimensions.get('window').width*0.03,
                            color:'#5F27A4'
                        }}>
                            Categoría
                        </Text>
                    </View>
                    <View style={{
                        width: Dimensions.get('window').width*0.92,
                        borderColor: '#cccccc',
                        borderBottomWidth:1,
                        borderTopWidth:1,
                        borderLeftWidth:1,
                        borderRightWidth:1,
                        borderRadius: 5,
                        alignSelf: 'center',
                        marginTop:Dimensions.get('window').height*0.0075,
                        paddingHorizontal:Dimensions.get('window').width*0.03
                    }}>
                        <Picker  
                            selectedValue={this.state.category}
                            mode="dropdown"
                            style={{
                                color:'#656565'
                            }}
                            onValueChange={(category) =>{
                                this.setState({
                                    category:category,
                                    subCategory:null,
                                    subCategories:this.getSubCategoriesById(category)
                                })
                            }}
                        >
                        <Picker.Item value="0" label="Seleccione Categoría"/>
                        {
                            this.state.categories.map( (item) => {
                                return <Picker.Item value={item.id} label={item.name} />
                            })
                        }
                        </Picker>
                    </View>
                </View>
            </View>
            <View style={{
                marginTop:Dimensions.get('window').height*0.015
            }}>
                <View style={{
                    flexDirection:'column',
                }}>
                    <View>
                        <Text style={{
                            fontSize:Dimensions.get('window').width*0.03,
                            color:'#5F27A4'
                        }}>
                            Sub-Categoría
                        </Text>
                    </View>
                    <View style={{
                        width: Dimensions.get('window').width*0.92,
                        borderColor: '#cccccc',
                        borderBottomWidth:1,
                        borderTopWidth:1,
                        borderLeftWidth:1,
                        borderRightWidth:1,
                        borderRadius: 5,
                        alignSelf: 'center',
                        marginTop:Dimensions.get('window').height*0.0075,
                        paddingHorizontal:Dimensions.get('window').width*0.03
                    }}>
                        <Picker  
                            selectedValue={this.state.subCategory}
                            mode="dropdown"
                            style={{
                                color:'#656565'
                            }}
                            onValueChange={(subCategory) =>{
                                this.setState({subCategory})
                            }}
                        >
                        <Picker.Item value="0" label="Seleccione Sub-Categoría"/>
                        {
                            this.state.subCategories.map( (item) => {
                                return <Picker.Item value={item.id} label={item.name} />
                            })
                        }
                        </Picker>
                    </View>
                </View>
            </View>
            </View>)
    }

    getIcon = (key)=>{
        switch (key+"") {
          case '1':
            return <TecnologiaSvg style={styles.items_icon} />
          case '2':
            return <CalzadoSvg style={styles.items_icon} />
          case '3':
            return <ElectrodomesticosSvg style={styles.items_icon} />
          case '4':
            return <AccesorioSvg style={styles.items_icon} />
          case '5':
            return <MaquillajeSvg style={styles.items_icon} />
          case '6':
            return <MuebleSvg style={styles.items_icon} />
          case '7':
            return <IndumentariaSvg style={styles.items_icon} />
          case '8':
            return <DeportivoSvg style={styles.items_icon} />
          case '9':
            return <PerfumeSvg style={styles.items_icon} />
          case '10':
            return <CarritoSvg style={styles.items_icon} />     
          case '11':
            return <LenceriaSvg style={styles.items_icon} />
          default:
            return <CarritoSvg style={styles.items_icon} />      
        }
    }

    getFilter = (filter)=>{
        switch (filter) {
            case 0:
                return 'rubro'
            case 1:
                return 'category'
            case 2:
                return 'subCategory'
            default:
                break;
        }
    }

    producto = ({producto,keyP,onPress})=>{
        var ifTalla = false
        var rubro = producto.rubro
        if(
            rubro == 2 ||
            rubro == 11 ||
            rubro == 7 ||
            rubro == 8
        ){
            ifTalla = true
            var tallas = ""
        }
        var stock = 0
        var colores = ""
        producto.medidas.map((medida)=>{
            stock = stock + medida.stock
            if(ifTalla){
                if(tallas.length < 1){
                    tallas = medida.talla
                }else{
                    if(!this.seRepiteMedida(tallas.split(" / "),medida.talla)){
                        tallas = tallas+" / "+medida.talla
                    }
                }
            }
            if(colores.length < 1){
                colores = medida.color
            }else{
                if(!this.seRepiteMedida(colores.split(", "),medida.color)){
                    colores = colores+", "+medida.color
                }
            }
        })
        return(
            <ListItem thumbnail style={styles2.viewItem} 
                onPress={()=>{
                    onPress()
                }}>
                <Left style={styles2.thumbail}>
                    <Photo 
                        producto={producto}
                        onLoadImage={(uri)=>{
                            this.Uris.push({uri:uri,keyP:keyP})
                        }} 
                    />
                </Left>
                <Body style={styles2.body}>
                    <Text numberOfLines={1} style={stock>0?styles2.stop:styles2.stopEmpty}>Stock: {stock} Und</Text>
                    <View style={{flex: 1, alignItems: "center", alignContent: "center", marginTop:10}}>
                        <Text numberOfLines={2} style={styles2.title}> {producto.name} </Text>
                        {ifTalla?<Text numberOfLines={2} style={styles2.text}>Talla: {tallas}</Text>:null}
                        <Text numberOfLines={2} style={styles2.text}>Colores: {colores}</Text>
                        <Text numberOfLines={1} style={styles2.text2}>S/ {producto.price?producto.price.toString():""}</Text>
                    </View>
                </Body>
            </ListItem>
        )
    }

    seRepiteMedida = (array,medida)=>{
        var result = false
        array.map((item)=>{
            if(item == medida){
                result = true
            }
        })
        return result
    }

    render(){
        ++this.cont
        var Producto = this.producto
        var Filters = this.filters
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
        var work = (fun)=>{
            return fun()
        }
        return(
            <View>
            <ScrollView style={{height:Dimensions.get('window').height*0.775}}
                onScroll={({nativeEvent}) => {
                    if (this.isCloseToBottom(nativeEvent)) {
                        this.loadMore()
                    }
                }}
            >
                <Divider/>
                <View style={{paddingVertical:Dimensions.get('window').width*0.03,paddingHorizontal:Dimensions.get('window').width*0.04}}>
                    <Filters />
                    <Button block 
                        onPress={this.applyFilter}
                        style={{
                            marginTop:Dimensions.get('window').height*0.025,
                            backgroundColor:'#5F27A4',
                            width:Dimensions.get('window').width*0.92,
                            marginBottom:Dimensions.get('window').height*0.025
                    }}>
                        <Text style={{color:"white"}}>Siguiente</Text>
                    </Button>
                    <View style={{
                        width:Dimensions.get('window').width,
                        backgroundColor:'#e6e6e6',
                        height:1,
                        marginVertical:Dimensions.get('window').height*0.015,
                        marginLeft:-Dimensions.get('window').width*0.04
                    }}/>
                    <View style={{flexDirection:'row'}}>
                        <View style={styles.ContentTextCategory}>
                            {this.getIcon(this.state.id)}
                            <Text style={styles.textCategory}>{this.getRubro().name}</Text>
                        </View>
                        {work(()=>{
                            switch (this.state.filter) {
                                case 0:
                                    return null
                                case 1:
                                    return(<View style={{flexDirection:'row-reverse',alignItems: 'center'}} >
                                        <Button style={{backgroundColor:'#5F27A4'}}  small>
                                            <Text>
                                               {this.getCategory().name}
                                            </Text>
                                        </Button>
                                    </View>)
                                case 2:
                                    return(<View style={{flexDirection:'row-reverse',alignItems: 'center'}} >
                                        <Button style={{backgroundColor:'#5F27A4'}}  small>
                                            <Text>
                                               {this.getSubCategory().name}
                                            </Text>
                                        </Button>
                                    </View>)
                            }
                        })}
                    </View>
                </View>
                <Divider/>
                {!this.state.results?<View style={{
                    marginVertical:Dimensions.get('window').height*0.02,
                    width:Dimensions.get('window').width,
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                    <Text style={{
                        color:"#b3b3b3",
                        fontSize:Dimensions.get('window').width*0.05
                    }}>
                        No se encontraron resultados.
                    </Text>
                </View>:null}
                <List style={styles2.container}>
                    <FlatList 
                        data={this.state.productos}
                        renderItem={({item,index})=>{
                            return(<Producto
                                keyP={index}
                                producto={item}
                                onPress={()=>{
                                    this.props.navigation.navigate('productoDetalle',{
                                        producto:item
                                    })
                                }}
                            />)
                        }}
                    />
                    {this.state.allResults?
                        <View style={{
                            width:Dimensions.get('window').width,
                            alignItems:'center',
                            marginVertical:Dimensions.get('window').height*0.01
                        }}>
                            <Text style={{
                                color:"#b3b3b3",
                                fontSize:Dimensions.get('window').width*0.05
                            }}>
                                No hay mas resultados.
                            </Text>
                        </View>
                    :
                    this.state.loadMore?
                        <Spinner 
                            size={Dimensions.get('window').height*0.05}
                            style={{
                                flex: 1,
                                alignSelf:'center'
                            }}
                            color='#FDD501'
                        />
                    :
                        
                        <View 
                            style={{
                                flex: 1,
                                height:Dimensions.get('window').height*0.1,
                            }}
                        />
                    }
                </List>
            </ScrollView>
            <View style={styles.content_btn_carBuy}>
                <Button style={styles.btn_carBuy} block>
                    <CarSvg style={{
                        width: Dimensions.get('window').height*0.03,
                        height: Dimensions.get('window').height*0.03,
                        marginHorizontal:Dimensions.get('window').width*0.001
                    }} />
                    <Text style={styles.text_btn_carBuy}>
                        Ver Carrito
                    </Text>
                </Button>
                <Button style={styles.btn_carBuy_2} block>
                    <Text style={styles.text_btn_carBuy_2}>
                        S/ 50
                    </Text>
                </Button>
            </View>
            </View>
        )
    }
    isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
    };
    
}

const styles = StyleSheet.create({
    ContentTextCategory:{
      flex:1,
      flexDirection:'row',
      alignItems: 'center',
    },
    textCategory:{
      color:'#5F27A4',
      paddingLeft:Dimensions.get('window').width*0.015
    },
    items_icon:{
      width: Dimensions.get('window').width*0.1,
      height: Dimensions.get('window').width*0.1
    },
    btn_carBuy:{
        backgroundColor:'#5F27A4',
    },
    btn_carBuy_2:{
        backgroundColor:'#cccccc',
    },
    text_btn_carBuy:{
        color:"#FFFFFF",
        fontSize:Dimensions.get('window').height*0.015
    },
    text_btn_carBuy_2:{
        color:"#000000",
        fontSize:Dimensions.get('window').height*0.015
    },
    content_btn_carBuy:{
        paddingHorizontal:Dimensions.get('window').width*0.1,
        flex:1,
        justifyContent:'flex-start',
        paddingVertical:Dimensions.get('window').height*0.014
    }
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
    thumbail: {
        marginLeft: 10,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 16,
        borderRadius: 15,
        borderColor: "#B3B3B3"
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
        width: "86%",
        paddingVertical: 4,
        paddingLeft: 4
    },
    stopEmpty:{
        fontSize: 12,
        fontFamily: 'WorkSans-Regular',
        color: "#FFFFFF",
        backgroundColor: "#EA5743",
        width: "86%",
        paddingVertical: 4,
        paddingLeft: 4
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