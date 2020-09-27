import React from 'react'
import { StyleSheet,View,Picker,Dimensions,Text,FlatList,ScrollView} from 'react-native';
import {Button, Input,Item} from 'native-base'
import CardListCommerce from '../../../components/tiendas/cardListCommerce'
import FindSvg from '../../../../assets/icon/general/lupa.svg'

export default class Tienda extends React.Component{
  constructor(props){
      super(props)
      this.state = {
        category:"0",
        _commerces:[
          {key:'1',picture:require('../../../../assets/img/commerce/comercio1.jpg'),name:'Tienda 1',category:'Categoría 1'},
          {key:'2',picture:require('../../../../assets/img/commerce/comercio2.jpg'),name:'Tienda 2',category:'Categoría 2'},
          {key:'3',picture:require('../../../../assets/img/commerce/comercio3.jpg'),name:'Tienda 3',category:'Categoría 3'}
        ],
        _categories:[
          {id:"1",name:"Categoría 1"},
          {id:"2",name:"Categoría 2"},
          {id:"3",name:"Categoría 3"}
        ],
      }
  }

  render(){
      return (
        <ScrollView>
          <Button style={{backgroundColor:'#5F27A4',paddingLeft:Dimensions.get('window').width*0.02}}>
            <Text style={{color:'white'}} >Buscar Tiendas</Text>
          </Button>
          <View style={{paddingHorizontal:Dimensions.get('window').width*0.02}}>
            <View
              style={{
                  width: "100%",
                  borderColor: '#cccccc',
                  borderBottomWidth:1,
                  borderTopWidth:1,
                  borderLeftWidth:1,
                  borderRightWidth:1,
                  borderRadius: 10,
                  alignSelf: 'center',
                  marginVertical:Dimensions.get('window').height*0.02
              }}
              >
                <Picker  
                  selectedValue={this.state.category}
                  mode="dropdown"
                  onValueChange={(cat) =>{
                      this.setState({category: cat})
                      //this.getCommerces(cat)
                  }}
                >
                  <Picker.Item value="0" label="Seleccionar..."/>
                  {
                      this.state._categories.map( (item) => {
                          return <Picker.Item value={item.id} label={item.name} />
                      })
                  }
              </Picker>
            </View>
            <Item style={{borderColor:'#c9c9c9'}} rounded>
                <FindSvg style={{
                        width:Dimensions.get('window').height*0.04,
                        height:Dimensions.get('window').height*0.04,
                        marginLeft:Dimensions.get('window').height*0.015
                    }} 
                    active name="find"
                />
                <Input placeholder='Nombre de la tienda...' />
            </Item>
            <FlatList style={{marginTop:Dimensions.get('window').height*0.01}}
                data={this.state._commerces}
                renderItem={
                    ({item})=>(<CardListCommerce
                      onClick={(commerce)=>{
                        this.props.navigation.navigate('tienda')
                      }} 
                      commerce={item}
                    />)
                }
            />
            <View height={50} ></View>
         </View>
        </ScrollView>
      )
  }
}