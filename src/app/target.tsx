import { View } from "react-native";
import { PageHeader } from "@/components/PageHeader";

export default function () {
    return (
        <View style={{ flex: 1, padding: 24 }}>
            <PageHeader subtitle="Economize para alcançar sua meta financeira."
                title="Meta"/>
        </View>
    );
}