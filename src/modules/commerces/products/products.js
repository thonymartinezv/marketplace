import React from "react";
import { StyleSheet,View,Dimensions,ScrollView,Modal,TouchableOpacity,Image, Alert} from 'react-native';
import {Button,Text,Item,Content,List,ListItem,Left,Body,Thumbnail,Picker, Input, Textarea, Label, Spinner} from 'native-base'
import IndumentariaSvg from '../../../../assets/icon/rubros/indumentaria.svg'
import { Divider } from "react-native-elements";
import MasSvg from '../../../../assets/icon/general/mas.svg'
import CarSvg from '../../../../assets/icon/general/carro.svg'
import FichaSvg from '../../../../assets/icon/general/ficha.svg'
import AtrasSvg from '../../../../assets/icon/header/atras.svg'
import EditarSvg from '../../../../assets/icon/general/editar.svg'
import EliminarSvg from '../../../../assets/icon/general/eliminar.svg'
import AdminProductos from '../../../model/AdminProductos'
import Producto from '../../../model/Producto'
import 'firebase/storage'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import firebase from '../../../firebase/Firebase'
import RadioForm from 'react-native-simple-radio-button'
import GallerySvg from '../../../../assets/icon/general/galeria.svg'
import EditarCircleSvg from '../../../../assets/icon/general/editar_circle.svg'
import dataRubro from '../../../components/dataRubro'
import dataCategory from '../../../components/dataCategory'
import dataSubCategory from '../../../components/dataSubCategory'
import { color } from "react-native-reanimated";
import AdminCommerces from "../../../model/AdminCommerces";

class Photo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            uri:"",
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
            this.getUrl(this.props.producto.imagen1)
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
class ImagenP extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            uri:""
        }
        this.props.producto.imageActive = this.props.producto.imageActive?this.props.producto.imageActive:0
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
        switch (this.props.producto.imageActive) {
            case 0:
                if(this.props.producto.imagen1 && !this.props.producto.imagenUri1){
                    this.getUrl(this.props.producto.imagen1)
                    return(<Image source={{uri:this.state.uri}} 
                        style={{
                            width:Dimensions.get('window').width*0.5,
                            height:Dimensions.get('window').height*0.2
                        }}
                    />)
                }
                if(this.props.producto.imagenUri1){
                    return(<Image source={{uri:this.props.producto.imagenUri1}} 
                        style={{
                            width:Dimensions.get('window').width*0.5,
                            height:Dimensions.get('window').height*0.2
                        }}
                    />)
                }else{
                    return(<GallerySvg
                        width={Dimensions.get('window').width*0.5}
                        height={Dimensions.get('window').height*0.2}
                    />)
                }
            case 1:
                if(this.props.producto.imagen2 && !this.props.producto.imagenUri2){
                    this.getUrl(this.props.producto.imagen2)
                    return(<Image source={{uri:this.state.uri}} 
                        style={{
                            width:Dimensions.get('window').width*0.5,
                            height:Dimensions.get('window').height*0.2
                        }}
                    />)
                }
                if(this.props.producto.imagenUri2){
                    return(<Image source={{uri:this.props.producto.imagenUri2}} 
                        style={{
                            width:Dimensions.get('window').width*0.5,
                            height:Dimensions.get('window').height*0.2
                        }}
                    />)
                }else{
                    return(<GallerySvg
                        width={Dimensions.get('window').width*0.5}
                        height={Dimensions.get('window').height*0.2}
                    />)
                }
            case 2:
                if(this.props.producto.imagen3 && !this.props.producto.imagenUri3){
                    this.getUrl(this.props.producto.imagen3)
                    return(<Image source={{uri:this.state.uri}} 
                        style={{
                            width:Dimensions.get('window').width*0.5,
                            height:Dimensions.get('window').height*0.2
                        }}
                    />)
                }
                if(this.props.producto.imagenUri3){
                    return(<Image source={{uri:this.props.producto.imagenUri3}} 
                        style={{
                            width:Dimensions.get('window').width*0.5,
                            height:Dimensions.get('window').height*0.2
                        }}
                    />)
                }else{
                    return(<GallerySvg
                        width={Dimensions.get('window').width*0.5}
                        height={Dimensions.get('window').height*0.2}
                    />)
                }
            case 3:
                if(this.props.producto.imagen4 && !this.props.producto.imagenUri4){
                    this.getUrl(this.props.producto.imagen4)
                    return(<Image source={{uri:this.state.uri}} 
                        style={{
                            width:Dimensions.get('window').width*0.5,
                            height:Dimensions.get('window').height*0.2
                        }}
                    />)
                }
                if(this.props.producto.imagenUri4){
                    return(<Image source={{uri:this.props.producto.imagenUri4}} 
                        style={{
                            width:Dimensions.get('window').width*0.5,
                            height:Dimensions.get('window').height*0.2
                        }}
                    />)
                }else{
                    return(<GallerySvg
                        width={Dimensions.get('window').width*0.5}
                        height={Dimensions.get('window').height*0.2}
                    />)
                }            
            default:
                break;
        }
    }
}


