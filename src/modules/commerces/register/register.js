import React from 'react'
import {ScrollView,KeyboardAvoidingView,StyleSheet,View,Text,Dimensions,TouchableOpacity,Image,Alert, Modal, Platform, ToastAndroid} from 'react-native'
import {Button,Form,Input,Item,Label, Content,Picker, Icon, Textarea, Spinner} from 'native-base'
import firebase from '../../../firebase/Firebase'
import 'firebase/storage'
import GallerySvg from '../../../../assets/icon/general/galeria.svg'
import BusinessSvg from '../../../../assets/icon/general/negocio.svg'
import IdSvg from '../../../../assets/icon/general/identificacion.svg'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import dataRubro from '../../../components/dataRubro'
import dataCategory from '../../../components/dataCategory'
import dataSubCategory from '../../../components/dataSubCategory'
import Commerce from '../../../model/Commerce'
import FichaSvg from '../../../../assets/icon/general/ficha.svg'
import LocationSvg from '../../../../assets/icon/general/location.svg'
import PhoneSvg from '../../../../assets/icon/general/phone.svg'
import EmailSvg from '../../../../assets/icon/general/email.svg'
import MasSvg from '../../../../assets/icon/general/mas.svg'
import CamaraSvg from '../../../../assets/icon/general/camara.svg'
import RadioForm from 'react-native-simple-radio-button'
import CheckedSvg from '../../../../assets/icon/general/checked.svg'
import UnCheckedSvg from '../../../../assets/icon/general/unchecked.svg'
import AdminCommerces from '../../../model/AdminCommerces'
import AdminProductos from '../../../model/AdminProductos'
import Producto from '../../../model/Producto'

