import { View } from "react-native";
import { StyledPressable, StyledText } from "../../components";
import { useNavigation } from "@react-navigation/native";

import { Icon } from "../../icons";
import { SafeAreaView } from "react-native-safe-area-context";

export const EmailVerificationSuccess = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="h-full ">
      <View className="px-4 max-w-xl md:self-center mt-16 h-full flex">
        <View className="flex-1">
          <StyledText weight={600} xl3 center>
            Congratiulations
          </StyledText>
          <StyledText weight={600} xl3 center className="mt-8">
            Your Email is Verified!
          </StyledText>

          <StyledText color="gray35" className="mt-6" center lg>
            You're all set to explore Culero and connect with professionals from
            various fields
          </StyledText>
        </View>
        <Icon
          name="verified"
          size={90}
          color="verifiedBlue"
          className="self-center flex-1 justify-start"
        />
        <View className="flex-1">
          <StyledPressable
            fw
            color="light"
            className="mb-16"
            textClassName="p-1"
            onPress={() => navigation.navigate("Onboarding")}
          >
            Complete your profile
          </StyledPressable>

          <StyledText sm color="gray35" center>
            <StyledText
              sm
              weight={600}
              className="italic"
              onPress={() => console.log("Should go to T&C")}
            >
              Terms of Service
            </StyledText>{" "}
            |
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
        </View>
      </View>
    </SafeAreaView>
  );
};
