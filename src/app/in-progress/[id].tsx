import dayjs from "dayjs";
import { List } from "@/components/List";
import { Button } from "@/components/Button";
import { useCallback, useState } from "react";
import { Loading } from "@/components/Loading";
import { Progress } from "@/components/Progress";
import { PageHeader } from "@/components/PageHeader";
import { Alert, View, StatusBar } from "react-native";
import { numberToCurrency } from "@/utils/numberToCurrency";
import { TransactionTypes } from "@/utils/TransactionTypes";
import { useTargetDatabase } from "@/database/useTargetDatabase";
import { Transaction, TransactionProps } from "@/components/Transaction";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useTransactionsDataBase } from "@/database/useTransactionsDataBase";

export default function () {
    const [transactions, setTransactions] = useState<TransactionProps[]>([]);
    const [isFetching, setIsFetching] = useState(true);
    const [details, setDetails] = useState({
        name: "",
        current: "R$ 0,00",
        target: "R$ 0,00",
        percent: 0
    });

    const params = useLocalSearchParams<{ id: string }>();
    const targetDataBase = useTargetDatabase();
    const transactionDataBase = useTransactionsDataBase();

    async function fetchTargetDetails() {
        try {
            const response = await targetDataBase.show(Number(params.id));
            setDetails({
                name: response.name,
                current: numberToCurrency(response.current),
                target: numberToCurrency(response.amount),
                percent: response.percentage
            });
        } catch (error) {
            Alert.alert("Error", "Não foi possível carregar os detalhes.");
        }
    }

    async function fetchTransactions() {
        try {
            const response = await transactionDataBase.listByTargetId(Number(params.id));

            setTransactions(
                response.map(item => {
                    return {
                        id: String(item.id),
                        value: numberToCurrency(item.amount),
                        date: dayjs(item.created_at).format("DD/MM/YYYY [ás] HH:mm"),
                        description: item.observation,
                        type: item.amount < 0 ? TransactionTypes.Output : TransactionTypes.Input
                    };
                })
            );
        } catch (error) {
            Alert.alert("Error", "Não foi possível carregar as transações.");
        }
    }

    async function fetchData() {
        const fetchDatailsPromise = fetchTargetDetails();
        const fetchTransactionsPromise = fetchTransactions();

        await Promise.all([fetchDatailsPromise, fetchTransactionsPromise]);
        setIsFetching(false);
    }

    async function transactionRemove(id: string) {
        try {
            await transactionDataBase.remove(Number(id));
            fetchData();
        } catch (error) {
            Alert.alert("Error", "Não foi possível remover a transação.");
        }
    }

    function handleTransactionRemove(id: string) {
        Alert.alert("Remover", "Deseja realmente remover?", [
            { text: "Não", style: "cancel" },
            { text: "Sim", onPress: () => transactionRemove(id) },
        ]);
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
        <View style={{ flex: 1, padding: 24, gap: 32 }}>
            <StatusBar barStyle="dark-content"/>
            <PageHeader
                rightButton={{
                    icon: "edit",
                    onPress: () => router.navigate(`/target?id=${params.id}`)
                }}
                title={details.name}/>
            <Progress data={details}/>
            <List
                renderItem={({ item }) => (
                    <Transaction
                        data={item}
                        onRemove={() => handleTransactionRemove(item.id)}/>
                )}
                data={transactions}
                emptyMessage="Nenhuma transação. Toque em nova transação para guardar seu primeiro valor."
                title="Transações"/>
            <View style={{ paddingBottom: 15 }}>
                <Button
                    title="Nova Transação"
                    onPress={() => router.navigate(`/transaction/${params.id}`)}/>
            </View>
        </View>
    );
}