import { styles } from "./styles";
import { colors } from "@/theme/colors";
import { ActivityIndicator } from "react-native";

export function Loading() {
    return (
        <ActivityIndicator style={styles.container}
                           color={colors.blue[500]} />
    )
}