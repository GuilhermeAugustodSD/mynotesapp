import { Text, View, Button, ScrollView, Alert } from 'react-native';
import Notes from '../../Components/Notes';
import { api } from '../../services/api.js';
import { useState, useEffect } from 'react';
import Styles from "./styles.scss";
import Header from '../../Components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from "../../hook/auth.js";
import Icon from 'react-native-vector-icons/MaterialIcons';



export default function Home({navigation}) {
  
  const [notes, setNotes] = useState();
  const [data, setData] = useState({});
  const [tipoData, setTipoData] = useState("publicas");


  
  function handleSignOut(){
    AsyncStorage.removeItem("@rocketnotes:user");
    AsyncStorage.removeItem("@rocketnotes:token");
    navigation.navigate('Login');
  }


  useEffect(() => {
    async function fetchNotes(){
      if (tipoData == "publicas") {
        const response = await api.get("/notes/allNotes");
        setNotes(response.data);
      }else {
        const response = await api.get("/notes/allNotesFav");
        setNotes(response.data);
        
      }
    }
  
    fetchNotes();
  }, [tipoData])

  useEffect(() => {
    
    const getUserData = async () => {
      try {
        const user = await AsyncStorage.getItem("@rocketnotes:user");
        const token = await AsyncStorage.getItem("@rocketnotes:token");
        if (token && user) {
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          setData({
            token,
            user: JSON.parse(user),
          });

        }
      } catch (error) {
        console.error("Erro ao obter os dados do usuário:", error);
      }
    };

    getUserData();
  }, []);

  const handleTipoDataPublicas = () => {
      setTipoData("publicas")
  };

  const handleTipoDataFavoritas = () => {
    setTipoData("favorita");
};

 


  return (
    <View style={Styles.container}>
      <Icon 
        name="exit-to-app" 
        size={24} 
        color="#FF9000" 
        onPress={handleSignOut}
        style={Styles.exitIcon}
      />
      <Header 
        name={ data &&
          data.user?.name}
        avatar={data.user?.avatar}
      />
      <ScrollView>
        <View style={Styles.buttons}>
          <Button 
            title="Links populares"
            style={Styles.button}
            onPress={handleTipoDataPublicas}
          />
          <Button 
            title="Links Favoritos"
            style={Styles.button}
            onPress={handleTipoDataFavoritas}
          />
          
         
        </View>
        <View title="Minhas Notas" style={Styles.notes}>
          { 
            notes?.map(note => (
              <Notes 
                key={String(note.id)}
                idNotes={note.id}
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

