import {  Text, View } from 'react-native';
import  AppStyles from "./styles.scss";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState, useEffect } from 'react';
import { api } from '../../services/api.js';
import Navigation from '../../Navigation/Navigation';
import { useRoute } from '@react-navigation/native';


export default function Notes(note) {
  const [heart, setHeart] = useState("heart-o");

  const [favoritas, setFavoritas] = useState();


  const handleDetails = () => {
    if (note.tipo == "publicas") {
      note.navigation.navigate("Detalhes", { 
        id: note.data.id, 
      });
    }else {
      note.data.noteFilter &&
      note.data.noteFilter.map(n => {
        note.navigation.navigate("Detalhes", { 
          id: n.id, 
        })
      })
    }
  };

  
  useEffect(() => {
    async function favoritos(){
      const response = await api.get("/notes/allNotesFav");
      setFavoritas(response.data);
    }
    favoritos();
  
  }, [])


  useEffect(() => {
    if (favoritas) {
      favoritas.map(favorita => {
        favorita.noteFilter.map((n, idx) => {
          if (note.data.id === n.id){
            setHeart("heart")
          }else {
            setHeart("heart-o")
          }
        })
      })
    }
      // setHeart("heart-o")
    if (note.tipo == "favorita"){
      setHeart("heart")
    }

  }, [favoritas]);


  async function changeHeartIcon() {

    if (note.data.id) {
      await api.post(`/notes/favorites?note_id=${note.data.id}`);
      if (heart == "heart-o"){
        setHeart("heart");
      }else {
        setHeart("heart-o")
      }
    }else {
      note.data.noteFilter &&
      note.data.noteFilter.map((n, idx) => {
        api.post(`/notes/favorites?note_id=${n.id}`);
        if (heart == "heart-o"){
          setHeart("heart")
        }else {
          setHeart("heart-o")
        }       
      })
    }
  }

  return (
    <View style={AppStyles.container} >
      <View className="title" style={AppStyles.header}>
        {
          note.tipo == "publicas" ?
          <Text  style={AppStyles.h1}>{note.data.title}</Text> :
          note.data.noteFilter &&
          note.data.noteFilter.map((n, idx) => (
            <Text style={AppStyles.h1}>{n.title}</Text>
          ))
        }
        <View style={AppStyles.icons}>
          <Icon 
            // key={note.tipo == "publicas" ? note.data.id : note.data.noteFilter && note.data.noteFilter.map(n => (n.id))}
            name="eye"
            size={24} 
            color="#FF9000" 
            onPress={handleDetails}
            style={AppStyles.eyes}
          /> 

          <Icon 
            // key={note.tipo == "publicas" ? note.data.id : note.data.noteFilter && note.data.noteFilter.map(n => (n.id))}
            name={heart} 
            size={24} 
            color="#FF9000" 
            onPress={changeHeartIcon}
          /> 
        </View>
      </View>
      <View className="tags" style={AppStyles.tags}>
        {
          note.data.tags &&
            note.data.tags.map(tag => (
              <Text style={AppStyles.tag}>{tag.name}</Text>
            )
          )
        }
      </View>

      {
        note.tipo == "publicas" ?
        <Text style={AppStyles.p}>{note.data.description}</Text> :
        note.data.noteFilter &&
        note.data.noteFilter.map((n, idx) => (
          <Text style={AppStyles.p}>{n.description}</Text>
        ))
      }

    </View>

  );
}