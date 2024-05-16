import { SafeAreaView } from "react-native-safe-area-context";
import { Card, StyledPressable, StyledText } from "../../../components";
import { View, ScrollView, ImageProps, Image, ViewToken } from "react-native";
import { ReactElement, useCallback, useState } from "react";
import { StepIndicator } from "./StepIndicator";
import { useScreenInfo } from "../../../hooks/useScreenInfo";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

export type StepProps = {
  component: ReactElement;
  image: ImageProps["source"];
  skippable?: boolean;
};

export type OnboardingLayoutProps = {
  data: Array<StepProps>;
};

const StepItem = ({
  x,
  index,
  item,
}: {
  x: SharedValue<number>;
  index: number;
  item: StepProps;
}) => {
  const { width, isPhone } = useScreenInfo();

  return (
    <View
      className="flex md:flex-row-reverse px-4 self-center md:mt-5"
      style={[{ width }]}
    >
      <Image
        className="rounded-lg self-center mb-5 md:mb-0"
        style={[
          {
            width: isPhone ? width - 32 : width / 3,
          },
          !isPhone ? { height: "100%" } : {},
        ]}
        source={item.image}
      />

      <Card
        className="md:w-2/3 md:max-w-screen-sm md:mr-16"
        bodyComponent={
          <>
            {item.component}
            <StyledPressable
              className="hidden md:flex"
              // onPress={() => setStep(step + 1)}
            >
              Next
            </StyledPressable>
          </>
        }
      />
      <StyledPressable
        className="md:hidden my-9 py-3"
        // onPress={() => setStep(step + 1)}
        textVariant={{ weight: 600, lg: true }}
      >
        Next
      </StyledPressable>
      {item.skippable && <StyledText>Skip for now</StyledText>}
      <View className="mt-20" />
    </View>
  );
};

export const OnboardingLayout = ({ data }: OnboardingLayoutProps) => {
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);
  const flatListRef = useAnimatedRef<Animated.FlatList<StepProps>>();

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      flatListIndex.value = viewableItems[0].index ?? 0;
    },
    []
  );
  const scrollHandle = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const renderItem = useCallback(
    ({ item, index }: { item: StepProps; index: number }) => {
      return <StepItem x={x} index={index} item={item} />;
    },
    [x]
  );

  return (
    <SafeAreaView>
      <ScrollView stickyHeaderIndices={[0]}>
        <View
          className="bg-gray3"
          style={{ backgroundColor: DefaultTheme.colors.background }}
        >
          <StyledText
            center
            color="primary"
            weight={700}
            xl3
            className="mt-2 md:text-[64px] md:mt-10"
          >
            CULERO
          </StyledText>
          <StyledText center className="my-4" lg>
            Welcome to Culero!
          </StyledText>
          <StepIndicator
            className="self-center mb-5"
            x={x}
            steps={data.length}
          />
        </View>
        <Animated.FlatList
          ref={flatListRef}
          horizontal
          pagingEnabled={true}
          data={data}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onViewableItemsChanged={onViewableItemsChanged}
          onScroll={scrollHandle}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
