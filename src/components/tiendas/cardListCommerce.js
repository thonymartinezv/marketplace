import React,{Component} from "react"
import {StyleSheet,View, ImageBackground,Dimensions} from 'react-native'
import {Text, CardItem,Body,Card} from 'native-base'
//import firebase from '../Firebase'

class CardListCommerce extends Component{
    constructor(props){
        super(props)
        this.state = {
            picture:"",
            category:""
        }
        /*
            this.getCategory(props.commerce.type)
            this.getUrl(props.commerce.image)
        */
    }

    async getUrl(image){
        try{
            var storage = firebase.storage()
            var pathReference = storage.ref("commerce_profile/"+image)
            var picture = await pathReference.getDownloadURL()
            this.setState({
                picture
            })
        }catch(err){
            console.log("error en: ",err);
        }
    }

    async getCategory(id){
        var category= null
        console.log(id);   
        try{
            var doc = await firebase.firestore().collection("categories").doc(id).get()
            if (doc.exists) {
                category = doc.data().name
                this.setState({
                    category
                })
            } else {
                console.log("No such document!")
            }
        }catch(err){
            console.error("error in method getCategory from CardListCommerce: ",err);   
        }
    }
    
    render(){
        return(
            <Card>
                <CardItem button 
                    onPress={
                        ()=>{ 
                            this.props.onClick(this.props.commerce)
                        }
                    }
                >
                <Body style={styles.content}>
                    <ImageBackground style={styles.imageCard} source={this.props.commerce.picture}>
                        <View style={{backgroundColor:"rgba(0, 0, 0, 0.5)",height:"100%"}}>
                            <Text style={styles.text_name_commerce}>
                                {this.props.commerce.name}
                            </Text>
                            <Text style={styles.text_type_commerce}>
                                {this.props.commerce.category}
                            </Text>
                        </View>
                    </ImageBackground>
                </Body>
                </CardItem>
            </Card>
        )
    }
}

export default CardListCommerce


const styles = StyleSheet.create({
    text_name_commerce:{
        paddingHorizontal:Dimensions.get('window').width*0.05,
        paddingTop:Dimensions.get('window').height*0.025,
        fontSize:Dimensions.get('window').width*0.06,
        color:"#FFFFFF"
    },
    text_type_commerce:{
        paddingHorizontal:Dimensions.get('window').width*0.05,
        color:"#FFFFFF"
    },
    imageCard:{
        width:Dimensions.get('window').width*0.9,
        height:Dimensions.get('window').height*0.15,
        backgroundColor: '#FFFFFF90'
    },
    content:{
        alignItems: 'center',
    },
})