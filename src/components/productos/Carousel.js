import React, { useState } from "react";
import { Image } from "react-native-elements";
import Carousel from "react-native-snap-carousel";
import '../../../'
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
  }

  const renderItem = ({ item }) => {
    if(type == "prueba"){
      return <Image style={{ width, height}} source={ require("../../../assets/img/commerce/comercio1.jpg") } />;
    } else {
      return <Image style={{ width, height }} source={{ uri: item }} />;
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
