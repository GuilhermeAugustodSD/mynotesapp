import { Button, Image, Text, View } from "react-native";
import logo from "../../../assets/avatar_placeholder.png";
import Styles from "./styles.scss";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Header({name, avatar}) {

    return(
        <View style={Styles.container}>
            <View style={Styles.info}>
                <Image 
                    source={avatar ? { uri: `https://gdantasit-rocketnotes.onrender.com/files/${avatar}` }: logo}
                    style={Styles.image}
                    // style={{ backgroundColor: 'black', color:'white', borderRadius:10, overflow:'hidden'}}
                />
                <View style={Styles.words}>
                    <Text style={Styles.welcome}>Seja Bem vindo</Text>
                    <Text style={Styles.name}>{name}</Text>
                </View>

            </View>
            <View style={Styles.line}></View>
        </View>
    );
}