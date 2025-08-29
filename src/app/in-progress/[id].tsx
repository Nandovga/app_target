import { Button, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

export default function () {
    const params = useLocalSearchParams<{id: string}>();

    return (
        <View style={{justifyContent: "center", alignItems: "center", flex: 1}}>
            <Text>InProgress {params.id}</Text>
            <Button title="Voltar" onPress={() => router.back()} />
        </View>
    )
}