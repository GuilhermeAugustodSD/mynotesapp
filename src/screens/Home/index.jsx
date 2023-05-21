import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, ScrollView, Alert } from 'react-native';
import Notes from '../../Components/Notes';
import { api } from '../../services/api';
import { useState, useEffect } from 'react';
import Styles from "./styles.scss";
import Header from '../../Components/Header';


export default function Home() {
  
  const [notes, setNotes] = useState();
  const [user, setUser] = useState();


  useEffect(() => {
    async function fetchUser(){
      const response = await api.get("/users");
      setUser(response.data)
    }
  
    fetchUser();
  }, [])

  console.log(user);

  useEffect(() => {
    async function fetchNotes(){
      const response = await api.get("/notes/allNotes");
      setNotes(response.data);
    }
  
    fetchNotes();
  }, [])



  return (
    <View style={Styles.container}>
      <Header />
      <ScrollView>
        <View style={Styles.buttons}>
          <Text style={Styles.button}>Links populares</Text>
          <Text 
            style={Styles.button}
          >
            Links Favoritos
          </Text>

          {/* <Button
            style={Styles.button}
            title="Links Favoritos"
          />  jeito certo, dps de criar a rota de favoritos*/}
        </View>
        <View title="Minhas Notas" style={Styles.notes}>
          { 
            notes?.map(note => (
              <Notes 
                key={String(note.id)}
                data={note}
              />
              )
            )
          }
        </View>
      </ScrollView>
      
    </View>
  );
}

