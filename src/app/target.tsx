import { Input } from "@/components/Input";
import { useState, useEffect } from "react";
import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import { Alert, StatusBar, View } from "react-native";
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
            update();
        } else {
            create();
        }
    }

    function handleRemove() {
        if (!params.id) {
            return;
        }
        Alert.alert("Remover", "Deseja realmente remover esta meta?", [
            { text: "Não", style: "cancel" },
            { text: "Sim", onPress: () => remove() },
        ]);
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

    async function update() {
        try {
            await targetDataBase.update({ id: Number(params.id), name, amount });
            Alert.alert("Sucesso!", "Meta atualizada com sucesso!", [
                { text: "OK", onPress: () => router.back() }
            ]);
        } catch (error) {
            Alert.alert("Erro", "Não foi possível atualizar a meta.");
            setIsProcessing(false);
        }
    }

    async function remove() {
        try {
            setIsProcessing(true);
            await targetDataBase.remove(Number(params.id));
            Alert.alert("Meta", "Meta removida com sucesso!", [
                { text: "OK", onPress: () => router.replace("/") }
            ]);
        } catch (error) {
            Alert.alert("Erro", "Não foi possível remover a meta.");
        }
    }

    async function fetchDetails(id: number) {
        try {
            const response = await targetDataBase.show(id);
            setName(response.name);
            setAmount(response.amount);
        } catch (error) {
            Alert.alert("Erro", "Não foi possível carregar os detalhes.");
        }
    }

    useEffect(() => {
        if (params.id) {
            fetchDetails(Number(params.id));
        }
    }, [params.id]);

    return (
        <View style={{ flex: 1, padding: 24 }}>
            <StatusBar barStyle="dark-content"/>
            <PageHeader
                rightButton={params.id && {
                    icon: "delete", onPress: () => handleRemove()
                }}
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