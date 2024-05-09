import { ScrollView, View } from "react-native";
import { StyledOtpInput, StyledPressable, StyledText } from "../../components";
import { useNavigation } from "@react-navigation/native";
import { AuthStackParamList, RootStackParamList } from "../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useVerifyEmail } from "../../hooks/useVerifyEmail";
import { useRegenerateCode } from "../../hooks/useRegenerateCode";
import { useScreenInfo } from "../../hooks/useScreenInfo";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = NativeStackScreenProps<AuthStackParamList, "VerifyLogin">;
export const VerifyLoginScreen = ({ route }: Props) => {
  const navigation = useNavigation();
  const verifyEmail = useVerifyEmail();
  const regenerateCode = useRegenerateCode();
  const { email } = route.params;
  const { isPhone } = useScreenInfo();

  const form = useFormik({
    initialValues: {
      code: "",
    },
    onSubmit: async (values) => {
      verifyEmail.mutate({ email, code: values.code });
    },
  });

  return (
    <SafeAreaView>
      <ScrollView className="px-4 max-w-xl md:mt-0 md:self-center">
        <StyledText weight={600} xl3 center>
          Welcome back
        </StyledText>
        <StyledText color="gray35" className="mt-6" center lg>
          {`We've sent a temporary login code to ${email}.`}
        </StyledText>
        <StyledText
          color="gray35"
          className="mt-6"
          center
          lg
          onPress={() => navigation.goBack()}
        >
          Not you?
        </StyledText>
        <StyledOtpInput
          margin={isPhone ? 1 : 8}
          height={isPhone ? 62 : 72}
          containerClassName="max-w-fit self-center m-10"
          onChangeText={(value: string) => form.setFieldValue("code", value)}
        />
        {verifyEmail.error && (
          <StyledText color="deep-red" center className="mb-4">
            {verifyEmail.error.message}
          </StyledText>
        )}
        <StyledPressable
          fw
          color="light"
          className=" mb-4"
          textClassName="p-1"
          disabled={
            form.values.code.length !== 6 ||
            form.isSubmitting ||
            verifyEmail.isPending
          }
          onPress={() => form.handleSubmit()}
        >
          Continue
        </StyledPressable>

        <StyledText sm color="gray35" center>
          By continuing, you agree to Culero
          <StyledText
            sm
            weight={600}
            className="italic"
            onPress={() => console.log("Should go to T&C")}
          >
            Terms of Service
          </StyledText>{" "}
          and{" "}
          <StyledText
            sm
            weight={600}
            className="italic"
            onPress={() => console.log("Should go to privacy poloicy")}
          >
            Privacy Policy
          </StyledText>
          .
        </StyledText>
        <StyledText className="mt-12" center>
          Didn't receive the code?{" "}
          <StyledText
            weight={500}
            color="primary"
            className="italic"
            onPress={() => {
              if (!regenerateCode.isPending && !regenerateCode.isSuccess) {
                regenerateCode.mutate({ email });
                setTimeout(() => {
                  regenerateCode.reset();
                }, 60000);
              }
            }}
          >
            {regenerateCode.isSuccess ? "Sent!" : "Resend Code"}
          </StyledText>{" "}
        </StyledText>
      </ScrollView>
    </SafeAreaView>
  );
};