export default class Register extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            image: null,
            commerce:new Commerce(),
            rubros:dataRubro,
            categories:[],
            subCategories:[],
            pass2:false,
            modalVisible:false,
            pic:0,
            register:false,
            productos:[
                new Producto()
            ],
            keyProduct:0
        }
        var commerce = this.state.commerce
        commerce.code_phone_1 = "+51"
        commerce.name = "Comercio 1"
        commerce.ruc = "182903030"
        commerce.dir_local = "Ubicación 1"
        commerce.phone_1 = "214712940"
        commerce.email = "correo.proof."+Math.floor(Math.random() * 9999)+"@gmail.com"
        commerce.legalEntity = true
        this.setState({commerce})
        this.radio_props = [
            {label: 'Ente Jurídico  ', value: 0 },
            {label: 'Persona Natural', value: 1 }
        ];
        this.tallas = [
            {value:1,name:"1"},
            {value:2,name:"2"},
            {value:3,name:"3"},
            {value:4,name:"4"},
            {value:5,name:"5"}
        ]
        this.colores = [
            {value:1,name:"Amarillo"},
            {value:2,name:"Azul"},
            {value:3,name:"Rojo"},
            {value:4,name:"Verde"},
            {value:5,name:"Negro"}
        ]
    }

    contMedidas = ()=>{
        var i = 0
        this.state.productos.map((producto)=>{
            producto.medidas.map(()=>{
                ++i
            })
        })
        return i
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

    imagen = ({image})=>{
        return(
            <View style={{
                width:Dimensions.get('window').width,
                height:Dimensions.get('window').height*0.2,
                backgroundColor:'#e6e6e6',
                alignItems:'center',
                justifyContent:'center'
            }}>
                {image?
                    <Image
                        source={{uri:image}}
                        style={{
                            width:Dimensions.get('window').width,
                            height:Dimensions.get('window').height*0.2,
                        }}
                    />
                    :
                    <GallerySvg
                        width={Dimensions.get('window').width*0.5}
                        height={Dimensions.get('window').height*0.2}
                    />
                }
            </View>
        )
    }

    input = ({placeholder,onChangeText})=>{
        return(<View style={{
            borderColor:'#cccccc',
            borderWidth:1,
            borderRadius:5,
            paddingLeft:Dimensions.get('window').width*0.025
        }}>
            <Input placeholder={placeholder}
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

    medida = ({keyP,keyM,ultimo,marginTop})=>{
        function work(fun){
            return fun()
        }
        var Input = this.input
        var Stock = this.stock
        var ifTalla = false
        var rubro = this.state.productos[keyP].rubro
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
                    width:'100%',
                    height:1,
                    backgroundColor:'#cccccc',
                    marginBottom:Dimensions.get('window').height*0.015
                }}/>
                <View style={{
                    flexDirection:'row'
                }}>
                    {ifTalla?<View style={{ width:"47.5%",marginRight:"5%"}}>
                        <Input
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
                        <Input
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
                    flexDirection:'row',
                    width:"100%",
                    marginTop:Dimensions.get('window').height*0.01
                }}>
                    <View style={{
                        width:"60%"
                    }}>
                        <Stock keyP={keyP} keyM={keyM} />
                    </View>

                    {ultimo?
                    <TouchableOpacity 
                        onPress={()=>{
                            var productos = this.state.productos
                            productos[keyP].medidas.push({
                                talla:'',
                                color:'',
                                stock:0
                            })
                            this.setState({productos})
                        }}
                        style={{
                            width:"100%"
                        }}
                    >
                        <View style={{
                            width:"40%",
                            flexDirection:'row',
                            alignItems:'flex-end',
                            justifyContent:'flex-end'
                        }}>
                            <View style={{
                                justifyContent:'center',
                                height:Dimensions.get('window').width*0.1,
                                marginRight:5
                            }}>
                                {ifTalla?
                                <Text style={{
                                    color:'#5F27A4'
                                }}>
                                    Agregar mas tallas y colores
                                </Text>:
                                <Text style={{
                                    color:'#5F27A4'
                                }}>
                                    Agregar mas colores
                                </Text>
                                }
                            </View>
                            <MasSvg 
                                width={Dimensions.get('window').width*0.1}
                                height={Dimensions.get('window').width*0.1}
                            />
                        </View>
                    </TouchableOpacity>
                        :
                    null
                    }
                </View>
            </View>
        )
    }

    producto = ({producto,initial,changeValue,keyP})=>{
        var Imagen = this.imagen
        var Stock = this.stock
        var Medida = this.medida
        function work(fun){
             return fun()
        }
        return(
            <View style={{
                flex:1
            }}>
                <View style={{
                    flex:1,
                }}>
                    {work(()=>{
                        switch (producto.imageActive) {
                            case 0:
                                return <Imagen image={producto.imagenUri1} />
                            case 1:
                                return <Imagen image={producto.imagenUri2} />
                            case 2:
                                return <Imagen image={producto.imagenUri3} />
                            case 3:
                                return <Imagen image={producto.imagenUri4} />
                            default:
                                return <Imagen image={producto.imagenUri1} />
                        }
                    })}
                    <Button style={{
                        width:Dimensions.get('window').width,
                        alignItems:'center',
                        justifyContent:'center',
                        backgroundColor:'#5f27a4'
                    }} onPress={()=>{
                        this.setState({
                            modalVisible:true,
                            keyProduct:keyP
                        })
                    }}>
                        {work(()=>{
                        switch (producto.imageActive) {
                            case 0:
                                return (<Text style={{alignSelf:'center',color:"white"}}>
                                    Foto uno del producto
                                </Text>)
                            case 1:
                                return (<Text style={{alignSelf:'center',color:"white"}}>
                                    Foto dos del producto
                                </Text>)
                            case 2:
                                return (<Text style={{alignSelf:'center',color:"white"}}>
                                    Foto tres del producto
                                </Text>)
                            case 3:
                                return (<Text style={{alignSelf:'center',color:"white"}}>
                                    Foto cuatro del producto
                                </Text>)
                            default:
                                return (<Text style={{alignSelf:'center',color:"white"}}>
                                    Foto uno del producto
                                </Text>)
                        }
                    })}
                    </Button>
                </View>
                <View style={{
                            alignItems:'center',
                }}>
                    <View style={{
                        paddingTop:Dimensions.get('window').height*0.025
                    }}>
                        <RadioForm
                            radio_props={[
                                {value:0,uri:producto.imagen1},
                                {value:1,uri:producto.imagen2},
                                {value:2,uri:producto.imagen3},
                                {value:3,uri:producto.imagen4}
                            ]}
                            initial={initial}
                            formHorizontal={true}
                            labelHorizontal={true}
                            buttonColor={'#5F27A4'}
                            selectedButtonColor={'#5F27A4'}
                            animation={true}
                            onPress={(value) => {
                                changeValue(value,keyP)
                            }}
                        />
                    </View>
                    <View style={{
                        width:Dimensions.get('window').width*0.975,
                        height:1,
                        backgroundColor:'#cccccc',
                        marginVertical:Dimensions.get('window').height*0.025
                    }}/>
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
                                    selectedValue={this.state.productos[keyP].rubro}
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
                                    selectedValue={this.state.productos[keyP].category}
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
                                    this.state.productos[keyP].categories.map( (item) => {
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
                                    selectedValue={this.state.productos[keyP].subCategory}
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
                                    this.state.productos[keyP].subCategories.map( (item) => {
                                        return <Picker.Item value={item.id} label={item.name} />
                                    })
                                }
                                </Picker>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        width:Dimensions.get('window').width*0.84,
                        marginTop:Dimensions.get('window').height*0.015,
                        marginLeft:Dimensions.get('window').width*0.09
                    }}>
                        <View style={{
                            borderColor:'#cccccc',
                            borderWidth:1,
                            borderRadius:5,
                            paddingLeft:Dimensions.get('window').width*0.025
                        }}>
                            <Input placeholder='Nombre del Producto'
                                style={{
                                    color:'#656565',
                                    fontSize:Dimensions.get('window').width*0.0325,
                                    height:Dimensions.get('window').width*0.1
                                }}
                                placeholderTextColor="#656565"
                                onChangeText={(name)=>{
                                    var productos = this.state.productos
                                    productos[keyP].name = name
                                    this.setState({productos})
                                }} 
                            />
                        </View>
                        <View style={{
                            marginTop:Dimensions.get('window').height*0.015,
                            borderColor:'#cccccc',
                            borderWidth:1,
                            borderRadius:5,
                            paddingLeft:Dimensions.get('window').width*0.01
                        }}>
                            <Textarea placeholder='Detalle del producto/Marca...'
                                style={{
                                    height:Dimensions.get('window').width*0.1125,
                                    color:'#656565',
                                    marginTop:5,
                                    fontSize:Dimensions.get('window').width*0.0325
                                }}
                                placeholderTextColor="#656565"
                                onChangeText={(detail)=>{
                                    var productos = this.state.productos
                                    productos[keyP].detail = detail
                                    this.setState({productos})
                                }} 
                            />
                        </View>
                    </View>
                    <View style={{
                        width:Dimensions.get('window').width*0.84,
                        marginTop:Dimensions.get('window').height*0.015,
                        marginLeft:Dimensions.get('window').width*0.09
                    }}>
                        <View style={{
                            borderColor:'#cccccc',
                            borderWidth:1,
                            borderRadius:5,
                            paddingLeft:Dimensions.get('window').width*0.01
                        }}>
                            <Textarea placeholder='Descripción técnica...'
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
                        width:Dimensions.get('window').width*0.93,
                        marginTop:Dimensions.get('window').height*0.015,
                        flexDirection:'row',
                        alignItems:'center'
                    }}>
                        <View style={{
                            width:Dimensions.get('window').width*0.09,
                            alignItems:'center'
                        }}>
                            <Text style={{
                                color:'#5F27A4',
                                fontSize:Dimensions.get('window').width*0.05,
                                fontWeight:'bold'
                            }}>
                                S/
                            </Text>
                        </View>
                        <View style={{
                            width:Dimensions.get('window').width*0.84,
                            borderColor:'#cccccc',
                            borderWidth:1,
                            borderRadius:5,
                            paddingLeft:Dimensions.get('window').width*0.025
                        }}>
                            <Input placeholder='Precio'
                                value={this.state.productos[keyP].price}
                                style={{
                                    color:'#656565',
                                    fontSize:Dimensions.get('window').width*0.0325,
                                    height:Dimensions.get('window').width*0.1
                                }}
                                placeholderTextColor="#656565"
                                onChangeText={(price)=>{
                                    var productos = this.state.productos
                                    productos[keyP].price = price
                                    this.setState({productos})
                                }} 
                            />
                        </View>
                    </View>
                    
                    <View style={{
                        width:Dimensions.get('window').width,
                        paddingLeft:Dimensions.get('window').width*0.125,
                        paddingRight:Dimensions.get('window').width*0.035
                    }}>
                        {this.state.productos[keyP].medidas.map((medida,index)=>{
                            if(this.state.productos[keyP].medidas.length == (index+1)){
                                return(<Medida 
                                    marginTop={Dimensions.get('window').height*0.015}
                                    keyP={keyP}
                                    keyM={index}
                                    ultimo={true}
                                />)
                            }
                            return(<Medida 
                                marginTop={Dimensions.get('window').height*0.015}
                                keyP={keyP}
                                keyM={index}
                            />)
                        })}
                    </View>
                    <View style={{
                        width:Dimensions.get('window').width*0.975,
                        height:1,
                        backgroundColor:'#cccccc',
                        marginVertical:Dimensions.get('window').height*0.025
                    }}/>
                </View>
            </View>
        )
    }

    selectPicture = async ()=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if(status != 'granted'){
            console.error("permissions CAMERA_ROLL is denied");
        }
        await this._pickImage()
    }

    _pickImage = async () => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          if (!result.cancelled) {
            this.setState({ image: result.uri });
            var image = this.state.image.split("/")
            var commerce = this.state.commerce
            commerce.urlPhoto = image[image.length-1]
            this.setState({commerce})
          }
        } catch (E) {
          console.error(E);
        }
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
            switch (productos[this.state.keyProduct].imageActive){
                case 0:
                    productos[this.state.keyProduct].imagenUri1 = result.uri
                    productos[this.state.keyProduct].imagen1 = image[image.length-1]
                break;
                case 1:
                    productos[this.state.keyProduct].imagenUri2 = result.uri
                    productos[this.state.keyProduct].imagen2 = image[image.length-1]
                break;
                case 2:
                    productos[this.state.keyProduct].imagenUri3 = result.uri
                    productos[this.state.keyProduct].imagen3 = image[image.length-1]
                break;
                case 3:
                    productos[this.state.keyProduct].imagenUri4 = result.uri
                    productos[this.state.keyProduct].imagen4 = image[image.length-1]
                break;
            }
            this.setState({productos})
          }
        } catch (E) {
          console.error(E);
        }
    }

    selectPictureCamera = async ()=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA)
        if(status != 'granted'){
            console.error("permissions CAMERA is denied");
        }
        await this._pickImageCamera()
    }

    _pickImageCamera = async () => {
        try {
          let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          if (!result.cancelled) {
            this.setState({ image: result.uri });
            var image = this.state.image.split("/")
            var commerce = this.state.commerce
            commerce.urlPhoto = image[image.length-1]
            this.setState({commerce})
          }
        } catch (E) {
          console.error(E);
        }
    }

    checkedSubcategory = (category)=>{
        dataSubCategory.map((subCategory)=>{
            if(subCategory.category == category){
                return true
            }
        })
        return false
    }

    checkedPass1 = ()=>{
        if(
            this.state.commerce.name &&
            this.state.commerce.ruc &&
            this.state.commerce.dir_local &&
            this.state.commerce.code_phone_1 &&
            this.state.commerce.phone_1 &&
            this.state.commerce.email &&
            this.state.commerce.urlPhoto &&
            this.state.image
        ){
            return true
        }else{
            return false
        }
    }
    checkedPass2 = async ()=>{
        var result = true
         await this.state.productos.map((producto)=>{
            if(
                producto.rubro &&
                producto.imagen1 &&
                producto.name &&
                //comprobar colores
                producto.detail
            ){
                if(
                    producto.rubro == 2 ||
                    producto.rubro == 11 ||
                    producto.rubro == 7 ||
                    producto.rubro == 8
                ){
                    //comprobar tallas
                }
                if(this.getCategoriesById(producto.rubro).length > 0){
                    if(!producto.category){
                        result = false
                        Alert.alert("message","category")
                    }
                    if(this.getSubCategoriesById(producto.category).length > 0){
                        if(!producto.subCategory){
                            result = false
                        Alert.alert("message","subCategory")
                    }
                    }
                }
            }else{
                result = false
            }
        })
        return result
    }

    next = () =>{
        if(this.checkedPass1()){
            this.setState({
                pass2:true
            })
        }else{
            this.notifyMessage("Verifique que todos los campos estén completados")
        }
    }

    notifyMessage(msg) {
        if (Platform.OS === 'android') {
          ToastAndroid.show(msg, ToastAndroid.LONG)
        } else {
            AlertIOS.alert(msg);
        }
    }

    cancelled = () =>{
        var commerce = new Commerce()
        commerce.legalEntity = true
        this.setState({
            commerce,
            pass2:false,
            image:null
        })          
    }

    save = async() =>{
        if(this.state.register){
            return false
        }
        if(await this.checkedPass2()){
            this.setState({register:true})
            var exist = await AdminCommerces.checkedEmail(this.state.commerce.email)
            if(exist){
                this.notifyMessage("El correo que ingresó ya ha sido registrado anteriormente")
                this.setState({register:false,pass2:false})
                return false
            }
            try{
                this.uploadImageAsync(this.state.image,this.state.commerce.urlPhoto)
                .then(async ()=>{
                    var result = await AdminCommerces.registerCommerce(this.state.commerce)
                    if(result){
                        this.state.productos.map(async(producto,index)=>{
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
                            producto.idTienda = AdminCommerces.getCurrentCommerceRegister()
                            producto.id = producto.idTienda+"_"+index
                            producto.numP = index
                            await AdminProductos.setProductData(producto)
                        })
                        Alert.alert("message","El registro ha sido exitoso.")
                        this.props.navigation.navigate("loginCo")
                    }
                    this.setState({register:false})
                })
                .catch((e)=>{
                    console.error("error in method registerCommerce "+JSON.stringify(e));
                    this.setState({register:false})
                })
            }catch(err){
                console.error(err);
                this.setState({register:false})
            }
        }else{
            this.notifyMessage("Verifique que todos los campos estén completados")
            this.setState({register:false})
        }
    }

    modal = () =>{
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
                            onPress={
                                !this.state.pass2?()=>{this.setState({modalVisible:false});this.selectPicture()}:
                                ()=>{this.setState({modalVisible:false});this.selectPictureProduct(false)}
                            }
                            style={{
                                backgroundColor:'#5F27A4',
                                marginBottom:Dimensions.get('window').height*0.025
                            }}
                        >
                            <Text style={{color:"white"}}>Seleccionar desde Galería</Text>
                        </Button>
                        <Button block 
                            onPress={
                                this.state.pic==0?()=>{this.setState({modalVisible:false});this.selectPictureCamera()}:
                                this.state.pic==1?()=>{this.setState({modalVisible:false});this.selectPic1Camera()}:
                                this.state.pic==2?()=>{this.setState({modalVisible:false});this.selectPic2Camera()}:
                                this.state.pic==3?()=>{this.setState({modalVisible:false});this.selectPic3Camera()}:
                                ()=>{this.setState({modalVisible:false});this.selectPic4Camera()}
                            }
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

    render(){
        if(this.state.register){
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
        if(this.state.pass2){
            var key = 0
            return(
                <ScrollView style={{backgroundColor:'white'}}>
                {this.modal()}
                    <KeyboardAvoidingView keyboardVerticalOffset={(-1000*this.state.productos.length)-(75*this.contMedidas())} behavior="position" enabled>
                        {
                            this.state.productos.map((producto)=>{
                                return (
                                    <this.producto 
                                        keyP={key++}
                                        producto={producto}
                                        changeValue={(value,keyP)=>{
                                            var productos = this.state.productos
                                            productos[keyP].imageActive = value
                                            this.setState({productos})
                                        }}
                                    />
                                )
                            })
                        }
                        <View style={{
                            width:Dimensions.get('window').width,
                            alignItems:'center',
                            paddingHorizontal:Dimensions.get('window').width*0.025,
                        }}>
                            <Button block 
                                onPress={()=>{
                                    var productos = this.state.productos
                                    productos.push(new Producto())
                                    this.setState({productos})
                                }}
                                style={{
                                width:Dimensions.get('window').width*0.95,
                                alignItems:'center',
                                justifyContent:'center',
                                backgroundColor:'#5f27a4'
                                }}
                            >
                                <Text style={{
                                    color:'white',
                                    alignSelf:'center',
                                    marginRight:5,
                                    fontWeight:'bold',
                                    fontSize:20
                                }}>
                                    + 
                                </Text>
                                <Text style={{
                                    color:'white',
                                    alignSelf:'center'
                                }}>
                                    Agregar Producto
                                </Text>
                            </Button>
                        </View>
                        <View style={{
                            flexDirection:'row',
                            width:Dimensions.get('window').width,
                            alignItems:'center',
                            justifyContent:'center',
                            marginTop:Dimensions.get('window').height*0.02
                        }}>
                            <View style={{
                                width:Dimensions.get('window').width*0.475,
                                paddingRight:Dimensions.get('window').width*0.0125
                            }}>
                                <Button block bordered
                                    onPress={this.cancelled}
                                    style={{
                                        marginBottom:Dimensions.get('window').height*0.025,
                                        borderColor:'gray'
                                }}>
                                    <Text style={{color:"gray"}}>Cancelar</Text>
                                </Button>
                            </View>
                            <View style={{
                                width:Dimensions.get('window').width*0.475,
                                paddingLeft:Dimensions.get('window').width*0.0125
                            }}>
                                <Button block 
                                    onPress={this.save}
                                    style={{
                                        backgroundColor:'#5F27A4',
                                        marginBottom:Dimensions.get('window').height*0.025
                                }}>
                                    <Text style={{color:"white"}}>Guardar</Text>
                                </Button>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            )
        }
        return(
            <ScrollView style={{backgroundColor:'white'}}>
                {this.modal()}
                <KeyboardAvoidingView keyboardVerticalOffset={-500} behavior="position" enabled>
                    <View style={{
                        flex:1,
                    }}>
                        <View style={{
                            flex:1,
                        }}>
                            <View style={{
                                width:Dimensions.get('window').width,
                                height:Dimensions.get('window').height*0.2,
                                backgroundColor:'#e6e6e6',
                                alignItems:'center',
                                justifyContent:'center'
                            }}>
                                {this.state.image?
                                    <Image
                                        source={{uri:this.state.image}}
                                        style={{
                                            width:Dimensions.get('window').width,
                                            height:Dimensions.get('window').height*0.2,
                                        }}
                                    />
                                    :
                                    <GallerySvg
                                        width={Dimensions.get('window').width*0.5}
                                        height={Dimensions.get('window').height*0.2}
                                    />
                                }
                            </View>
                            <Button style={{
                                width:Dimensions.get('window').width,
                                alignItems:'center',
                                justifyContent:'center',
                                backgroundColor:'#5f27a4'
                            }} onPress={()=>{
                                this.setState({
                                    modalVisible:true,
                                    pic:0
                                })
                            }}>
                                <Text style={{alignSelf:'center',color:"white"}}>
                                    Foto de Tienda
                                </Text>
                            </Button>
                        </View>
                        <View style={{
                            alignItems:'center',
                        }}>
                            <View style={{
                                paddingTop:Dimensions.get('window').height*0.025
                            }}>
                                <RadioForm
                                    radio_props={this.radio_props}
                                    initial={0}
                                    formHorizontal={true}
                                    labelHorizontal={true}
                                    buttonColor={'#5F27A4'}
                                    selectedButtonColor={'#5F27A4'}
                                    animation={true}
                                    onPress={(value) => {
                                        var commerce = this.state.commerce
                                        commerce.legalEntity = value>0?false:true
                                        this.setState({commerce})
                                    }}
                                />
                            </View>
                            <View style={{
                                flexDirection:'row',
                                paddingTop:Dimensions.get('window').height*0.025,
                                paddingRight:Dimensions.get('window').width*0.01
                            }}>
                                <BusinessSvg width={Dimensions.get('window').width*0.1} width={Dimensions.get('window').width*0.1} />
                                <View style={{
                                    borderWidth:1,
                                    borderColor:"#cccccc",
                                    width:Dimensions.get('window').width*0.84,
                                    paddingLeft:Dimensions.get('window').width*0.04,
                                    borderRadius:5
                                }}>
                                    <Input placeholder='Nombre de la Tienda'
                                        style={{
                                            color:'#656565'
                                        }}
                                        value={this.state.commerce.name}
                                        placeholderTextColor="#656565"
                                        onChangeText={(name)=>{
                                            var commerce = this.state.commerce
                                            commerce.name = name
                                            this.setState({
                                                commerce
                                            })
                                        }} 
                                    />
                                </View>
                            </View>
                            <View style={{
                                flexDirection:'row',
                                paddingTop:Dimensions.get('window').height*0.025,
                                paddingRight:Dimensions.get('window').width*0.01
                            }}>
                                <IdSvg 
                                    width={Dimensions.get('window').width*0.08} 
                                    width={Dimensions.get('window').width*0.08}
                                    style={{
                                        marginHorizontal:Dimensions.get('window').width*0.01,
                                    }} 
                                />
                                <View style={{
                                    borderWidth:1,
                                    borderColor:"#cccccc",
                                    width:Dimensions.get('window').width*0.84,
                                    paddingLeft:Dimensions.get('window').width*0.04,
                                    borderRadius:5
                                }}>
                                    <Input placeholder='Coloque RUC o DNI'
                                        style={{
                                            color:'#656565'
                                        }}
                                        value={this.state.commerce.ruc}
                                        placeholderTextColor="#656565"
                                        onChangeText={(ruc)=>{
                                            var commerce = this.state.commerce
                                            commerce.ruc = ruc
                                            this.setState({
                                                commerce
                                            })
                                        }} 
                                    />
                                </View>
                            </View>
                            <View style={{
                                flexDirection:'row'
                            }}>
                                <LocationSvg 
                                    width={Dimensions.get('window').width*0.1} 
                                    width={Dimensions.get('window').width*0.1}
                                    style={{
                                        marginHorizontal:Dimensions.get('window').width*0.0,
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
                                            Ubicación de la Tienda
                                        </Text>
                                    </View>
                                    <View style={{
                                        borderWidth:1,
                                        borderColor:"#cccccc",
                                        width:Dimensions.get('window').width*0.84,
                                        paddingLeft:Dimensions.get('window').width*0.04,
                                        marginTop:Dimensions.get('window').height*0.0075,
                                        borderRadius:5
                                    }}>
                                        <Input placeholder='Indicar Ubicación'
                                            value={this.state.commerce.dir_local}
                                            style={{
                                                color:'#656565'
                                            }}
                                            placeholderTextColor="#656565"
                                            onChangeText={(dir_local)=>{
                                                var commerce = this.state.commerce
                                                commerce.dir_local = dir_local
                                                this.setState({
                                                    commerce
                                                })
                                            }} 
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={{
                                flexDirection:'row',
                                marginTop:Dimensions.get('window').height*0.025,
                                paddingRight:Dimensions.get('window').width*0.01
                            }}>
                                <PhoneSvg 
                                    width={Dimensions.get('window').width*0.1} 
                                    width={Dimensions.get('window').width*0.1}
                                    style={{
                                        marginHorizontal:Dimensions.get('window').width*0.0,
                                    }}
                                    marginTop={Dimensions.get('window').height*0.0325} 
                                />
                                <View style={{
                                    flexDirection:'column'
                                }}>
                                    <View>
                                        <Text style={{
                                            fontSize:Dimensions.get('window').width*0.03,
                                            color:'#5F27A4'
                                        }}>
                                            Número Telefónico
                                        </Text>
                                    </View>
                                    <View style={{
                                        borderWidth:1,
                                        borderColor:"#cccccc",
                                        width:Dimensions.get('window').width*0.84,
                                        paddingLeft:Dimensions.get('window').width*0.04,
                                        marginTop:Dimensions.get('window').height*0.0075,
                                        flexDirection:'row',
                                        borderRadius:5
                                    }}>
                                        <View style={{
                                            width:Dimensions.get('window').width*0.1
                                        }}>
                                            <Input 
                                                value={this.state.commerce.code_phone_1}
                                                style={{
                                                    color:'#656565'
                                                }}
                                                placeholderTextColor="#656565"
                                                maxLength={3}
                                                onChangeText={()=>{
                                                    /*
                                                        var commerce = this.state.commerce
                                                        commerce.code_phone_1 = code_phone_1
                                                        this.setState({
                                                            commerce
                                                        })
                                                    */
                                                }} 
                                            />
                                        </View>
                                        <View style={{
                                            width:Dimensions.get('window').width*0.75
                                        }}>
                                            <Input 
                                                placeholder='000 000 000'
                                                value={this.state.commerce.phone_1}
                                                style={{
                                                    color:'#656565'
                                                }}
                                                placeholderTextColor="#656565"
                                                onChangeText={(phone_1)=>{
                                                    var commerce = this.state.commerce
                                                    commerce.phone_1 = phone_1
                                                    this.setState({
                                                        commerce
                                                    })
                                                }} 
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{
                                flexDirection:'row',
                                marginVertical:Dimensions.get('window').height*0.025,
                                paddingRight:Dimensions.get('window').width*0.01
                            }}>
                                <EmailSvg 
                                    width={Dimensions.get('window').width*0.1} 
                                    width={Dimensions.get('window').width*0.1}
                                    style={{
                                        marginHorizontal:Dimensions.get('window').width*0.0,
                                    }}
                                    marginTop={Dimensions.get('window').height*0.0325} 
                                />
                                <View style={{
                                    flexDirection:'column'
                                }}>
                                    <View>
                                        <Text style={{
                                            fontSize:Dimensions.get('window').width*0.03,
                                            color:'#5F27A4'
                                        }}>
                                            Correo Eletrónico
                                        </Text>
                                    </View>
                                    <View style={{
                                        borderWidth:1,
                                        borderColor:"#cccccc",
                                        width:Dimensions.get('window').width*0.84,
                                        paddingLeft:Dimensions.get('window').width*0.04,
                                        marginTop:Dimensions.get('window').height*0.0075,
                                        borderRadius:5
                                    }}>
                                        <Input placeholder='Ingrese correo electrónico'
                                            value={this.state.commerce.email}
                                            style={{
                                                color:'#656565'
                                            }}
                                            placeholderTextColor="#656565"
                                            onChangeText={(email)=>{
                                                var commerce = this.state.commerce
                                                commerce.email = email
                                                this.setState({
                                                    commerce
                                                })
                                            }} 
                                        />
                                    </View>
                                </View>
                            </View>
                            <View>
                                <Button block 
                                    onPress={this.next}
                                    style={{
                                        backgroundColor:'#5F27A4',
                                        width:Dimensions.get('window').width*0.94,
                                        marginBottom:Dimensions.get('window').height*0.025
                                }}>
                                    <Text style={{color:"white"}}>Siguiente</Text>
                                </Button>
                            </View>


                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    text:{
        fontWeight:'bold'
    }
})