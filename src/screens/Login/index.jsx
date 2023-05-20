import { View, TextInput, Button, Alert } from 'react-native';
import Styles from "./styles.scss";
import { useState } from "react";

export default function Login() {

    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');

    const handleLogin = async () => {
        try {
          const response = await fetch('https://gdantasit-rocketnotes.onrender.com/sessions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, password: password }),
          });
    
          if (response.ok) {
            const data = await response.json();
            // Autenticação bem-sucedida, faça algo com os dados recebidos, como armazená-los no estado global ou em um token de autenticação.
            console.log('Dados de autenticação:', data);
          } else {
            throw new Error('Erro na auteintcação');
          }
        } catch (error) {
          Alert.alert('Erro', error.message);
        }
      };

    return (
        <View style={Styles.container}>
            <View style={Styles.containerInput}>
                <TextInput
                    placeholder="Digite seu e-mail"
                    style={Styles.input}
                    onChange={onChangeEmail}
                    value={email}
                />

                <TextInput
                    placeholder="Digite sua senha"
                    style={Styles.input}
                    onChange={onChangePassword}
                    value={password}
                />

                <Button
                    title="Enviar"
                    onPress={handleLogin}
                />
            </View>
        </View>
    );
}