export default class Product extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            modalVisible:false,
            modalPhoto:false,
            pickerColor:'0',
            rubros:dataRubro,
            productos:AdminProductos.getNewArrayProducts(),
            productosRespaldo:AdminProductos.getNewArrayProducts(),
            uri:"",
            keyP:null,
            producto:new Producto(),
            register:false,
            onLoad:false
        }
        AdminProductos.getDataProductosFromCommerce()
        .then((productos)=>{
            for (let keyP = 0; keyP < productos.length; keyP++) {
                if(productos[keyP].rubro){
                    productos[keyP].categories = this.getCategoriesById(productos[keyP].rubro)
                }else{
                    productos[keyP].categories = new Array()
                }
                if(productos[keyP].category){
                    productos[keyP].subCategories = this.getSubCategoriesById(productos[keyP].category)
                }else{
                    productos[keyP].subCategories = new Array()
                }
            }
            this.setState({productos,onLoad:true})
        })
        .catch((err)=>{
            console.error("error in products.js constructor from module commerce: "+err);
            this.setState({onLoad:true})
        })
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

    producto = ({producto,keyP})=>{
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
                    var productos = AdminProductos.getNewArrayProducts()
                    this.state.productos.forEach((producto,index)=>{
                        productos.push(new Producto(JSON.parse(JSON.stringify(producto))))
                        if(productos[index].rubro){
                            productos[index].categories = this.getCategoriesById(productos[index].rubro)
                        }else{
                            productos[index].categories = new Array()
                        }
                        if(productos[index].category){
                            productos[index].subCategories = this.getSubCategoriesById(productos[index].category)
                        }else{
                            productos[index].subCategories = new Array()
                        }
                    })
                    this.setState({
                        productosRespaldo:productos,
                        modalVisible:true,
                        keyP:keyP,
                        producto:producto
                    })
                }}>
                <Left style={styles2.thumbail}>
                    <Photo 
                        producto={producto}
                        onLoadImage={(uri)=>{
                            var productos = this.state.productos
                            productos[keyP].imagenUri1 = uri
                            this.setState({productos})
                        }} 
                    />
                </Left>
                <Body style={styles2.body}>
                    <Text numberOfLines={1} style={stock>0?styles2.stop:styles2.stopEmpty}>Stock: {stock} Und</Text>
                    <View style={{flex: 1, alignItems: "center", alignContent: "center", marginTop:10}}>
                        <Text numberOfLines={2} style={styles2.title}> {producto.name} </Text>
                        {ifTalla?<Text numberOfLines={2} style={styles2.text}>Talla: {tallas}</Text>:null}
                        <Text numberOfLines={2} style={styles2.text}>Colores: {colores}</Text>
                        <Text numberOfLines={1} style={styles2.text2}>S/ {producto.price.toString()}</Text>
                    </View>
                </Body>
            </ListItem>
        )
    }

    actualizar = ()=>{
        this.setState({productos:AdminProductos.getNewArrayProducts()})
        AdminProductos.getDataProductosFromCommerce()
        .then((productos)=>{
            for (let keyP = 0; keyP < productos.length; keyP++) {
                if(productos[keyP].rubro){
                    productos[keyP].categories = this.getCategoriesById(productos[keyP].rubro)
                }else{
                    productos[keyP].categories = new Array()
                }
                if(productos[keyP].category){
                    productos[keyP].subCategories = this.getSubCategoriesById(productos[keyP].category)
                }else{
                    productos[keyP].subCategories = new Array()
                }
            }
            this.setState({productos,onLoad:true})
        })
        .catch((err)=>{
            console.error("error in products.js constructor from module commerce: "+err);
            this.setState({onLoad:true})
        })
    }

    render(){
        var Product = this.producto
        var ModalProduct = this.Modal
        var ModalPhoto = this.modalPhoto
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
        return(
            <View>
            <ScrollView style={{}}>
                    <ModalProduct 
                        producto={this.state.producto}
                        keyP={this.state.keyP} 
                        changeValue={(value)=>{
                            var productos = this.state.productos
                            productos[this.state.keyP].imageActive = value
                            this.setState({productos})
                        }}
                    />
                    <ModalPhoto />
                <Divider/>
                <List style={styles2.container}>
                    {
                        this.state.productos.map((producto,index)=>{
                            return(<Product 
                                producto={producto}
                                keyP={index}
                            />)
                        })
                    }
                    <View style={{
                        width:Dimensions.get('window').width,
                        alignItems:'center',
                        marginVertical:Dimensions.get('window').height*0.02
                    }}>
                        <View style={{
                            width:Dimensions.get('window').width*0.95,
                        }}>
                            <Button block 
                                onPress={()=>{
                                    var productos = this.state.productos
                                    var productosRespaldo = AdminProductos.getNewArrayProducts()
                                    productos.forEach((producto,index)=>{
                                        productosRespaldo.push(new Producto(JSON.parse(JSON.stringify(producto))))
                                        if(productosRespaldo[index].rubro){
                                            productosRespaldo[index].categories = this.getCategoriesById(productosRespaldo[index].rubro)
                                        }else{
                                            productosRespaldo[index].categories = new Array()
                                        }
                                        if(productosRespaldo[index].category){
                                            productosRespaldo[index].subCategories = this.getSubCategoriesById(productosRespaldo[index].category)
                                        }else{
                                            productosRespaldo[index].subCategories = new Array()
                                        }
                                    })
                                    productos.push(new Producto())
                                    this.setState({
                                        productos,
                                        productosRespaldo,
                                        modalVisible:true,
                                        keyP:productos.length-1,
                                        producto:productos[productos.length-1],
                                        register:true
                                    })
                                    
                                }}
                                style={{
                                    alignItems:'center',
                                    justifyContent:'center',
                                    backgroundColor:'#5f27a4'
                                }}
                            >
                                <Text style={{
                                    color:'white',
                                    alignSelf:'center',
                                    fontWeight:'bold',
                                    fontSize:20
                                }}>
                                    +   
                                    <Label style={{color:'#5f27a4'}}>__</Label> 
                                    <Label style={{
                                        fontWeight:'normal',
                                    }}>
                                        Agregar Producto
                                    </Label>
                                </Text>
                            </Button>
                        </View>
                    </View>
                </List>
            </ScrollView>
            </View>
        )
    }

    input = ({placeholder,onChangeText,value})=>{
        return(<View style={{
            borderColor:'#cccccc',
            borderWidth:1,
            borderRadius:5,
            paddingLeft:Dimensions.get('window').width*0.025
        }}>
            <Input placeholder={placeholder}
                value={value}
                style={{
                    color:'#656565',
                    fontSize:Dimensions.get('window').width*0.0325,
                    height:Dimensions.get('window').width*0.1
                }}
                placeholderTextColor="#656565"
                onChangeText={(value)=>{
                    onChangeText(value)
                }} 
            />
        </View>)
    }
    stock = ({keyP,keyM})=>{
        return(
            <View style={{
                width:Dimensions.get('window').width*0.3
            }}>
                <Text style={{
                    color:'#5F27A4',
                }}>
                    Stock
                </Text>
                <View style={{
                    flexDirection:'row',
                    borderWidth:0.25,
                    borderColor:'#5F27A4',
                    marginTop:Dimensions.get('window').height*0.01
                }}>
                    <TouchableOpacity onPress={()=>{
                        if( this.state.productos[keyP].medidas[keyM].stock>0){
                            var productos = this.state.productos
                            --productos[keyP].medidas[keyM].stock
                            this.setState({productos})
                        }
                    }}>
                        <View style={{
                            width:Dimensions.get('window').width*0.1,
                            borderWidth:1,
                            borderColor:'#5F27A4',
                            alignItems:'center'
                        }}>
                            <Text>
                                -
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{
                        width:Dimensions.get('window').width*0.1,
                        alignItems:'center',
                        backgroundColor:'#5F27A4',
                        borderWidth:1,
                        borderColor:'#5F27A4',
                    }}>
                        <Text style={{
                            color:'white'
                        }}>
                            {
                            this.state.productos[keyP].medidas[keyM].stock<10?
                            "00"+this.state.productos[keyP].medidas[keyM].stock
                            :
                            this.state.productos[keyP].medidas[keyM].stock>99?
                            this.state.productos[keyP].medidas[keyM].stock
                            :
                            "0"+this.state.productos[keyP].medidas[keyM].stock
                            }
                        </Text>
                    </View>
                    <TouchableOpacity onPress={()=>{
                        if( this.state.productos[keyP].medidas[keyM].stock<999){
                            var productos = this.state.productos
                            ++productos[keyP].medidas[keyM].stock
                            this.setState({productos})
                        }
                    }}>
                        <View style={{
                            width:Dimensions.get('window').width*0.1,
                            borderWidth:1,
                            borderColor:'#5F27A4',
                            alignItems:'center'
                        }}>
                            <Text>
                                +
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    modalPhoto = () =>{
        return(
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalPhoto}
                onRequestClose={() => {

                }}
            >
                <View style={{
                    width:"100%",
                    height:"100%",
                    backgroundColor:"rgba(0, 0, 0, 0.4)",

                }}>
                    <View style={{
                        width:Dimensions.get('window').width*0.8,
                        marginVertical:Dimensions.get('window').height*0.3,
                        marginHorizontal:Dimensions.get('window').width*0.1,
                        backgroundColor:"white",
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.29,
                        shadowRadius: 4.65,
                        elevation:7,
                        paddingTop:Dimensions.get('window').height*0.025,
                        paddingHorizontal:Dimensions.get('window').width*0.025,
                    }}>
                        <Button block 
                            onPress={()=>{
                                    this.setState({modalPhoto:false})
                                    this.selectPictureProduct()
                                }
                            }
                            style={{
                                backgroundColor:'#5F27A4',
                                marginBottom:Dimensions.get('window').height*0.025
                            }}
                        >
                            <Text style={{color:"white"}}>Seleccionar desde Galería</Text>
                        </Button>
                        <Button block 
                            onPress={()=>{
                                    
                            }}
                            style={{
                                backgroundColor:'#5F27A4',
                                marginBottom:Dimensions.get('window').height*0.025
                        }}>
                            <Text style={{color:"white"}}>Seleccionar desde Cámara</Text>
                        </Button>
                    </View>
                </View>
            </Modal>
        )
    }
    selectPictureProduct = async ()=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if(status != 'granted'){
            console.error("permissions CAMERA_ROLL is denied");
        }
        await this._pickImageProduct()
    }

    _pickImageProduct = async () => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          if (!result.cancelled) {
            var productos = this.state.productos
            var image = result.uri.split("/")
            switch (productos[this.state.keyP].imageActive){
                case 0:
                    productos[this.state.keyP].imagenUri1 = result.uri
                    productos[this.state.keyP].imagen1 = image[image.length-1]
                    productos[this.state.keyP].imageChange1 = true
                break;
                case 1:
                    productos[this.state.keyP].imagenUri2 = result.uri
                    productos[this.state.keyP].imagen2 = image[image.length-1]
                    productos[this.state.keyP].imageChange2 = true
                    break;
                case 2:
                    productos[this.state.keyP].imagenUri3 = result.uri
                    productos[this.state.keyP].imagen3 = image[image.length-1]
                    productos[this.state.keyP].imageChange3 = true
                    break;
                case 3:
                    productos[this.state.keyP].imagenUri4 = result.uri
                    productos[this.state.keyP].imagen4 = image[image.length-1]
                    productos[this.state.keyP].imageChange4 = true
                    break;
            }
            this.setState({productos})
          }
        } catch (E) {
          console.error(E);
        }
    }
    medida = ({keyP,keyM,ultimo,marginTop})=>{
        function work(fun){
            return fun()
        }
        var InputM = this.input
        var Stock = this.stock
        var PointsPosition = this.pointsPosition
        var ifTalla = false
        var rubro = this.state.productos[keyP].rubro?this.state.productos[keyP].rubro:0
        if(
            rubro == 2 ||
            rubro == 11 ||
            rubro == 7 ||
            rubro == 8
        ){
            ifTalla = true
        }
        return(
            <View style={{
                marginTop:marginTop?marginTop:0
            }}>
                <View style={{
                    flexDirection:'row'
                }}>
                    {ifTalla?<View style={{ width:"47.5%",marginRight:"5%"}}>
                        <InputM
                            value={this.state.productos[keyP].medidas[keyM].talla}
                            placeholder="Talla"
                            onChangeText={(talla)=>{
                                var productos = this.state.productos
                                productos[keyP].medidas[keyM].talla = talla
                                this.setState({productos})
                            }}
                        />
                    </View>:null}
                    <View style={[{
                        width:ifTalla?"47.5%":"100%"
                    }]}>
                        <InputM
                            value={this.state.productos[keyP].medidas[keyM].color}
                            placeholder="Color"
                            onChangeText={(color)=>{
                                var productos = this.state.productos
                                productos[keyP].medidas[keyM].color = color
                                this.setState({productos})
                            }}
                        />
                    </View>
                </View>
                <View style={{
                    width:"100%",
                    marginTop:Dimensions.get('window').height*0.01,
                    alignItems:'center'
                }}>
                    <Stock keyP={keyP} keyM={keyM} />
                    <PointsPosition 
                        items={this.state.productos[keyP].medidas}
                        selected={keyM}
                    />
                </View>
            </View>
        )
    }

    uploadImageAsync = async (image_uri,image_name)=>{
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function() {
            resolve(xhr.response);
          };
          xhr.onerror = function(e) {
            console.error(e);
            reject(new TypeError('Network request failed'));
          };
          xhr.responseType = 'blob';
          xhr.open('GET',image_uri, true);
          xhr.send(null);
        });
      
        const ref = firebase
          .storage()
          .ref()
          .child("commerce_profile/"+image_name);
        const snapshot = await ref.put(blob);
      
        blob.close();
        return await snapshot.ref.getDownloadURL();
    }

    pointsPosition = ({items,selected})=>{
        return(<View style={{
            flexDirection:'row',
            marginTop:-Dimensions.get('window').width*0.1,
            marginBottom:-Dimensions.get('window').width*0.05
        }}>
            {items.map((item,index)=>{
                return(<Text style={{
                    fontSize:Dimensions.get('window').width*0.15,
                    color:index==selected?'#5F27A4':'#E6E6E6'
                }}>.</Text>)
            })}
        </View>)
    }

    delete = ({onPress,marginRight,marginTop})=>{
        return(<View style={{
            width:'100%',
            height:'100%',
            position:'absolute',
            alignItems:'flex-end',
            justifyContent:'flex-start',
        }}>
            <TouchableOpacity 
                onPress={onPress?onPress:null} 
                style={{
                    width:Dimensions.get('window').width*0.125,
                    height:Dimensions.get('window').width*0.125,
                    alignItems:'center',
                    justifyContent:'center',
                    marginTop:Dimensions.get('window').width*(marginTop?marginTop:0),
                    marginRight:Dimensions.get('window').width*(marginRight?marginRight:0),
                }}
            >
                <EliminarSvg style={{
                    width:Dimensions.get('window').width*0.075,
                    height:Dimensions.get('window').width*0.075
                }}/>
            </TouchableOpacity>
        </View>)
    }

    editarCircle = ({onPress,marginRight,marginTop})=>{
        return(<View style={{
            width:'100%',
            height:'100%',
            position:'absolute',
            alignItems:'flex-end',
            justifyContent:'flex-start',
        }}>
            <TouchableOpacity 
                onPress={onPress?onPress:null} 
                style={{
                    width:Dimensions.get('window').width*0.125,
                    height:Dimensions.get('window').width*0.125,
                    alignItems:'center',
                    justifyContent:'center',
                    marginTop:Dimensions.get('window').width*(marginTop?marginTop:0),
                    marginRight:Dimensions.get('window').width*(marginRight?marginRight:0),
                }}
            >
                <EditarCircleSvg style={{
                    width:Dimensions.get('window').width*0.0875,
                    height:Dimensions.get('window').width*0.0875
                }}/>
            </TouchableOpacity>
        </View>)
    }

    Modal = ({producto,keyP,changeValue})=>{
        var PickerColor = this.Picker
        var Quantity = this.Quantity
        var Medida = this.medida
        var Delete = this.delete
        var EditarCircle = this.editarCircle
        keyP = this.state.keyP
        if(!producto.medidaActive){
            producto.medidaActive = 0
        }
        function work(fun){
            return fun()
        }
        return(
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {

                }}
            >
                <View style={{
                    width:"100%",
                    height:"100%",
                    backgroundColor:"rgba(0, 0, 0, 0.4)"
                }}>
                    <ScrollView>
                        <View style={{
                            width:Dimensions.get('window').width*0.96,
                            marginVertical:Dimensions.get('window').height*0.025,
                            marginHorizontal:Dimensions.get('window').width*0.02,
                            backgroundColor:"white",
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 3,
                            },
                            shadowOpacity: 0.29,
                            shadowRadius: 4.65,
                            elevation:7,
                            paddingTop:Dimensions.get('window').height*0.025,
                            paddingBottom:Dimensions.get('window').height*0.025,
                            paddingHorizontal:Dimensions.get('window').width*0.05,
                        }}>
                            <View style={{
                                flexDirection:'row'
                            }}>
                                <Button style={{
                                    backgroundColor:'rgba(0,0,0,0)',
                                    elevation:0
                                }}
                                onPress={()=>{
                                    var respaldo = AdminProductos.getNewArrayProducts()
                                    this.state.productosRespaldo.forEach((producto,index)=>{
                                        respaldo.push(new Producto(JSON.parse(JSON.stringify(producto))))
                                        if(respaldo[index].rubro){
                                            respaldo[index].categories = this.getCategoriesById(respaldo[index].rubro)
                                        }else{
                                            respaldo[index].categories = new Array()
                                        }
                                        if(respaldo[index].category){
                                            respaldo[index].subCategories = this.getSubCategoriesById(respaldo[index].category)
                                        }else{
                                            respaldo[index].subCategories = new Array()
                                        }
                                    })
                                    this.setState({
                                        productos:respaldo,
                                        modalVisible:false
                                    })
                                }}>
                                    <AtrasSvg 
                                        width={Dimensions.get('window').width*0.1}
                                        height={Dimensions.get('window').width*0.1}
                                        style={styles.iconBack}
                                    />
                                </Button>
                            </View>
                            <View style={{
                                marginTop:-Dimensions.get('window').height*0.075,
                                alignItems:'center'
                            }}>
                                <View style={{
                                    width:(Dimensions.get('window').width*0.5)+(Dimensions.get('window').width*0.0625),
                                    height:(Dimensions.get('window').height*0.2)+(Dimensions.get('window').width*0.0625),
                                    alignItems:'flex-start',
                                    justifyContent:'flex-end',
                                    marginLeft:Dimensions.get('window').width*0.0625
                                }}>
                                    <ImagenP 
                                        producto={producto}
                                        keyP={keyP}
                                        onLoadImage={(uri)=>{
                                            var productos = this.state.productos
                                            switch (producto.imageActive) {
                                                case 0:
                                                    productos[keyP].imagenUri1 = uri
                                                    break;
                                                case 1:
                                                    productos[keyP].imagenUri2 = uri
                                                    break;
                                                case 2:
                                                    productos[keyP].imagenUri3 = uri
                                                    break;
                                                case 3:
                                                    productos[keyP].imagenUri4 = uri
                                                    break;
                                                default:
                                                    break;
                                            }
                                            this.setState({productos})
                                        }}
                                    />
                                    <EditarCircle 
                                        onPress={()=>{
                                            this.setState({modalPhoto:true})
                                        }}
                                    />
                                </View>
                                <View style={{
                                    paddingTop:Dimensions.get('window').height*0.015,
                                }}>
                                    <RadioForm
                                        radio_props={[
                                            {value:0,uri:producto.imagen1},
                                            {value:1,uri:producto.imagen2},
                                            {value:2,uri:producto.imagen3},
                                            {value:3,uri:producto.imagen4}
                                        ]}
                                        initial={0}
                                        formHorizontal={true}
                                        labelHorizontal={true}
                                        buttonColor={'#5F27A4'}
                                        selectedButtonColor={'#5F27A4'}
                                        animation={true}
                                        onPress={(value) => {
                                            changeValue(value)
                                        }}
                                    />
                                </View>
                                <View style={{
                                    marginTop:Dimensions.get('window').height*0.025,
                                    width:Dimensions.get('window').width*0.96
                                }}>
                                    <Button block style={{
                                        backgroundColor:'#5F27A4'
                                    }}>
                                        <Text style={{
                                            color:'white'
                                        }}>
                                            Caracteristicas
                                        </Text>
                                    </Button>
                                </View>
                            </View>
                            <View style={{
                                width:Dimensions.get('window').width*0.86,
                                marginTop:Dimensions.get('window').height*0.015,
                                alignItems:'center'
                            }}>
                                    
                                <View style={{
                                    borderWidth:1,
                                    borderColor:"#cccccc",
                                    width:Dimensions.get('window').width*0.5,
                                    alignItems:'center',
                                    borderRadius:5
                                }}>
                                    <Input placeholder='Nombre del Producto'
                                        style={{
                                            color:'#656565'
                                        }}
                                        value={producto.name}
                                        placeholderTextColor="#656565"
                                        onChangeText={(name)=>{
                                            var productos = this.state.productos
                                            productos[keyP].name = name
                                            this.setState({productos})
                                        }} 
                                    />
                                </View>
                                <View style={{
                                    borderWidth:1,
                                    marginTop:Dimensions.get('window').height*0.015,
                                    borderColor:"#cccccc",
                                    width:Dimensions.get('window').width*0.5,
                                    alignItems:'center',
                                    borderRadius:5
                                }}>
                                    <Input placeholder='Detalles del producto'
                                        style={{
                                            color:'#656565'
                                        }}
                                        value={producto.detail}
                                        placeholderTextColor="#656565"
                                        onChangeText={(detail)=>{
                                            var productos = this.state.productos
                                            productos[keyP].detail = detail
                                            this.setState({productos})
                                        }} 
                                    />
                                </View>
                                
                    <View style={{
                        flexDirection:'row',
                    }}>
                        <FichaSvg 
                            width={Dimensions.get('window').width*0.08} 
                            width={Dimensions.get('window').width*0.08}
                            style={{
                                marginHorizontal:Dimensions.get('window').width*0.01,
                            }}
                            marginTop={Dimensions.get('window').height*0.0325} 
                        />
                        <View style={{
                            flexDirection:'column',
                            paddingRight:Dimensions.get('window').width*0.01
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
                                width: Dimensions.get('window').width*0.84,
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
                                    selectedValue={producto.rubro?producto.rubro:0}
                                    mode="dropdown"
                                    style={{
                                        color:'#656565'
                                    }}
                                    onValueChange={(rubro) =>{
                                        var productos = this.state.productos
                                        productos[keyP].rubro = rubro
                                        productos[keyP].category = null
                                        productos[keyP].subCategory = null
                                        productos[keyP].categories = this.getCategoriesById(productos[keyP].rubro)
                                        this.setState({
                                            productos
                                        })
                                    }}
                                >
                                <Picker.Item value="0" label="Seleccione Rubro"/>
                                {
                                    this.state.rubros.map( (item) => {
                                        return <Picker.Item value={item.id} label={item.name} />
                                    })
                                }
                                </Picker>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        flexDirection:'row',
                        marginTop:Dimensions.get('window').height*0.015,
                    }}>
                        <FichaSvg 
                            width={Dimensions.get('window').width*0.08} 
                            width={Dimensions.get('window').width*0.08}
                            style={{
                                marginHorizontal:Dimensions.get('window').width*0.01,
                            }}
                            marginTop={Dimensions.get('window').height*0.0325} 
                        />
                        <View style={{
                            flexDirection:'column',
                            paddingRight:Dimensions.get('window').width*0.01
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
                                width: Dimensions.get('window').width*0.84,
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
                                    selectedValue={producto.category}
                                    mode="dropdown"
                                    style={{
                                        color:'#656565'
                                    }}
                                    onValueChange={(category) =>{
                                        var productos = this.state.productos
                                        productos[keyP].category = category
                                        productos[keyP].subCategory = null
                                        productos[keyP].subCategories = this.getSubCategoriesById(productos[keyP].category)
                                        this.setState({productos})
                                    }}
                                >
                                <Picker.Item value="0" label="Seleccione Categoría"/>
                                {
                                    producto.categories.map( (item) => {
                                        return <Picker.Item value={item.id} label={item.name} />
                                    })
                                }
                                </Picker>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        flexDirection:'row',
                        marginTop:Dimensions.get('window').height*0.015
                    }}>
                        <FichaSvg 
                            width={Dimensions.get('window').width*0.08} 
                            height={Dimensions.get('window').width*0.08}
                            style={{
                                marginHorizontal:Dimensions.get('window').width*0.01,
                            }}
                            marginTop={Dimensions.get('window').height*0.0325} 
                        />
                        <View style={{
                            flexDirection:'column',
                            paddingRight:Dimensions.get('window').width*0.01
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
                                width: Dimensions.get('window').width*0.84,
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
                                    selectedValue={producto.subCategory}
                                    mode="dropdown"
                                    style={{
                                        color:'#656565'
                                    }}
                                    onValueChange={(subCategory) =>{
                                        var productos = this.state.productos
                                        productos[keyP].subCategory = subCategory
                                        this.setState({productos})
                                    }}
                                >
                                <Picker.Item value="0" label="Seleccione Sub-Categoría"/>
                                {
                                    producto.subCategories.map( (item) => {
                                        return <Picker.Item value={item.id} label={item.name} />
                                    })
                                }
                                </Picker>
                            </View>
                        </View>
                    </View>
                    
                            </View>
                            <View style={{
                                paddingTop:Dimensions.get('window').height*0.025,
                                flexDirection:'row',
                                width:Dimensions.get('window').width*0.86,
                                alignItems:'center'
                            }}>
                                <TouchableOpacity 
                                    onPress={()=>{
                                        if(0 < producto.medidaActive){
                                            --producto.medidaActive
                                            var productos = this.state.productos
                                            productos[keyP] = producto
                                            this.setState({productos})
                                        }
                                    }}
                                    style={{
                                        width:Dimensions.get('window').width*0.125,
                                        height:Dimensions.get('window').width*0.15,
                                        justifyContent:'center'
                                    }}
                                >
                                    <AtrasSvg style={{
                                        width:Dimensions.get('window').width*0.075,
                                        height:Dimensions.get('window').width*0.075,
                                        marginRight:Dimensions.get('window').width*0.05
                                    }}/>
                                </TouchableOpacity>
                                <View style={{
                                    width:Dimensions.get('window').width*0.61
                                }}>
                                    <View style={{
                                        borderWidth:1,
                                        borderColor:"#E6E6E6",
                                    }}>
                                        <View style={{
                                            padding:Dimensions.get('window').width*0.0375
                                        }}>
                                            <Medida 
                                                keyP={keyP}
                                                keyM={producto.medidaActive}
                                            />
                                        </View>
                                    </View>
                                </View>
                                {producto.medidas.length>1?
                                <Delete 
                                    marginRight={0.0625}
                                    marginTop={-0.0375}
                                    onPress={()=>{
                                        producto.medidas.splice(producto.medidaActive,1)
                                        producto.medidaActive = 0
                                        var productos = this.state.productos
                                        productos[keyP] = producto
                                        this.setState({productos})
                                    }}
                                />:null}
                                {(producto.medidas.length-1)==producto.medidaActive?
                                    <TouchableOpacity 
                                        onPress={()=>{
                                            producto.medidas.push({
                                                id:(producto.medidas[producto.medidas.length-1]+1),
                                                talla:'',
                                                color:'',
                                                stock:0
                                            })
                                            ++producto.medidaActive
                                            var productos = this.state.productos
                                            productos[keyP] = producto
                                            this.setState({productos})
                                        }}
                                        style={{
                                            width:Dimensions.get('window').width*0.125,
                                            height:Dimensions.get('window').width*0.15,
                                            justifyContent:'center'
                                        }}
                                    >
                                        <MasSvg style={{
                                            width:Dimensions.get('window').width*0.075,
                                            height:Dimensions.get('window').width*0.075,
                                            marginLeft:Dimensions.get('window').width*0.05
                                        }}/>
                                    </TouchableOpacity>
                                :
                                    <TouchableOpacity onPress={()=>{
                                        if((producto.medidas.length-1) > producto.medidaActive){
                                            ++producto.medidaActive
                                            var productos = this.state.productos
                                            productos[keyP] = producto
                                            this.setState({productos})
                                        }
                                    }}>
                                        <AtrasSvg style={{
                                            width:Dimensions.get('window').width*0.075,
                                            height:Dimensions.get('window').width*0.075,
                                            transform: [{ rotate: '180deg'}],
                                            marginLeft:Dimensions.get('window').width*0.05
                                        }}/>
                                    </TouchableOpacity>
                                }
                            </View>
                            <View style={{
                                width:Dimensions.get('window').width*0.86,
                                flexDirection:'row',
                                justifyContent:'center',
                                alignItems:'center',
                                marginTop:Dimensions.get('window').height*0.02
                            }}>
                                <Text style={{
                                    color:'#5F27A4',
                                    fontSize:Dimensions.get('window').width*0.05
                                }}>
                                    S/
                                </Text>
                                <View style={{
                                    borderWidth:1,
                                    borderColor:'#E6E6E6',
                                    borderRadius:7.5,
                                    width:Dimensions.get('window').width*0.45,
                                    alignItems:'center',
                                    justifyContent:'center',
                                    marginHorizontal:Dimensions.get('window').width*0.01,
                                    paddingHorizontal:Dimensions.get('window').width*0.01
                                }}>
                                    <Input 
                                        style={{
                                            color:'#656565',
                                            height:Dimensions.get('window').height*0.01,
                                            width:"100%"
                                        }}
                                        value={producto.price?producto.price.toString():producto.price==0?0:""}
                                        onChangeText={(price)=>{
                                            var productos = this.state.productos
                                            productos[keyP].price = price?parseInt(price):""
                                            this.setState({productos})
                                        }} 
                                    />
                                </View>
                                <EditarSvg 
                                    width={Dimensions.get('window').width*0.075}
                                    height={Dimensions.get('window').width*0.075}
                                />
                            </View>
                            <View style={{
                                width:Dimensions.get('window').width*0.86,
                            }}>
                                <View style={{
                                    width:Dimensions.get('window').width*0.86,
                                    alignItems:'center',
                                    justifyContent:'center',
                                    marginTop:Dimensions.get('window').height*0.025,
                                    flexDirection:'row'
                                }}>
                                    <Text style={{
                                        fontSize:Dimensions.get('window').width*0.045,
                                        color:'#5F27A4'
                                    }}>
                                        Descripción técnica
                                    </Text>
                                        <EditarSvg 
                                            marginLeft={Dimensions.get('window').width*0.025}
                                            width={Dimensions.get('window').width*0.075}
                                            height={Dimensions.get('window').width*0.075}
                                        />
                                </View>
                                    <View style={{
                                        marginTop:Dimensions.get('window').height*0.015,
                                        borderWidth:1,
                                        borderColor:"#E6E6E6",
                                        height:Dimensions.get('window').height*0.1,
                                        borderRadius:10
                                    }}>
                                        <Textarea placeholder='Descripción técnica...'
                                            value={producto.descrip}
                                            style={{
                                                height:Dimensions.get('window').width*0.1125,
                                                color:'#656565',
                                                marginTop:5,
                                                fontSize:Dimensions.get('window').width*0.0325
                                            }}
                                            placeholderTextColor="#656565"
                                            onChangeText={(descrip)=>{
                                                var productos = this.state.productos
                                                productos[keyP].descrip = descrip
                                                this.setState({productos})
                                            }} 
                                        />
                                    </View>
                            </View>
                            <View style={{
                                width:Dimensions.get('window').width*0.86,
                                flexDirection:'row'
                            }}>
                                <Button block bordered style={{
                                    width:Dimensions.get('window').width*0.40,
                                    marginTop:Dimensions.get('window').height*0.025,
                                    marginRight:Dimensions.get('window').width*0.06,
                                    borderColor:'#5F27A4'
                                    }}
                                    onPress={()=>{ 
                                        var respaldo = AdminProductos.getNewArrayProducts()
                                        this.state.productosRespaldo.forEach((producto,index)=>{
                                            respaldo.push(new Producto(JSON.parse(JSON.stringify(producto))))
                                            if(respaldo[index].rubro){
                                                respaldo[index].categories = this.getCategoriesById(respaldo[index].rubro)
                                            }else{
                                                respaldo[index].categories = new Array()
                                            }
                                            if(respaldo[index].category){
                                                respaldo[index].subCategories = this.getSubCategoriesById(respaldo[index].category)
                                            }else{
                                                respaldo[index].subCategories = new Array()
                                            }
                                        })
                                        this.setState({
                                            modalVisible:false,
                                            productos:respaldo
                                        })
                                    }}
                                >
                                    <Text style={{
                                        color:'#5F27A4'
                                    }}>
                                        Cancelar
                                    </Text>
                                </Button>
                                <Button block style={{
                                    width:Dimensions.get('window').width*0.40,
                                    backgroundColor:'#5F27A4',
                                    marginTop:Dimensions.get('window').height*0.025
                                    }}
                                    onPress={()=>{
                                        if(this.state.register){
                                            this.setState({
                                                modalVisible:false,
                                                register:false,
                                                onLoad:false
                                            })
                                            this.saveProduct(keyP)
                                        }else{
                                            this.setState({
                                                modalVisible:false,
                                                onLoad:false
                                            })
                                            this.save(keyP)
                                        }
                                    }}
                                >
                                    <Text style={{
                                        color:'white'
                                    }}>
                                        Aceptar
                                    </Text>
                                </Button>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        )
    }

    saveProduct = async (keyP)=>{
        var producto = this.state.productos[keyP]
        var index = 0
        if(this.state.productos.length>1){
            index = this.state.productos[keyP-1].numP+1
        }
        if(producto.imagen1 && producto.imagenUri1){
            await this.uploadImageAsync(producto.imagenUri1,producto.imagen1)
        }
        if(producto.imagen2 && producto.imagenUri2){
            await this.uploadImageAsync(producto.imagenUri2,producto.imagen2)
        }
        if(producto.imagen3 && producto.imagenUri3){
            await this.uploadImageAsync(producto.imagenUri3,producto.imagen3)
        }
        if(producto.imagen4 && producto.imagenUri4){
            await this.uploadImageAsync(producto.imagenUri4,producto.imagen4)
        }
        producto.idTienda = AdminCommerces.getCurrentCommerce()
        producto.id = producto.idTienda+"_"+index
        producto.numP = index
        if(await AdminProductos.setProductData(producto)){
            Alert.alert("message","registro de producto exitoso")
        }else{
            Alert.alert("message","registro de producto falló")
        }
        this.actualizar()
    }

    save = async (keyP)=>{
        if(this.state.productos[keyP].imageChange1){
            await this.uploadImageAsync(this.state.productos[keyP].imagenUri1,this.state.productos[keyP].imagen1)
        }
        if(this.state.productos[keyP].imageChange2){
            await this.uploadImageAsync(this.state.productos[keyP].imagenUri2,this.state.productos[keyP].imagen2)
        }
        if(this.state.productos[keyP].imageChange3){
            await this.uploadImageAsync(this.state.productos[keyP].imagenUri3,this.state.productos[keyP].imagen3)
        }
        if(this.state.productos[keyP].imageChange4){
            await this.uploadImageAsync(this.state.productos[keyP].imagenUri4,this.state.productos[keyP].imagen4)
        }
        if(await AdminProductos.updateProduct(this.state.productos[keyP])){
            Alert.alert("message","Modificación de producto exitosa")
        }else{
            Alert.alert("message","Modificación de producto fallida")
        }
        this.actualizar()
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

    Quantity = ()=>{
        return(
            <View style={{
                flexDirection:'row',
                borderWidth:0.25,
                borderColor:'#5F27A4',
                marginTop:Dimensions.get('window').height*0.01,
                width:Dimensions.get('window').width*0.3
            }}>
                <TouchableOpacity onPress={()=>{
                }}>
                    <View style={{
                        width:Dimensions.get('window').width*0.1,
                        borderWidth:1,
                        borderColor:'#5F27A4',
                        alignItems:'center'
                    }}>
                        <Text>
                            -
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={{
                    width:Dimensions.get('window').width*0.1,
                    alignItems:'center',
                    backgroundColor:'#5F27A4',
                    borderWidth:1,
                    borderColor:'#5F27A4',
                }}>
                    <Text style={{
                        color:'white'
                    }}>
                        001
                    </Text>
                </View>
                <TouchableOpacity onPress={()=>{
                }}>
                    <View style={{
                        width:Dimensions.get('window').width*0.1,
                        borderWidth:1,
                        borderColor:'#5F27A4',
                        alignItems:'center'
                    }}>
                        <Text>
                            +
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    Picker = ({label,items,onChange,reference,style})=>{
        return(
            <View style={[{
                flexDirection:'column',
                paddingRight:Dimensions.get('window').width*0.01
            },style]}>
                <View>
                    <Text style={{
                        fontSize:Dimensions.get('window').width*0.04,
                        color:'#5F27A4'
                    }}>
                        {label}
                    </Text>
                </View>
                <View style={{
                    width: Dimensions.get('window').width*0.84,
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
                        selectedValue={reference}
                        mode="dropdown"
                        style={{
                            color:'#656565'
                        }}
                        onValueChange={(value) =>{
                            onChange(value)
                        }}
                    >
                    <Picker.Item value="0" label={"Seleccione "+label}/>
                    {
                        items.map( (item) => {
                            return <Picker.Item value={item.id} label={item.name} />
                        })
                    }
                    </Picker>
                </View>
            </View>
        )
    }
    
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
        fontSize:Dimensions.get('window').width*0.04
    },
    text_btn_carBuy_2:{
        color:"#000000",
        fontSize:Dimensions.get('window').width*0.04
    },
    content_btn_carBuy:{
        paddingHorizontal:Dimensions.get('window').width*0.1,
        height:Dimensions.get('window').height*0.3,
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
        marginVertical:Dimensions.get('window').height*0.015
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