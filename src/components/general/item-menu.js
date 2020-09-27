import * as React from 'react'
import { StyleSheet,View,Dimensions,TouchableOpacity} from 'react-native';
import {Left,ListItem,Body,Button,Text} from 'native-base'
import Campana from '../../../assets/icon/general/campana.svg'
import Tienda from '../../../assets/icon/general/tienda.svg'
import Etiqueta from '../../../assets/icon/general/etiqueta.svg'
import Estrella from '../../../assets/icon/general/estrella.svg'
import Historial from '../../../assets/icon/general/historial.svg'
import Ajustes from '../../../assets/icon/general/ajustes.svg'
import Salir from '../../../assets/icon/general/salir.svg'
import Mas from '../../../assets/icon/general/mas.svg'
import Editar from '../../../assets/icon/general/editar.svg'
import CarSvg from '../../../assets/icon/general/carroMenu.svg'
import DinnerSvg from '../../../assets/icon/general/dinero.svg'
import UserSvg from '../../../assets/icon/general/usuario.svg'

export default class ItemMenu extends React.Component {
    constructor(props){
        super(props)
    }

    icon(icon){
        switch (icon) {
            case 'campana':
                return <Campana style={styles.items_icon} />
            case 'tienda':
                return <Tienda style={styles.items_icon} />
            case 'etiqueta':
                return <Etiqueta style={styles.items_icon} />
            case 'estrella':
                return <Estrella style={styles.items_icon} />
            case 'historial':
                return <Historial style={styles.items_icon} />
            case 'ajustes':
                return <Ajustes style={styles.items_icon} />
            case 'salir':
                return <Salir style={styles.items_icon} />
            case 'mas':
                return <Mas style={styles.items_icon} />
            case 'editar':
                return <Editar style={styles.items_icon} />
            case 'car':
                return <CarSvg style={styles.items_icon} />
            case 'dinero':
                return <DinnerSvg style={styles.items_icon} />
            case 'usuario':
                return <UserSvg style={styles.items_icon} />
            default:
                return <Campana style={styles.items_icon}/>
        }
    }

    render(){
        return(
        <ListItem icon>
            <Left>
              <TouchableOpacity onPress={()=>this.props.onClick()}>
                <Button transparent>
                  {this.icon(this.props.icon)}
                </Button>
              </TouchableOpacity>
            </Left>
            <Body>
              <TouchableOpacity onPress={()=>this.props.onClick()}>
                <Text style={{fontSize:Dimensions.get('window').width*0.04}} >{this.props.text}</Text>
              </TouchableOpacity>
            </Body>
        </ListItem>
        )
    }
}

const styles = StyleSheet.create({
    items_icon:{
      width: Dimensions.get('window').width*0.045,
      height: Dimensions.get('window').width*0.045
    }
});