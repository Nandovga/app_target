import { router } from "expo-router";
import { List } from "@/components/List";
import { Button } from "@/components/Button";
import { Target } from "@/components/Target";
import { View, StatusBar } from "react-native";
import { HomeHeader } from "@/components/HomeHeader";

const summary = {
    total: "R$ 2.680,00",
    input: { label: "Entradas", value: "R$ 6,184.90" },
    output: { label: "Saidas", value: "-R$ 883.65" }
};

const targets = [
    {
        id: "1",
        name: "Estudar React Native",
        percent: "100%",
        current: "R$ 1.000,00",
        target: "R$ 1.000,00"
    },
    {
        id: "2",
        name: "Estudar React Native",
        percent: "100%",
        current: "R$ 1.000,00",
        target: "R$ 1.000,00"
    },
    {
        id: "3",
        name: "Estudar React Native",
        percent: "100%",
        current: "R$ 1.000,00",
        target: "R$ 1.000,00"
    }
];

export default function Index() {
    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content"/>
            <HomeHeader data={summary}/>
            <List renderItem={({ item }) => (
                <Target data={item}
                    onPress={() => router.navigate(`/in-progress/${item.id}`)}/>
            )}
            containerStyle={{ paddingHorizontal: 24 }}
            data={targets}
            emptyMessage="Nenhum meta. Clique em nova meta para adicionar."
            keyExtractor={(item) => item.id}
            title="Metas"/>
            <View style={{ padding: 24, paddingBottom: 32 }}>
                <Button title="Nova Meta"
                    onPress={() => router.navigate("target")}/>
            </View>
        </View>
    );
}