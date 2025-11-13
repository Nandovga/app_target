import { useState } from "react";
import { Alert, View } from "react-native";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import { CurrencyInput } from "@/components/CurrencyInput";
import { router, useLocalSearchParams } from "expo-router";
import { TransactionTypes } from "@/utils/TransactionTypes";
import { TransactionType } from "@/components/TransactionType";
import { useTransactionsDataBase } from "@/database/useTransactionsDataBase";

export default function () {
    const [type, setType] = useState(TransactionTypes.Input);
    const [amount, setAmount] = useState(0);
    const [observation, setObservation] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    const params = useLocalSearchParams<{ id: string }>();
    const transactionDataBase = useTransactionsDataBase();

    async function handleCreate() {
        try {
            if (amount <= 0) {
                return Alert.alert("Atenção!", "Preencha o valor. A transação deve ser maior que zero.");
            }

            setIsCreating(true);
            await transactionDataBase.create({
                target_id: Number(params.id),
                amount: type === TransactionTypes.Output ? amount * -1 : amount,
                observation
            });
            Alert.alert("Sucesso", "Transação salva com sucesso!", [
                { text: "OK", onPress: router.back }
            ]);
        } catch (error) {
            Alert.alert("Error", "Não foi possível salvar a transação.");
            setIsCreating(false);
        }
    }

    return (
        <View style={{ flex: 1, padding: 24 }}>
            <PageHeader
                subtitle="A cada valor guardado você fica mais próximo da sua meta. Se esforce para guardar e evitar retirar."
                title="Nova transação"/>
            <View style={{ marginTop: 32, gap: 24 }}>
                <TransactionType
                    selected={type}
                    onChange={setType}/>
                <CurrencyInput
                    label="Valor (R$)"
                    value={amount}
                    onChangeValue={setAmount}/>
                <Input
                    label="Motivo (opcional)"
                    placeholder="Ex: Investir em CDB de 110% no banco XPTO"
                    value={observation}
                    onChangeText={setObservation}/>
                <Button
                    isProcessing={isCreating}
                    title="Salvar"
                    onPress={handleCreate}/>
            </View>
        </View>
    );
}