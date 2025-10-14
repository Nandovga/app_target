import { colors } from "@/theme";
import { styles } from "./styles";
import { Separator } from "@/components/Separator";
import { FlatList, FlatListProps, StyleProp, Text, View, ViewStyle } from "react-native";

type Props<T> = FlatListProps<T> & {
    title: string,
    emptyMessage?: string,
    containerStyle?: StyleProp<ViewStyle>,
};

export function List<T>({
    title,
    emptyMessage,
    containerStyle,
    data,
    renderItem,
    ...rest
}: Props<T>) {
    return (
        <View style={[styles.container, containerStyle]}>
            <Text style={styles.title}>{title}</Text>
            <FlatList contentContainerStyle={styles.listContent}
                data={data}
                ItemSeparatorComponent={() => <Separator color={colors.gray[200]}/>}
                ListEmptyComponent={() => <Text style={styles.empty}>{emptyMessage}</Text>}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                {...rest}/>
        </View>
    );
}