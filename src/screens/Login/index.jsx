import { View, TextInput, Button, Alert } from 'react-native';
import Styles from "./styles.scss";
import { useState, useEffect } from "react";
import { api } from '../../services/api';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({navigation}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState({});
    

    const handleEmail = (text) => {
      setEmail(text);
      console.log(email);
    };

    const handlePassword = (text) => {
      setPassword(text);
      console.log(password);
    };

    const handlePress = () => {
      navigation.navigate('Register');
    };

   

    const handleLogin = async () => {
      try {
        const response = await api.post("/sessions", {email, password});
        console.log(response.data);
        const { user, token } = response.data /* está certo até aqui,  */

        await AsyncStorage.setItem("@rocketnotes:user", JSON.stringify(user));
        await AsyncStorage.setItem("@rocketnotes:token", token);

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        setData({ user, token });

        
        navigation.navigate('Home');

      } catch (error) {
        if (error.response) {
          Alert.alert(error.response.data.message);
        } else {
          Alert.alert("Não foi possível entrar!");
        }
      }
    };

    useEffect(() => {
      const getUserData = async () => {
        try {
          const user = await AsyncStorage.getItem("@rocketnotes:user");
          const token = await AsyncStorage.getItem("@rocketnotes:token");
          console.log(user);
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
      <>

        <View style={Styles.container}>
            <View style={Styles.containerInput}>
                <TextInput
                  placeholder="Digite seu e-mail"
                  style={Styles.input}
                  onChangeText={handleEmail}
                  value={email}
                />

                <TextInput
                  placeholder="Digite sua senha"
                  style={Styles.input}
                  onChangeText={handlePassword}
                  value={password}
                />

                <Button
                  title="Enviar"
                  onPress={handleLogin}
                />
            </View>

            <Button title="Cadastro" onPress={handlePress} />
        </View>
      </>
    );
}