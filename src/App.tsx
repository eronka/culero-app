import React from "react";
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation/navigation";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";
import {
  useFonts,
  Inter_100Thin,
  Inter_900Black,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from "@expo-google-fonts/inter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as Notifications from "expo-notifications";

const queryClient = new QueryClient();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const App = () => {
  const isLoadingComplete = useCachedResources();

  const [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black, // <- equivalent to Inter_900Black: Inter_900Black
  });

  return (
    <SafeAreaProvider>
      {isLoadingComplete && fontsLoaded && (
        <QueryClientProvider client={queryClient}>
          <Navigation />
          <StatusBar style={"light"} />
        </QueryClientProvider>
      )}
    </SafeAreaProvider>
  );
};

export default App;
