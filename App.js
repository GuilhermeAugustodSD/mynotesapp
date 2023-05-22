import { StatusBar } from 'expo-status-bar';
import { useFonts, Roboto_400Regular, Roboto_700Bold, RobotoSlab_400Regular, RobotoSlab_700Bold } from '@expo-google-fonts/roboto';
import Navigation from './src/Navigation/Navigation';

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
      <Navigation />
    </>
  );
}

