import { View } from "react-native";
import { List } from "@/components/List";
import { Progress } from "@/components/Progress";
import { router, useLocalSearchParams } from "expo-router";
import { PageHeader } from "@/components/PageHeader";
import { TransactionTypes } from "@/utils/TransactionTypes";
import { Transaction, TransactionProps } from "@/components/Transaction";
import { Button } from "@/components/Button";

const details = {
    percent: 50,
    current: "R$ 580,00",
    target: "R$ 1.790,00"
};

const transaction: TransactionProps[] = [
    {
        id: "1",
        value: "R$ 580,00",
        date: "20/05/2023",
        description: "Compra do Apple Watch",
        type: TransactionTypes.Input
    },
    {
        id: "2",
        value: "R$ 580,00",
        date: "20/05/2023",
        description: "Compra do Apple Watch",
        type: TransactionTypes.Output
    }
];
export default function () {
    const params = useLocalSearchParams<{ id: string }>();

    return (
        <View style={{ flex: 1, padding: 24, gap: 32 }}>
            <PageHeader
                rightButton={{
                    icon: "edit",
                    onPress: () => {
                    }
                }}
                title="Apple Watch"/>
            <Progress data={details}/>
            <List
                renderItem={({ item }) => (
                    <Transaction
                        data={item}
                        onRemove={console.log}/>
                )}
                data={[]}
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