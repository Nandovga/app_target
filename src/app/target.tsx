import { View } from "react-native";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import { CurrencyInput } from "@/components/CurrencyInput";

export default function () {
    return (
        <View style={{ flex: 1, padding: 24 }}>
            <PageHeader
                subtitle="Economize para alcançar sua meta financeira."
                title="Meta"/>
            <View style={{ marginTop: 32, gap: 24 }}>
                <Input
                    label="Nome da meta"
                    placeholder="Ex: Estudar React Native"/>
                <CurrencyInput
                    label="Valor alvo (R$)"
                    value={0}/>
                <Button title="Salvar"/>
            </View>
        </View>
    );
}