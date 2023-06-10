import { View, TextInput, Button, Alert, Text } from 'react-native';
import Styles from "./styles.scss";
import { useState } from "react";
import { api } from '../../services/api';


export default function Register({ navigation }) {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    function handleLogin () {

      if(!nome || !email || !password) {
        return alert("Preencha todos os campos!");
      }

      api.post("/users", { name: nome, email, password })
      .then(() => {
        Alert.alert("Usuário Cadastrado com sucesso!");
        navigation.navigate('Login');
      })
      .catch(error => {
        if(error.response){
          alert(error.response.data.message);
        }else {
          alert("Não foi possível cadastrar");
        }
      });
    };

    const handleNome = (text) => {
      setNome(text);
      console.log(nome);
    };

    const handleEmail = (text) => {
      setEmail(text);
      console.log(email);
    };

    const handlePassword = (text) => {
      setPassword(text);
      console.log(password);
    };

    return (
        <View style={Styles.container}>
          <Text>Register</Text>
            <View style={Styles.containerInput}>
                <TextInput
                  placeholder="Digite seu nome"
                  style={Styles.input}
                  onChangeText={handleNome}
                  value={nome}
                />
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
                  style={Styles.button}
                  title="Enviar"
                  onPress={handleLogin}
                />
            </View>
        </View>
    );
}