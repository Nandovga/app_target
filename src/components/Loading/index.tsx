import { colors } from "@/theme";
import { styles } from "./styles";
import { ActivityIndicator } from "react-native";

export function Loading() {
    return (
        <ActivityIndicator color={colors.blue[500]}
            style={styles.container}/>
    );
}