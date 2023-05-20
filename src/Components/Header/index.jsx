import { Image, Text, View } from "react-native";
import logo from "../../../assets/icon.png";
import Styles from "./styles.scss";

export default function Header() {
    return(
        <View style={Styles.container}>
            <Image source={logo} style={Styles.image}/>
            <View style={Styles.words}>
                <Text style={Styles.welcome}>Seja Bem vindo</Text>
                <Text style={Styles.name}>Guilherme Dantas</Text>
            </View>
        </View>
    );
}