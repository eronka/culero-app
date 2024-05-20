import { Pressable, View, Image } from "react-native";
import {
  SocialMediaConnections,
  StyledText,
  StyledTextInput,
} from "../../components";
import { useFormik } from "formik";
import colors from "../../../colors";
import { Icon } from "../../icons";

const step1Image = require("../../../assets/onboarding-1.png");
const step2Image = require("../../../assets/onboarding-2.png");
const step3Image = require("../../../assets/onboarding-3.png");
import * as ImagePicker from "expo-image-picker";
import { useUpdateProfile } from "../../hooks/useUpdateProfile";
import * as Yup from "yup";
import { useUpdateProfilePicture } from "../../hooks/useUpdateProfilePicture";
import { OnboardingFlow } from "./components/OnboardingFlow";
import { useScreenInfo } from "../../hooks/useScreenInfo";

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

export const OnboardingScreen = () => {
  const updateUserMutation = useUpdateProfile();
  const updateProfilePicMutation = useUpdateProfilePicture();
  const { platform } = useScreenInfo();

  const form = useFormik({
    initialValues: {
      name: "",
      headline: "",
    },
    onSubmit: async (values) => {
      return updateUserMutation.mutateAsync(values);
    },
  });

  const imageForm = useFormik({
    initialValues: { image: "" },
    validationSchema: Yup.object().shape({
      image: Yup.string().required("No image uploaded."),
    }),
    onSubmit: async (values) => {
      return updateProfilePicMutation.mutateAsync(values.image);
    },
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      if (platform !== "web") {
        imageForm.setFieldValue(
          "image",
          `data:${result.assets[0].mimeType};base64,${result.assets[0].base64}`
        );
      } else {
        imageForm.setFieldValue("image", result.assets[0].uri);
      }
    }
  };

  return (
    <OnboardingFlow
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
          image: step3Image,
          skippable: true,
          onNextPress: () => imageForm.handleSubmit(),
          component: (
            <View>
              <StyledText weight={600} xl>
                Add profile picture
              </StyledText>

              <Pressable className="py-12 items-center" onPress={pickImage}>
                {imageForm.values.image !== "" ? (
                  <Image
                    source={{ uri: imageForm.values.image }}
                    style={{
                      height: 131,
                      width: 131,
                      borderRadius: 9999,
                      borderWidth: 1,
                      borderColor: "black",
                    }}
                  />
                ) : (
                  <Icon name="user-avatar" color="light-primary" />
                )}
                {imageForm.errors.image && (
                  <StyledText center color="deep-red">
                    {imageForm.errors.image}
                  </StyledText>
                )}
                <StyledText center color="deep-red" className="mt-4">
                  {updateProfilePicMutation.error?.message}
                </StyledText>
              </Pressable>
            </View>
          ),
        },
      ]}
    />
  );
};
