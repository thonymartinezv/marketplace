import React from 'react'
import { StyleSheet,View,Dimensions,ScrollView, Modal, Alert,TouchableOpacity} from 'react-native';
import {Button,Text,Item,Input} from 'native-base'
import {Divider} from 'react-native-elements'
import FindSvg from '../../../../assets/icon/general/lupa.svg'
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

export default class Productos extends React.Component{
  constructor(props){
      super(props)
      this.state = {
        modalActive:false,
        dataSubCategoryList:new Array(),
        rubro:null
      }
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

  render(){
    var ModalSub = this.modalSub
    return (
      <ScrollView
      >
        <ModalSub/>
        <Divider/>
          <Item style={{borderColor:'#c9c9c9',marginTop:Dimensions.get('window').height*0.025}} rounded>
            <FindSvg style={{
                    width:Dimensions.get('window').height*0.04,
                    height:Dimensions.get('window').height*0.04,
                    marginLeft:Dimensions.get('window').height*0.015
                }} 
                active name="find"
            />
            <Input placeholder='Buscar...' />
          </Item>
            {
              dataRubro.map( (item) => {
                  return this.rubro(item)
              })
            }
      </ScrollView>
    )
  }

  rubro = (rubro)=>{
    return(
      <View style={{padding:Dimensions.get('window').width*0.03}}>
        <TouchableOpacity onPress={()=>{
          this.props.navigation.navigate('productosList',{
            filter: 0,
            id: rubro.id,
            idFilter:rubro.id
          })
        }}>
        <View style={{flexDirection:'row'}}>
          <View style={styles.ContentTextCategory}>
            {this.getIcon(rubro.id)}
            <Text style={styles.textCategory}>{rubro.name}</Text>
          </View>
        </View>
        </TouchableOpacity>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} pagingEnabled={true}>
          {              
            dataCategory.map((item) => {
                if(item.rubro == rubro.id){
                  return this.category(item)
                }
            })
          }
        </ScrollView>
        <Divider/>
      </View>
    )
  }
  close = ({onPress})=>{
    return(<TouchableOpacity 
      style={{
        width:'100%',
        alignItems:'flex-end'
      }}
      onPress={()=>{
        onPress()
      }}
    >
      <View style={{
        paddingBottom:Dimensions.get('window').height*0.005
      }}>
        <Text style={{
          fontSize:Dimensions.get('window').height*0.03,
          fontWeight:'bold',
          color:'#B3B3B3'
        }}>
          x
        </Text>
      </View>
    </TouchableOpacity>)
  }
  category = (category)=>{
    return(
      <View style={{flexDirection:'row'}}>
        <View style={{paddingVertical:Dimensions.get('window').width*0.025,paddingLeft:Dimensions.get('window').width*0.015}}>
          <Button onPress={()=>{
              var dataSubCategoryList = this.getSubCategoriesById(category.id)
              if(dataSubCategoryList.length > 0){
                this.setState({modalActive:true,dataSubCategoryList,rubro:category.rubro})
              }else{
                this.props.navigation.navigate('productosList',{
                  filter: 1,
                  id: category.rubro,
                  idFilter: category.id,
                })
              }
            }} 
            style={{backgroundColor:'#5F27A4'}}  small>
            <Text style={{
              color:'white'
            }}>
              {category.name}
            </Text>
          </Button>
        </View>
      </View>
    )
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
  modalSub = () =>{
    var Close = this.close
    return(
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.modalActive}
        onRequestClose={() => {

        }}
      >
        <View style={{
          width:"100%",
          height:"100%",
          backgroundColor:"rgba(0, 0, 0, 0.4)"
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
            paddingHorizontal:Dimensions.get('window').width*0.025,
          }}>
            <Close 
              onPress={()=>{
                this.setState({modalActive:false})
              }}
            />
            {
              this.state.dataSubCategoryList.map((subCategory)=>{
                return(<Button block 
                  onPress={()=>{
                    this.setState({modalActive:false})
                    this.props.navigation.navigate('productosList',{
                      filter: 2,
                      id: this.state.rubro,
                      idFilter: subCategory.id
                    })
                  }}
                  style={{
                    backgroundColor:'#5F27A4',
                    marginBottom:Dimensions.get('window').height*0.025
                  }}
                >
                  <Text style={{color:"white"}}>{subCategory.name}</Text>
                </Button>)
              })
            }
          </View>
        </View>
      </Modal>
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
  }
});