import { colors } from "@/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "@/components/TransactionType/styles";
import { ColorValue, Pressable, PressableProps, Text } from "react-native";

type Props = PressableProps & {
    isSelected: boolean;
    title: string;
    icon: keyof typeof MaterialIcons.glyphMap;
    selectedColor: ColorValue;
};

export function Option({ isSelected, title, icon, selectedColor, ...rest }: Props) {
    return (
        <Pressable
            {...rest}
            style={[styles.option, isSelected && { backgroundColor: selectedColor }]}>
            <MaterialIcons
                color={isSelected ? colors.white : colors.gray[500]}
                name={icon}
                size={24}/>
            <Text style={[styles.title, isSelected && { color: colors.white }]}>
                {title}
            </Text>
        </Pressable>
    );
}