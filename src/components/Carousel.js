import React, { useState } from "react";
import { Image } from "react-native-elements";
import Carousel from "react-native-snap-carousel";
import { Alert, Dimensions } from "react-native";
import { Spinner, View } from "native-base";

export default function CarouselCommerce(props) {
  const { arrayImages, height, width, type } = props;
  var array = arrayImages;

  if(type == "prueba"){
    array = [
      {
        title:"Item 1",
        text: "Text 1",
      },
      {
        title:"Item 2",
        text: "Text 2",
      },
      {
        title:"Item 3",
        text: "Text 3",
      }
    ];
  }else{
    array = arrayImages
  }

  const renderItem = ({ item }) => {
    if(type == "prueba"){
      return <Image style={{ width, height}} source={ require("../../assets/img/commerce/comercio1.jpg") } />;
    } else {
      if(item.uri){
        return <Image style={{ width, height }} source={{ uri: item.uri }} />
      }else{
        return (
          <View style={{ width, height,justifyContent:'center'}}>
            <Spinner 
              size={Dimensions.get('window').height*0.10}
              style={{
                  flex: 1,
                  alignSelf:'center'
              }}
              color='#FDD501'
            />
          </View>
        )
      }
    }
  };

  return (
    <Carousel
      layout={"default"}
      data={array}
      sliderWidth={width}
      itemWidth={width}
      renderItem={renderItem}
    />
  );
}