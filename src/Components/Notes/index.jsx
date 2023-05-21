import {  Text, View } from 'react-native';
import  AppStyles from "./styles.scss";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';

export default function Notes(note) {
  const [heart, setHeart] = useState("heart-o");

  function changeHeartIcon() {
    if (heart == "heart-o"){
      setHeart("heart")
    }else {
      setHeart("heart-o")
    }
  }

  
  return (
    <View style={AppStyles.container} >
      <View className="title" style={AppStyles.header}>
        <Text style={AppStyles.h1}>{note.data.title}</Text>
        <Icon 
          name={heart} 
          size={24} 
          color="#FF9000" 
          onPress={changeHeartIcon}
        /> 
      </View>
      <View className="tags" style={AppStyles.tags}>
        {
          note.data.tags &&
            note.data.tags.map(tag => (
              <Text key={tag.id} style={AppStyles.tag}>{tag.name}</Text>
            )
          )
        }
      </View>

      <Text style={AppStyles.p}>{note.data.description}</Text>

    
    </View>

  );
}