import { useNavigation } from "@react-navigation/native";
import { Connection } from "../types";

export function useNavToConnection() {
  const navigation = useNavigation();

  return {
    navigate: (userId: string, user: Connection) =>
      navigation.navigate("HomeScreen", {
        screen: "Connections",
        params: { screen: "Connection", params: { userId, user } },
      }),
  };
}
