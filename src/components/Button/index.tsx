import { colors } from "@/theme";
import { styles } from "./styles";
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {
    title: string;
    isProcessing?: boolean;
};

export function Button({ title, isProcessing = false, ...rest }: Props) {
    return (
        <TouchableOpacity activeOpacity={0.8}
            disabled={isProcessing}
            style={styles.container}
            {...rest}>
            {isProcessing
                ? <ActivityIndicator color={colors.white}
                    size="small"/>
                : <Text style={styles.title}>{title}</Text>}
        </TouchableOpacity>
    );
}