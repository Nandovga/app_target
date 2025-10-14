import { colors } from "@/theme";
import { styles } from "./styles";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";

type Props = {
    title: string;
    subtitle?: string;
    rightButton?: {
        onPress: () => void;
        icon: keyof typeof MaterialIcons.glyphMap;
    }
};

export function PageHeader({ title, subtitle, rightButton }: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity activeOpacity={0.8}
                    onPress={() => router.back()}>
                    <MaterialIcons color={colors.black}
                        name="arrow-back"
                        size={32}/>
                </TouchableOpacity>

                {rightButton && (
                    <TouchableOpacity activeOpacity={0.8}
                        onPress={() => rightButton.onPress()}>
                        <MaterialIcons color={colors.gray[500]}
                            name={rightButton.icon}
                            size={24}/>
                    </TouchableOpacity>
                )}
            </View>

            <Text style={styles.title}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
    );
}