import React from 'react'
import {StyleSheet,View,Text,Dimensions,Image,ScrollView,TouchableOpacity, Modal, Alert, Platform, ToastAndroid} from 'react-native'
import {Button, Card,CardItem,Body, Picker, Spinner} from 'native-base'
import {Divider} from 'react-native-elements'
import Carousel from "../../../components/Carousel";
import IndumentariaSvg from '../../../../assets/icon/rubros/indumentaria.svg'
import PhoneSvg from '../../../../assets/icon/general/phone.svg'
import EditarSvg from '../../../../assets/icon/general/editar.svg'
import LocationSvg from '../../../../assets/icon/general/location.svg'
import EmailSvg from '../../../../assets/icon/general/email.svg'
import CarSvg from '../../../../assets/icon/general/carro.svg'
import AtrasSvg from '../../../../assets/icon/header/atras.svg'
import { render } from 'react-dom';
import {WebView} from 'react-native-webview'
import Producto from '../../../model/Producto'
import Commerce from '../../../model/Commerce'
import AdminProductos from '../../../model/AdminProductos'
import AdminCommerces from '../../../model/AdminCommerces'
import Medida from '../../../model/Medida'
import {ProductoPedido, Pedido,GetInstances} from '../../../model/Pedido'
import 'firebase/storage'
import firebase from '../../../firebase/Firebase'
import dataRubro from '../../../components/dataRubro'
import dataCategory from '../../../components/dataCategory'
import dataSubCategory from '../../../components/dataSubCategory'
import CarritoSvg from '../../../../assets/icon/general/carrito.svg'
import ElectrodomesticosSvg from '../../../../assets/icon/rubros/electrodomesticos.svg'
import DeportivoSvg from '../../../../assets/icon/rubros/deportivo.svg'
import LenceriaSvg from '../../../../assets/icon/rubros/lenceria.svg'
import MuebleSvg from '../../../../assets/icon/rubros/mueble.svg'
import TecnologiaSvg from '../../../../assets/icon/rubros/tecnologia.svg'
import CalzadoSvg from '../../../../assets/icon/rubros/calzado.svg'
import AccesorioSvg from '../../../../assets/icon/rubros/accesorio.svg'
import MaquillajeSvg from '../../../../assets/icon/rubros/maquillaje.svg'
import PerfumeSvg from '../../../../assets/icon/rubros/perfume.svg'
import AdminUsers from '../../../model/AdminUsers';

export default class ProductoView extends React.Component {

    constructor(props){
        super(props)
        let producto = new Producto(props.route.params?props.route.params.producto:null)
        this.state = {
            modalVisible:false,
            pickerColor:'9999',
            pickerTalla:'9999',
            producto,
            commerce:new Commerce(),
            imagen:null,
            imagen2:null,
            imagen3:null,
            imagen4:null,
            imagenCommerce:null,
            ifTalla:this.ifTalla(producto.rubro),
            unid:0,
            load:true
        }

        AdminCommerces.getDataCommerce(producto.idTienda)
        .then((commerce)=>{
            this.getUrl(commerce.urlPhoto)
            .then((uri)=>{
                this.setState({commerce,imagenCommerce:uri})
            })
        })
        if(this.state.producto.imagen1){
            this.getUrl(this.state.producto.imagen1)
            .then((uri)=>{
                this.setState({imagen:uri})
            })
        }
        if(this.state.producto.imagen2){
            this.getUrl(this.state.producto.imagen2)
            .then((uri)=>{
                this.setState({imagen2:uri})
            })
        }
        if(this.state.producto.imagen3){
            this.getUrl(this.state.producto.imagen3)
            .then((uri)=>{
                this.setState({imagen3:uri})
            })
        }
        if(this.state.producto.imagen4){
            this.getUrl(this.state.producto.imagen4)
            .then((uri)=>{
                this.setState({imagen4:uri})
            })
        }
    }
    getProduct = async()=>{

    }
    
