import { colors } from "@/theme";
import { styles } from "./styles";
import { Separator } from "@/components/Separator";
import { FlatList, FlatListProps, StyleProp, Text, View, ViewStyle } from "react-native";

type Props<T> = FlatListProps<T> & {
    title: string,
    emptyMessage?: string,
    containerStyle?: StyleProp<ViewStyle>,
}

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
            <FlatList data={data}
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={styles.listContent}
                      renderItem={renderItem}
                      ListEmptyComponent={() => <Text style={styles.empty}>{emptyMessage}</Text>}
                      ItemSeparatorComponent={() => <Separator color={colors.gray[200]}/>}
                      {...rest}/>
        </View>
    )
}