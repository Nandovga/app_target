import { router } from "expo-router";
import { fontFamily } from "@/theme/fontFamily";
import { Text, View, Button } from "react-native";

export default function Index() {
    return (
        <View style={{justifyContent: "center", alignItems: "center", flex: 1}}>
            <Text style={{fontFamily: fontFamily.bold, fontSize: 34 }}>Expo Router</Text>
            <Button title="Target" onPress={() => router.navigate("/target")} />
            <Button title="Transaction" onPress={() => router.navigate("/transaction/1")} />
            <Button title="Progresso" onPress={() => router.navigate("/in-progress/1")} />
        </View>
    )
}