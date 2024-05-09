import { View, ScrollView } from "react-native";
import {
  HorizontalDivider,
  StyledPressable,
  StyledText,
  StyledTextInput,
} from "../../components";
import colors from "../../../colors";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSignup } from "../../hooks/useSignup";
import { SafeAreaView } from "react-native-safe-area-context";

export const InitialAuthScreen = () => {
  const navigation = useNavigation();
  const [seeFullOptions, setFullOptions] = useState(false);
  const signUpMutation = useSignup();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validateOnChange: false,
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Must be a valid email!")
        .required("Email is required!"),
    }),
    onSubmit: async (values) => {
      signUpMutation.mutate({ ...values });
    },
  });

  return (
    <SafeAreaView>
      <ScrollView className="px-4 max-w-xl md:self-center">
        <StyledText weight={600} xl3 center>
          Create your account
        </StyledText>
        <StyledText color="gray35" className="mt-6" center>
          Embark on a Journey of Professional Growth and Collaboration!
        </StyledText>

        <StyledPressable
          fw
          color="white"
          className="mt-12 border h-16"
          onPress={() => {}}
          leftIconProps={{ name: "google" }}
        >
          Continue with Google
        </StyledPressable>
        {!seeFullOptions && (
          <StyledPressable
            fw
            color="white"
            className="mt-4 border h-16"
            onPress={() => setFullOptions(true)}
          >
            See other options
          </StyledPressable>
        )}
        {seeFullOptions && (
          <>
            <StyledPressable
              fw
              color="white"
              className="mt-4 border h-16"
              onPress={() => {}}
            >
              Continue with Apple
            </StyledPressable>
            <StyledPressable
              fw
              color="white"
              className="mt-4 border h-16"
              onPress={() => {}}
            >
              Continue with Linkedin
            </StyledPressable>
            <StyledPressable
              fw
              color="white"
              className="mt-4 border h-16"
              onPress={() => {}}
            >
              Continue with Facebook
            </StyledPressable>
          </>
        )}
        <View className="flex-row items-center mt-6">
          <HorizontalDivider className="flex-1" />
          <StyledText weight={600} color="nickel">
            {"  "}
            Or{"  "}
          </StyledText>
          <HorizontalDivider className="flex-1" />
        </View>
        <StyledTextInput
          containerClassName="mt-9 bg-grayF2 py-4"
          placeholder="Enter your email address"
          value={formik.values.email}
          error={formik.errors.email}
          onChangeText={(value) => formik.setFieldValue("email", value)}
          placeholderTextColor={colors.gray35}
        />
        {signUpMutation.error && (
          <StyledText color="deep-red">
            {signUpMutation.error.message}
          </StyledText>
        )}
        <StyledPressable
          fw
          color="light"
          className="mt-6 mb-4"
          textClassName="p-1"
          onPress={() => formik.handleSubmit()}
        >
          Create account
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
            className="italic"
            sm
            weight={600}
            onPress={() => console.log("Should go to privacy poloicy")}
          >
            Privacy Policy
          </StyledText>
          .
        </StyledText>
        <StyledText className="mt-6" center>
          Have an account already?{" "}
          <StyledText
            weight={500}
            color="primary"
            className="italic"
            onPress={() => {
              navigation.navigate("AuthNav", { screen: "Login" });
            }}
          >
            Sign in
          </StyledText>{" "}
        </StyledText>
      </ScrollView>
    </SafeAreaView>
  );
};
