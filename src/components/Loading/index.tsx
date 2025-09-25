import { colors } from "@/theme";
import { styles } from "./styles";
import { ActivityIndicator } from "react-native";

export function Loading() {
    return (
        <ActivityIndicator style={styles.container}
                           color={colors.blue[500]} />
    )
}