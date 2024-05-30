import { useNavigation } from "@react-navigation/native";

export function useNavToConnection() {
  const navigation = useNavigation();

  return {
    navigate: (userId: string) =>
      navigation.navigate("HomeScreen", {
        screen: "Connections",
        params: { screen: "Connection", params: { userId } },
      }),
  };
}