    setPedido = async()=>{
        let validate = false
        if(this.state.ifTalla){
            if(this.state.pickerColor != '9999' && this.state.pickerTalla != '9999'&& this.state.unid != 0){
                validate = true
            }
        }else{
            if(this.state.pickerColor != '9999' && this.state.unid != 0){
                validate = true
            }
        }
        if (validate) {
            this.setState({load:false})
            let color = this.getMedidaByid(this.state.pickerColor).color
            let talla = null
            let medida = GetInstances.newMedida()
            let medidaP = GetInstances.newMedida()
            if(this.state.ifTalla){//si la talla está definida
                talla = this.getMedidaByid(this.state.pickerTalla).talla
                medida = this.getMedidaByColTall(color,talla)
                medidaP = JSON.parse(JSON.stringify(medida))
            }else{//si la talla no está definida
                medida = this.getMedidaByid(this.state.pickerColor)
                medidaP = JSON.parse(JSON.stringify(medida))
            }
            medida.stock = this.state.unid
            var producto = GetInstances.newProductPedido()
            let pedido = new Pedido()
            let pedidoT = await AdminUsers.getPedido()
            if(pedidoT){//si existe un pedido abierto
                pedido = new Pedido(JSON.parse(JSON.stringify(pedidoT)))
            }else{
                pedido.listProducts = GetInstances.NewArrayProductP()
            }
            let productKey = null
            let cont = 0
            pedido.listProducts.map((productPedido)=>{
                if(productPedido.id == this.state.producto.id){
                    producto = productPedido
                    productKey = cont
                }
                ++cont
            })
            if (productKey != null) {//si ya hay reservas del producto en el pedido
                producto.medidas.push(medida)
                pedido.listProducts[productKey] = producto
            }else{//si no hay reservas
                producto.id = this.state.producto.id
                producto.name = this.state.producto.name
                producto.idTIenda = this.state.producto.idTienda
                producto.price = this.state.producto.price
                producto.createAt = new Date()
                producto.imagen1 = this.state.producto.imagen1
                producto.medidas.push(medida)
                pedido.listProducts.push(producto)
                pedido.stateShipping = false
            }
            if (pedidoT) {//si existe un pedido abierto
                medidaP.stock -= medida.stock
                medidaP.producto = this.state.producto.id
                let update = await AdminProductos.updateMedida(medidaP)
                if (update) {
                    let product = this.state.producto
                    let i = 0
                    product.medidas.map((med)=>{
                        if (med.id == medidaP.id) {
                            product.medidas[i] = JSON.parse(JSON.stringify(medidaP))
                        }
                        ++i
                    })
                    this.setState({producto:product})
                }else{
                    this.notifyMessage("Se produjo un problema al agregar el pedido al carrito de compras")
                    return false
                }
                let result = await AdminUsers.updatePedidoData(pedido)
                if (result){
                    this.notifyMessage("Pedido Agregado al carrito de compras exitosamente")
                    this.setState({modalVisible:false})
                }else{
                    this.notifyMessage("Se produjo un problema al agregar el pedido al carrito de compras")
                }
                this.setState({load:true})
            }else{//si no existe un pedido abierto

                pedido.state = 0
                pedido.idClient = AdminUsers.getCurrentUser().uid
                medidaP.stock -= medida.stock
                medidaP.producto = this.state.producto.id
                let update = await AdminProductos.updateMedida(medidaP)
                if (update) {
                    let product = this.state.producto
                    let i = 0
                    product.medidas.map((med)=>{
                        if (med.id == medidaP.id) {
                            product.medidas[i] = JSON.parse(JSON.stringify(medidaP))
                        }
                        ++i
                    })
                    this.setState({producto:product})
                }else{
                    this.notifyMessage("Se produjo un problema al agregar el pedido al carrito de compras")
                    return false
                }
                let result = await AdminUsers.setPedidoData(pedido)
                if (result){
                    this.notifyMessage("Pedido Agregado al carrito de compras exitosamente")
                    this.setState({modalVisible:false})
                }else{
                    this.notifyMessage("Se produjo un problema al agregar el pedido al carrito de compras")
                }
                this.setState({load:true})
            }
        }else{
            this.notifyMessage("Especifique las características de su compra para procesar su pedido")
        }
    }

