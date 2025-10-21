import { colors } from "@/theme";
import { styles } from "./styles";
import { Option } from "./options";
import { View } from "react-native";
import { TransactionTypes } from "@/utils/TransactionTypes";

type Props = {
    selected: TransactionTypes
    onChange(type: TransactionTypes): void;
};

export function TransactionType({ selected, onChange }: Props) {
    return (
        <View style={styles.container}>
            <Option
                icon="arrow-upward"
                isSelected={selected === TransactionTypes.Input}
                selectedColor={colors.blue[500]}
                title="Guardar"
                onPress={() => onChange(TransactionTypes.Input)}/>
            <Option
                icon="arrow-downward"
                isSelected={selected === TransactionTypes.Output}
                selectedColor={colors.red[400]}
                title="Resgatar"
                onPress={() => onChange(TransactionTypes.Output)}/>
        </View>
    );
}