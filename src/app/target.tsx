import { useState } from "react";
import { Alert, View } from "react-native";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import { router, useLocalSearchParams } from "expo-router";
import { CurrencyInput } from "@/components/CurrencyInput";
import { useTargetDatabase } from "@/database/useTargetDatabase";

export default function Target() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [name, setName] = useState("");
    const [amount, setAmount] = useState(0);

    const params = useLocalSearchParams<{ id?: string }>();
    const targetDataBase = useTargetDatabase();

    function handleSave() {
        if (!name.trim() || amount <= 0) {
            return Alert.alert("Atenção", "Preencha nome e valor precisa ser maior que zero.");
        }
        setIsProcessing(true);
        if (params.id) {
            // update
        } else {
            create();
        }
    }

    async function create() {
        try {
            await targetDataBase.create({ name, amount });
            Alert.alert("Nova Meta", "Meta criada com sucesso!", [
                { text: "OK", onPress: () => router.back() }
            ]);
        } catch (error) {
            Alert.alert("Erro", "Não foi possísel criar a meta.");
            setIsProcessing(false);
        }
    }

    return (
        <View style={{ flex: 1, padding: 24 }}>
            <PageHeader
                subtitle="Economize para alcançar sua meta financeira."
                title="Meta"/>
            <View style={{ marginTop: 32, gap: 24 }}>
                <Input
                    label="Nome da meta"
                    placeholder="Ex: Estudar React Native"
                    value={name}
                    onChangeText={setName}/>
                <CurrencyInput
                    label="Valor alvo (R$)"
                    value={amount}
                    onChangeValue={setAmount}/>
                <Button
                    isProcessing={isProcessing}
                    title="Salvar"
                    onPress={handleSave}/>
            </View>
        </View>
    );
}