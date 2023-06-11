import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{
            headerStyle: {
              backgroundColor: '#232129', // Define a cor de fundo do cabeçalho
            },
            headerTintColor: '#FFFFFF', // Define a cor do texto e ícones do cabeçalho
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />

        <Stack.Screen 
          name="Register" 
          component={Register} 
          options={{
            headerStyle: {
              backgroundColor: '#232129', // Define a cor de fundo do cabeçalho
            },
            headerTintColor: '#FFFFFF', // Define a cor do texto e ícones do cabeçalho
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{
            headerStyle: {
              backgroundColor: '#232129', // Define a cor de fundo do cabeçalho
            },
            headerTintColor: '#FFFFFF', // Define a cor do texto e ícones do cabeçalho
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerLeft: null, // Remove o botão de voltar
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;