    notifyMessage(msg) {
        if (Platform.OS === 'android') {
          ToastAndroid.show(msg, ToastAndroid.SHORT)
        } else {
          AlertIOS.alert(msg);
        }
    }

    

    getMedidasByColor = (id)=>{
        let medidas = []
        let color = this.getMedidaByid(id)?this.getMedidaByid(id).color:""
        this.state.producto.medidas.map((medida)=>{
            if(medida.color == color){
                medidas.push(medida)
            }
        })
        return medidas
    }
    getMedidasByTalla = (id)=>{
        let medidas = []
        let color = this.getMedidaByid(id)?this.getMedidaByid(id).color:""
        this.state.producto.medidas.map((medida)=>{
            if(medida.talla == talla){
                medidas.push(medida)
            }
        })
        return medidas
    }

    getMedidaByid(id){
        let result = null
        this.state.producto.medidas.map((medida)=>{
            if(!result && medida.id == id){
                result = medida
            }
        })
        return JSON.parse(JSON.stringify(result))
    }

    removeRepeatColor(){
        var result = []
        this.state.producto.medidas.map((medida)=>{
            let repeat = false
            result.map((item)=>{
                if(item.color == medida.color){
                    repeat = true
                }
            })
            if (!repeat) {
                result.push(medida)
            }
        })
        return result
    }

    removeRepeatTalla(){
        var result = []
        this.getMedidasByColor(this.state.pickerColor).map((medida)=>{
            let repeat = false
            result.map((item)=>{
                if(item.talla == medida.talla){
                    repeat = true
                }
            })
            if (!repeat) {
                result.push(medida)
            }
        })
        return result
    }

