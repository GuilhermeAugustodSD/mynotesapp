import { StatusBar, Platform } from 'react-native';
import Navigation from './src/Navigation/Navigation';

export default function App() {

  return (
    <>
      <StatusBar barStyle="light-content"/>
      <Navigation />
    </>
  );
}

