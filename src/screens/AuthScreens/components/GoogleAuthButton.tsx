import { StyledPressable } from "../../../components/StyledPressable";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import storage from "../../../utils/storage";
import { useUserQuery } from "../../../hooks";
import { baseUrl } from "../../../utils/api";

WebBrowser.maybeCompleteAuthSession();

export const GoogleAuthButton = () => {
  const userQuery = useUserQuery(true);
  const initializePopup = async () => {
    const cb = Linking.createURL("/");

    const result = await WebBrowser.openAuthSessionAsync(
      `${baseUrl}/auth/google?app_url=${cb}`,
      cb
    );

    if (result.type === "success") {
      const token = result.url.split("?")[1].split("=")[1];
      await storage.setItem(storage.TOKEN_KEY, token);
      userQuery.refetch();
    }
  };

  return (
    <StyledPressable
      fw
      color="white"
      className="mt-12 border h-16"
      onPress={initializePopup}
      leftIconProps={{ name: "google" }}
    >
      Continue with Google
    </StyledPressable>
  );
};
