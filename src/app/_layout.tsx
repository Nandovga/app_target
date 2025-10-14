import { Stack } from "expo-router";
import { colors } from "@/theme/colors";
import { Loading } from "@/components/Loading";
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_700Bold } from "@expo-google-fonts/inter";

export default function Layout() {
    const [fontLoaded] = useFonts({ Inter_400Regular, Inter_500Medium, Inter_700Bold });

    if (!fontLoaded) {
        return <Loading/>;
    }

    return (
        <Stack screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.white }
        }}/>
    );
}