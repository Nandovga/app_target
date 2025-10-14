import { styles } from "./styles";
import { View, ColorValue } from "react-native";

export function Separator({ color }: { color?: ColorValue }) {
    return (
        <View style={[styles.container, { backgroundColor: color }]}/>
    );
}