import { ActivityIndicator, Button, Pressable, View } from "react-native";
import { StyledText } from "./StyledText";
import { StyledPressable } from "./StyledPressable";
import { HorizontalDivider } from "./HorizontalDivider";
import { ReactElement, ReactNode, useMemo } from "react";
import { Icon } from "../icons";
import { useSocialAccounts } from "../hooks/useSocialAccounts";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { baseUrl } from "../utils/api";
import storage from "../utils/storage";
import { SocialAccount } from "../types/SocialAccount";

WebBrowser.maybeCompleteAuthSession();

const SocialMediaConnection = ({
  description,
  onPressConnect,
  platformName,
  SocialMediaIcon,
  socialAccount,
}: {
  description: string;
  platformName: string;
  socialAccount?: SocialAccount;
  onPressConnect: () => void;
  SocialMediaIcon: ReactElement;
}) => {
  const isConnected = !!socialAccount;
  return (
    <View className="max-w-full items-center pb-4 md:flex-row">
      <View className="flex-row flex-auto">
        {SocialMediaIcon}
        {!isConnected && (
          <View className="flex-auto px-4">
            <StyledText color="gray35">{description}</StyledText>
          </View>
        )}
        {isConnected && (
          <Pressable
            className="flex-auto px-4 items-center self-center"
            onPress={() =>
              socialAccount.profileUrl &&
              Linking.openURL(socialAccount.profileUrl)
            }
          >
            <StyledText color="black">{`Connected as ${socialAccount.displayName}`}</StyledText>
          </Pressable>
        )}
      </View>
      <View className="flex-none self-end w-52 mt-4 md:mt-0 md:self-center">
        {!isConnected && (
          <StyledPressable
            color="light"
            textVariant={{ weight: 600 }}
            textClassName="text-sm"
            onPress={onPressConnect}
          >
            Connect to {platformName}
          </StyledPressable>
        )}
      </View>
    </View>
  );
};

export const SocialMediaConnections = () => {
  const socialAccounts = useSocialAccounts();

  const initializePopup = async (platform: string) => {
    const cb = Linking.createURL("/connection-success");
    const token = await storage.getItem(storage.TOKEN_KEY);
    const result = await WebBrowser.openAuthSessionAsync(
      `${baseUrl}/auth/${platform}/connect?app_url=${cb}&token=${token}`,
      cb
    );

    if (result.type === "success") {
      socialAccounts.refetch();
    }
  };

  const githubAccount = useMemo(
    () => socialAccounts.data?.find((s) => s.platform === "GITHUB"),
    [socialAccounts.data]
  );
  const facebookAccount = useMemo(
    () => socialAccounts.data?.find((s) => s.platform === "FACEBOOK"),
    [socialAccounts.data]
  );
  const linkedinAccount = useMemo(
    () => socialAccounts.data?.find((s) => s.platform === "LINKEDIN"),
    [socialAccounts.data]
  );

  return (
    <View className="w-full py-4">
      {!socialAccounts.isFetched && (
        <ActivityIndicator className="self-center" size="large" />
      )}
      {socialAccounts.isFetched && (
        <>
          <SocialMediaConnection
            SocialMediaIcon={<Icon name="linkedin-square" size={40} />}
            platformName="LinkedIn"
            socialAccount={linkedinAccount}
            onPressConnect={() => initializePopup("linkedin")}
            description={
              "Connect your LinkedIn account to showcase your professional background and network"
            }
          />
          <HorizontalDivider className="my-2" />
          {/* <SocialMediaConnection
            SocialMediaIcon={<Icon name="facebook-square" size={40} />}
            onPressConnect={() => initializePopup("facebook")}
            platformName="Facebook"
            socialAccount={facebookAccount}
            description={
              "Connect your Facebook  ---- NEEDS NEW DESCRIPTION AND ICON ---- account to share a glimpse of your creative side"
            }
          /> */}
          {/* <HorizontalDivider className="my-2" /> */}
          <SocialMediaConnection
            SocialMediaIcon={<Icon name="github-square" size={40} />}
            onPressConnect={() => initializePopup("github")}
            platformName="GitHub"
            socialAccount={githubAccount}
            description={
              "Connect your GitHub account to showcase your coding projects and contributions"
            }
          />
        </>
      )}
    </View>
  );
};
