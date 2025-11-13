import { List } from "@/components/List";
import { Button } from "@/components/Button";
import { useCallback, useState } from "react";
import { Loading } from "@/components/Loading";
import { router, useFocusEffect } from "expo-router";
import { View, StatusBar, Alert } from "react-native";
import { Target, TargetProps } from "@/components/Target";
import { numberToCurrency } from "@/utils/numberToCurrency";
import { useTargetDatabase } from "@/database/useTargetDatabase";
import { HomeHeader, HomeHeaderProps } from "@/components/HomeHeader";
import { useTransactionsDataBase } from "@/database/useTransactionsDataBase";

export default function Index() {
    const [summary, setSummary] = useState<HomeHeaderProps>();
    const [isFetching, setIsFetching] = useState(true);
    const [targets, setTargets] = useState<TargetProps[]>([]);
    const targetDataBase = useTargetDatabase();
    const transactionDataBase = useTransactionsDataBase();

    async function fetchTargets(): Promise<TargetProps[]> {
        try {
            const response = await targetDataBase.list();
            return response.map(item => ({
                id: String(item.id),
                name: String(item.name),
                current: numberToCurrency(item.current),
                percent: item.percentage.toFixed(0) + "%",
                target: numberToCurrency(item.amount)
            }));
        } catch (error) {
            Alert.alert("Erro", "Não foi possível carregar as metas.");
        }
    }

    async function fetchSummary(): Promise<HomeHeaderProps> {
        try {
            const response = await transactionDataBase.summary();
            return {
                total: numberToCurrency(response.input + response.output),
                input: { label: "Entradas", value: numberToCurrency(response.input) },
                output: { label: "Saidas", value: numberToCurrency(response.output) }
            };
        } catch (error) {
            Alert.alert("Erro", "Não foi possível carregar o resumo.");
        }
    }

    async function fetchData() {
        const targetDataPromise = fetchTargets();
        const dataSummaryPromise = fetchSummary();
        const [targetData, dataSummary] = await Promise.all([targetDataPromise, dataSummaryPromise]);

        setTargets(targetData);
        setSummary(dataSummary);

        setIsFetching(false);
    }

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    if (isFetching) {
        return <Loading/>;
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content"/>
            <HomeHeader data={summary}/>
            <List
                renderItem={({ item }) => (
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