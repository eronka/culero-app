import { View } from "react-native";
import { OnboardingLayout } from "./components";
import { SocialMediaConnections, StyledText } from "../../components";
import { SocialAccountsStep } from "./components/SocialAccountsStep";

const step1Image = require("../../../assets/onboarding-1.png");

export const SocialAccountsScreen = () => {
  return (
    <OnboardingLayout
      data={[
        {
          image: step1Image,
          component: <SocialAccountsStep />,
        },
        {
          image: step1Image,
          component: <SocialAccountsStep />,
        },
        {
          image: step1Image,
          component: <SocialAccountsStep />,
        },
      ]}
    />
  );
};