    getMedidaByColTall(color,talla){
        let result = null
        this.state.producto.medidas.map((medida)=>{
            if(!result && medida.color == color && medida.talla == talla){
                result = medida
            }
        })
        return JSON.parse(JSON.stringify(result))
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
    getRubro(id){
        let result = null
        dataRubro.map((item)=>{
            if(!result && item.id == id){
                result = item
            }
        })
        return result
    }
    getCategory(id){
        let result = null
        dataCategory.map((item)=>{
            if(!result && item.id == id){
                result = item
            }
        })
        return result
    }
    getSubCategory(id){
        let result = null
        dataSubCategory.map((item)=>{
            if(!result && item.id == id){
                result = item
            }
        })
        return result
    }
    ifTalla(rubro){
        if(
            rubro == 2 ||
            rubro == 11 ||
            rubro == 7 ||
            rubro == 8
        ){
            return true
        }
        return false
    }
    async getUrl(image){
        var uri = null
        try{
            var storage = firebase.storage()
            var pathReference = storage.ref("commerce_profile/"+image)
            uri = await pathReference.getDownloadURL()
        }catch(err){
            console.error("error en: ",err);
        }
        return uri
    }
    
    Modal = ({})=>{
        var PickerColor = this.Picker
        var Quantity = this.Quantity
        var work = (fun)=>{
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
                    backgroundColor:"rgba(0, 0, 0, 0.4)",

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
                                    this.setState({
                                        modalVisible:false
                                    })
                                }}>
                                    <AtrasSvg 
                                        width={Dimensions.get('window').width*0.1}
                                        height={Dimensions.get('window').width*0.1}
                                        style={styles.iconBack}
                                    />
                                </Button>
                                <View style={{
                                    width:Dimensions.get('window').width*0.96,
                                    marginLeft:-Dimensions.get('window').width*0.15,
                                    alignItems:'center'
                                }}>
                                    <View style={{
                                        alignItems:'center'
                                    }}>
                                        <Text style={{
                                            color:'#5F27A4',
                                            fontSize:Dimensions.get('window').width*0.045
                                        }}>
                                            {this.state.producto.name}
                                        </Text>
                                        <Text style={{
                                            fontWeight:'bold',
                                            fontSize:Dimensions.get('window').width*0.04
                                        }}>
                                            S/{this.state.producto.price}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{
                                marginTop:Dimensions.get('window').height*0.025,
                                alignItems:'center'
                            }}>
                                <Carousel
                                    arrayImages={work(()=>{
                                        let array = []
                                        if(this.state.producto.imagen1){
                                            array.push({uri:this.state.imagen})
                                        }
                                        if(this.state.producto.imagen2){
                                            array.push({uri:this.state.imagen2})
                                        }
                                        if(this.state.producto.imagen3){
                                            array.push({uri:this.state.imagen3})
                                        }
                                        if(this.state.producto.imagen4){
                                            array.push({uri:this.state.imagen4})
                                        }
                                        return array
                                    })}
                                    width={Dimensions.get('window').width*0.48}
                                    height={Dimensions.get('window').width*0.28}
                                />
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
                            <PickerColor
                                style={{
                                    marginTop:Dimensions.get('window').height*0.01
                                }}
                                reference={this.state.pickerColor} 
                                label="Color"
                                type="color"
                                items={this.removeRepeatColor()}
                                onChange={(value)=>{
                                    if(this.state.ifTalla){
                                        this.setState({
                                            pickerColor:value,
                                            pickerTalla:'9999',
                                            unid:0
                                        })
                                    }else{
                                        let stock = this.getMedidaByid(value)?this.getMedidaByid(value).stock:0
                                        this.setState({
                                            pickerColor:value,
                                            unid:stock?1:0
                                        })
                                    }
                                }}
                            />
                            {this.state.ifTalla?
                                <PickerColor
                                    style={{
                                        marginTop:Dimensions.get('window').height*0.01
                                    }}
                                    reference={this.state.pickerTalla} 
                                    label="Talla"
                                    type="talla"
                                    items={this.removeRepeatTalla()}
                                    onChange={(value)=>{
                                        let stock = this.getMedidaByid(value)?this.getMedidaByid(value).stock:0
                                        this.setState({
                                            pickerTalla:value,
                                            unid:stock?1:0
                                        })
                                    }}
                                />
                                :
                                null
                            }
                            <View style={{
                                width:Dimensions.get('window').width*0.86,
                                alignItems:'center'
                            }}>
                                <View style={{
                                    alignItems:'center',
                                    width:Dimensions.get('window').width*0.5,
                                    marginTop:Dimensions.get('window').height*0.015
                                }}>
                                    {
                                        this.state.ifTalla?
                                            <Text style={
                                                this.state.pickerColor != '9999' && this.state.pickerTalla != '9999'?
                                                        this.getMedidaByid(this.state.pickerTalla).stock>0?
                                                        styles.stop
                                                    :
                                                        styles.stopEmpty
                                                :
                                                    styles.stopNotSelected
                                                }>
                                                Stock: {
                                                    this.getMedidaByid(this.state.pickerTalla)?
                                                    this.getMedidaByid(this.state.pickerTalla).stock:0
                                                    } Und
                                            </Text>
                                        :
                                            <Text style={
                                                this.state.pickerColor != '9999'?
                                                    this.getMedidaByid(this.state.pickerColor).stock>0?
                                                        styles.stop
                                                    :
                                                        styles.stopEmpty
                                                :
                                                    styles.stopNotSelected
                                                }>
                                                Stock: {
                                                    this.getMedidaByid(this.state.pickerColor)?
                                                    this.getMedidaByid(this.state.pickerColor).stock:0
                                                } Und
                                            </Text>
                                    }
                                </View>
                            </View>
                            <View style={{
                                width:Dimensions.get('window').width*0.96,
                                flexDirection:'row',
                                marginLeft:Dimensions.get('window').width*-0.1,
                                justifyContent:'center',
                                alignItems:'center',
                                marginTop:Dimensions.get('window').height*0.015
                            }}>
                                <Text style={{
                                    color:'#5F27A4',
                                    marginRight:10,
                                    marginTop:7.5
                                }}>
                                    Ordenar
                                </Text>
                                <Quantity />
                            </View>
                            <View style={{
                                width:Dimensions.get('window').width*0.86,
                            }}>
                                <View style={{
                                    width:Dimensions.get('window').width*0.86,
                                    alignItems:'center',
                                    marginTop:Dimensions.get('window').height*0.025
                                }}>
                                    <Text style={{
                                        fontSize:Dimensions.get('window').width*0.045,
                                        color:'#5F27A4'
                                    }}>
                                        Descripción técnica
                                    </Text>
                                </View>
                                <ScrollView style={{
                                    height:Dimensions.get('window').height*0.1,
                                    marginTop:Dimensions.get('window').height*0.015
                                }}>
                                    <Text style={{
                                        color:'#656565'
                                    }}>
                                        {this.state.producto.descrip}    
                                    </Text>
                                </ScrollView>
                            </View>
                            <Button block style={{
                                backgroundColor:'#5F27A4',
                                marginTop:Dimensions.get('window').height*0.025
                                }}
                                onPress={()=>{
                                    this.setPedido()
                                }}
                            >
                                <Text style={{
                                    color:'white'
                                }}>
                                    Agregar al Carrito
                                </Text>
                            </Button>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        )
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
                    if( this.state.unid>1){
                        this.setState({unid:this.state.unid-1})
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
                            this.state.unid<10?
                            "00"+this.state.unid
                            :
                            this.state.unid>99?
                            this.state.unid
                            :
                            "0"+this.state.unid
                        }
                    </Text>
                </View>
                <TouchableOpacity onPress={()=>{
                    let limit = 0
                    if (this.state.ifTalla) {
                        limit = this.getMedidaByid(this.state.pickerTalla)?this.getMedidaByid(this.state.pickerTalla).stock:0
                    }else{
                        limit = this.getMedidaByid(this.state.pickerColor)?this.getMedidaByid(this.state.pickerColor).stock:0
                    }
                    if( this.state.unid<limit){
                        this.setState({unid:this.state.unid+1})
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
        )
    }

    Picker = ({label,items,onChange,reference,style,type})=>{
        var work = (fun)=>{
            fun()
        }
        var log = ""
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
                    <Picker.Item value="9999" label={"Seleccione "+label}/>
                    {
                        items.map( (item) => {
                            return <Picker.Item value={item.id} label={item[type]} />
                        })
                    }
                    {work(()=>{
                        //Alert.alert('message','log: '+log)
                    })}
                    </Picker>
                </View>
            </View>
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
    if (!this.state.load) {
        return(<Spinner 
            size={Dimensions.get('window').height*0.10}
            style={{
                flex: 1,
                alignSelf:'center'
            }}
            color='#FDD501'
          />)
    }
    var ifTalla = this.state.ifTalla
    var producto = this.state.producto
    var rubro = producto.rubro
    if(ifTalla){
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
        <View>
            <this.Modal />
        <ScrollView style={{height:Dimensions.get('window').height*0.7}}>
            <Carousel
                arrayImages={[{uri:this.state.imagenCommerce}]}
                height={Dimensions.get('window').height*0.175}
                width={Dimensions.get('window').width}
            />
            <Divider style={styles.divider} />
            <View style={{paddingVertical:Dimensions.get('window').width*0.015,paddingHorizontal:Dimensions.get('window').width*0.04}}>
                <View style={{flexDirection:'row'}}>
                    <View style={styles.ContentTextCategory}>
                        {this.getIcon(this.state.producto.rubro)}
                        <Text style={styles.textCategory}>
                            {this.getRubro(this.state.producto.rubro).name}
                        </Text>
                    </View>
                    <View style={{flexDirection:'row-reverse',alignItems: 'center'}} >
                        {this.state.producto.subCategory?
                            <Button style={{
                                backgroundColor:'#5F27A4', 
                                paddingHorizontal:Dimensions.get('window').width*0.025
                            }}small>
                                <Text style={{color:'white'}} >
                                    {this.state.producto.subCategory?
                                        this.getSubCategory(this.state.producto.subCategory).name
                                    :
                                        this.getCategory(this.state.producto.category).name
                                    }
                                </Text>
                            </Button>
                        :
                            null
                        }
                    </View>
                </View>
            </View>
            <Divider style={styles.divider} />
            <Divider style={styles.divider} />
            <TouchableOpacity 
                onPress={()=>{
                    this.setState({
                        modalVisible:true
                    })
                }}            
                style={{
                    paddingHorizontal:Dimensions.get('window').width*0.2,
                    paddingTop:Dimensions.get('window').height*0.0125
                }}
            >
                <Card>
                    <CardItem>
                        <Body style={{alignItems:'center'}}>
                            <Image style={{
                                width:Dimensions.get('window').height*0.125,
                                height:Dimensions.get('window').height*0.125,
                            }} 
                            source={{uri:this.state.imagen}} />
                            <View style={{width:"100%",height:1.1,backgroundColor:'#d6d6d6',marginVertical:Dimensions.get('window').width*0.005}} />
                            <Text style={{
                                fontSize: Dimensions.get('window').height*0.01875,
                                color: "#5F27A4",
                                textAlign: 'center',
                                marginVertical:Dimensions.get('window').height*0.005
                            }}>
                                Detalle: {this.state.producto.detail}
                            </Text>
                            <View style={{width:"100%",height:1.1,backgroundColor:'#d6d6d6'}} />
                            <Text style={stock>0?styles.stop:styles.stopEmpty}>
                                Stock: {stock} Und
                            </Text>
                            <View style={{alignItems: "center", alignContent: "center", marginTop:2.5}}>
                                <Text style={styles.title}>{producto.name}</Text>
                                {ifTalla?<Text style={styles.text}>Talla:{tallas}</Text>:null}
                                <Text style={styles.text}>Colores: {colores}</Text>
                                <Text style={styles.text2}>S/ {producto.price}</Text>
                            </View>
                        </Body>
                    </CardItem>
                </Card>
            </TouchableOpacity>
        </ScrollView>
        <View style={styles.content_btn_carBuy}>
            <Button style={styles.btn_carBuy} block>
                <CarSvg style={{
                    width: Dimensions.get('window').width*0.075,
                    height: Dimensions.get('window').width*0.075,
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
      width: Dimensions.get('window').width*0.075,
      height: Dimensions.get('window').width*0.075
    },
    divider: {
        backgroundColor: "#B3B3B3",
        marginHorizontal: 4
    },
    data: {
        flex: 1,
        flexDirection: "row",
        alignItems:'center',
        marginVertical: 1,
        padding:4
    },
    contentTextDate:{

    },
    textData: {
        marginTop: 4,
        marginLeft: 10,
        fontSize: 14,
        color: "#5F27A4"
    },
    stop: {
        fontSize: 12,
        fontFamily: 'WorkSans-Regular',
        color: "#FFFFFF",
        backgroundColor: "#5F27A4",
        width: "86%",
        paddingVertical: 2,
        textAlign:'center',
        marginTop:Dimensions.get('window').height*0.0075
    },
    stopEmpty:{
        fontSize: 12,
        fontFamily: 'WorkSans-Regular',
        color: "#FFFFFF",
        backgroundColor: "#EA5743",
        width: "86%",
        paddingVertical: 2,
        textAlign:'center',
        marginTop:Dimensions.get('window').height*0.0075
    },
    stopNotSelected:{
        fontSize: 12,
        fontFamily: 'WorkSans-Regular',
        color: "#FFFFFF",
        backgroundColor: "#b3b3b3",
        width: "86%",
        paddingVertical: 2,
        textAlign:'center',
        marginTop:Dimensions.get('window').height*0.0075
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
})