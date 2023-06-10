import { Text, View, Button, ScrollView, Alert } from 'react-native';
import Notes from '../../Components/Notes';
import { api } from '../../services/api.js';
import { useState, useEffect } from 'react';
import Styles from "./styles.scss";
import Header from '../../Components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from "../../hook/auth.js";

export default function Teste() {
    const [notes, setNotes] = useState();
    const [data, setData] = useState({});
    
    
    function handleSignOut(){
        AsyncStorage.removeItem("@rocketnotes:user");
        AsyncStorage.removeItem("@rocketnotes:token");
        navigation.navigate('Login');
      }
    
    
      useEffect(() => {
        async function fetchNotes(){
          const response = await api.get("/notes/allNotes");
          setNotes(response.data);
        }
      
        fetchNotes();
      }, [])
    
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
    
    return (
        <View style={Styles.container}>
            <Header
                name={data &&
                    data.user?.name}
                avatar={data.user?.avatar}
            />
            <Button
                title="Sair"
                onPress={handleSignOut}
            />
            <ScrollView>
                <View style={Styles.buttons}>
                    <Text style={Styles.button}>Links populares</Text>
                    <Text
                        style={Styles.button}
                    >
                        Links Favoritos
                    </Text>

                    
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