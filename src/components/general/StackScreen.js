import React from 'react';
import {View,StyleSheet,Text,TouchableHighlight, Dimensions} from 'react-native';
import MenuSvg from '../../../assets/icon/header/menu.svg'
import AtrasSvg from '../../../assets/icon/header/atras.svg'

export default function stackScreen(props){
    return(
      <props.Stack.Screen
      name={props.name}
      component={props.component}
      options={{ 
        title: props.title,
        headerTintColor: "#22324E",
        headerStyle: {
          backgroundColor: "#ffffff",
          borderBottomColor: "#ff0000",
        },
        cardStyle: {
          backgroundColor: "#ffffff",
        },
        headerTitleStyle: {
          fontFamily: "WorkSans-Bold",
        },
        headerTitle: () => (
          <View style={styles.container}>
            <View>
        <Text style={[
          props.beforeScreen && props.menu?
            styles.headerTitle:
            !props.beforeScreen && props.menu?
            styles.marginTitleHeader:
            props.beforeScreen && !props.menu?
            {
              marginLeft:-55,
              fontSize: 18,
              color: "#5F27A4",
              fontFamily: "WorkSans-Bold",
              fontWeight:'bold'
            }:{
              fontSize: 18,
              color: "#5F27A4",
              fontFamily: "WorkSans-Bold",
              fontWeight:'bold'
            }
          ]}>{props.title}</Text>
            </View>
          </View>
        ),
        headerRight: props.menu?() => (
          <TouchableHighlight onPress={() => props.navigation.toggleDrawer()}>
            <MenuSvg 
              width={40}
              height={40}
              style={styles.icon}
            />
          </TouchableHighlight>
        ):null,
        headerLeft:props.beforeScreen?() => (
            <TouchableHighlight style={{marginHorizontal: 0}} onPress={() => props.navigation.navigate(props.beforeScreen)} >
              <AtrasSvg 
                width={38}
                height={38}
                style={styles.iconBack}
              />
            </TouchableHighlight>
          ):null,
      }}
    />
    )
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    headerTitle: {
      fontSize: 18,
      color: "#5F27A4",
      fontFamily: "WorkSans-Bold",
      fontWeight:'bold'
    },
    marginTitleHeader:{
        fontSize: 18,
        color: "#5F27A4",
        fontFamily: "WorkSans-Bold",
        marginLeft:Dimensions.get('window').width*0.1155,
        fontWeight:'bold'
    },
    icon: {
      marginRight: 10
    },
    iconBack: {
      marginRight: 0,
      paddingHorizontal:10
    },
  });