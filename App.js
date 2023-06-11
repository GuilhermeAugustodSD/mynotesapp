import { StatusBar, Platform } from 'react-native';
import Navigation from './src/Navigation/Navigation';

// import Home from './src/screens/Home';
// import Login from './src/screens/Login';
// import Teste from './src/screens/Teste';

export default function App() {

  // const [fontsLoaded] = useFonts({
  //   Roboto_400Regular,
  //   Roboto_700Bold,
  //   RobotoSlab_400Regular,
  //   RobotoSlab_700Bold,
  // });

 
  return (
    <>
      <StatusBar barStyle="light-content"/>
      <Navigation />
    </>
  );
}

