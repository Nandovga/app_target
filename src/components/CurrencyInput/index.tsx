import { colors } from "@/theme";
import { styles } from "./styles";
import { View, Text } from "react-native";
import Input, { CurrencyInputProps } from "react-native-currency-input";

type Props = CurrencyInputProps & {
    label: string;
};

export function CurrencyInput({ label, ...rest }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <Input
                delimiter="."
                minValue={0}
                placeholderTextColor={colors.gray[400]}
                precision={2}
                style={styles.input}
                {...rest}/>
        </View>
    );
}