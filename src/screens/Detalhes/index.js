import { Text, View, Button, ScrollView, Alert } from 'react-native';
import { api } from '../../services/api.js';
import { useState, useEffect } from 'react';
import Styles from "./styles.scss";
import { useRoute } from '@react-navigation/native';
// import Header from '../../Components/Header';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useAuth } from "../../hook/auth.js";

export default function Detalhes({navigation}) {
  const [notes, setNotes] = useState();
  const route = useRoute();

  const { id } = route.params;

  const handleHome = () => {
    navigation.navigate(`Home`);
  };

  useEffect(() => {
    async function notes(){
      const response = await api.get(`/notes/allNotes/${id}`);
      setNotes(response.data);
    }
    notes();
  
  }, [])

  


  return (
    <View style={Styles.container}>
      <ScrollView>
        <Button
        title='Voltar'
        onPress={handleHome}
        />

        <Text style={Styles.h1}>
          {
            notes && 
            notes.map(note => (
              note.title
            ))
          }
        </Text>
      <Text style={Styles.description}>
        {
          notes && 
          notes.map(note => (
            note.description
          ))
        }
      </Text>

      <Text style={Styles.tags}>
        {
          notes && 
          notes.map(note => (
            note.tags.map(tag => (
              tag.name
            ))
          ))
        }
      </Text>

      <Text style={Styles.link}>
        {
          notes && 
          notes.map(note => (
            note.link.map(link => (
              link.url
            ))
          ))
        }
      </Text>

      <Text style={Styles.checklist}>
        {
          notes && 
          notes.map(note => (
            note.checklist.map(link => (
              link.title
            ))
          ))
        }
      </Text>
      </ScrollView>

    </View>
  );
}