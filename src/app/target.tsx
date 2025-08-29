import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function () {
    return (
        <View style={{justifyContent: "center", alignItems: "center", flex: 1}}>
            <Text>Target</Text>
            <Button title="Voltar" onPress={() => router.back()} />
        </View>
    )
}