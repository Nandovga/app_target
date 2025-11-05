import { Suspense } from "react";
import { Stack } from "expo-router";
import { colors } from "@/theme/colors";
import { migrate } from "@/database/migrate";
import { SQLiteProvider } from "expo-sqlite";
import { Loading } from "@/components/Loading";
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_700Bold } from "@expo-google-fonts/inter";

export default function Layout() {
    const [fontLoaded] = useFonts({ Inter_400Regular, Inter_500Medium, Inter_700Bold });

    if (!fontLoaded) {
        return <Loading/>;
    }

    return (
        <Suspense fallback={<Loading/>}>
            <SQLiteProvider
                useSuspense
                databaseName="target.db"
                onInit={migrate}>
                <Stack screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: colors.white }
                }}/>
            </SQLiteProvider>
        </Suspense>
    );
}