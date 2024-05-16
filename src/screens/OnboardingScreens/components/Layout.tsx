import { SafeAreaView } from "react-native-safe-area-context";
import { Card, StyledPressable, StyledText } from "../../../components";
import { View, ScrollView, ImageProps, Image, Dimensions } from "react-native";
import { ReactElement } from "react";
import { StepIndicator } from "./StepIndicator";

export type OnboardingLayoutProps = {
  dataComponent: ReactElement;
  onNextPress: () => void;
  skippable?: boolean;
  step: number;
  imageSource: ImageProps["source"];
};

export const OnboardingLayout = ({
  dataComponent,
  imageSource,
  onNextPress,
  skippable,
  step,
}: OnboardingLayoutProps) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <StyledText center color="primary" weight={700} xl3 className="mt-2">
          CULERO
        </StyledText>
        <StyledText center className="my-4" lg>
          Welcome to Culero!
        </StyledText>
        <StepIndicator className="self-center mb-5" currentStep={step} />

        <View className="flex md:flex-row px-4">
          <Image
            className="rounded-lg self-center mb-5"
            style={{ width: Dimensions.get("window").width - 32 }}
            source={imageSource}
          />

          <Card
            bodyComponent={
              <>
                {dataComponent}
                <StyledPressable
                  className="hidden md:flex"
                  onPress={onNextPress}
                >
                  Next
                </StyledPressable>
              </>
            }
          />
          <StyledPressable
            className="md:hidden my-9 py-3"
            onPress={onNextPress}
            textVariant={{ weight: 600, lg: true }}
          >
            Next
          </StyledPressable>
          {skippable && <StyledText>Skip for now</StyledText>}
          <View className="mt-20" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
