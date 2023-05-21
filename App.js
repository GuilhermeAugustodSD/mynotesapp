import { StatusBar } from 'expo-status-bar';
import { useFonts, Roboto_400Regular, Roboto_700Bold, RobotoSlab_400Regular, RobotoSlab_700Bold } from '@expo-google-fonts/roboto';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Register from './src/screens/Register';


export default function App() {

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    RobotoSlab_400Regular,
    RobotoSlab_700Bold,
  });

 
  return (
    <>
      <StatusBar translucent={true} barStyle="light-content"/>
      <Login />
    </>
  );
}

