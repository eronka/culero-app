import { View } from "react-native";
import { OnboardingLayout } from "./components";
import {
  SocialMediaConnections,
  StyledText,
  StyledTextInput,
} from "../../components";
import { useFormik } from "formik";
import colors from "../../../colors";

const step1Image = require("../../../assets/onboarding-1.png");
const step2Image = require("../../../assets/onboarding-2.png");

const SocialAccountsStep = () => {
  return (
    <View>
      <StyledText weight={600} xl>
        Connect your social accounts
      </StyledText>
      <StyledText color="gray35" className="mt-6 mb-4 text-[14px]">
        Culero will only access basic information. We respect your privacy and
        will not post on your behalf.
      </StyledText>
      <SocialMediaConnections />
    </View>
  );
};

export const SocialAccountsScreen = () => {
  const form = useFormik({
    initialValues: {
      name: "",
      headline: "",
    },
    onSubmit: (values) => {},
  });

  return (
    <OnboardingLayout
      data={[
        {
          image: step1Image,
          component: <SocialAccountsStep />,
        },
        {
          image: step2Image,
          onNextPress: () => form.handleSubmit(),
          skippable: true,
          component: (
            <View>
              <StyledText weight={600} xl>
                Complete Your Profile Setup
              </StyledText>
              <StyledTextInput
                placeholder="Full name"
                containerClassName="bg-grayF2 p-4 mt-9"
                value={form.values.name}
                style={{ fontSize: 20 }}
                placeholderTextColor={colors["gray35"]}
                onChangeText={(text) => form.setFieldValue("name", text)}
              />
              <StyledTextInput
                placeholder="Professional Headline"
                value={form.values.headline}
                placeholderTextColor={colors["gray35"]}
                containerClassName="bg-grayF2 p-4 mt-4 mb-7"
                style={{ fontSize: 20 }}
                onChangeText={(text) => form.setFieldValue("headline", text)}
              />
            </View>
          ),
        },
        {
          image: step1Image,
          component: <SocialAccountsStep />,
        },
      ]}
    />
  );
};
