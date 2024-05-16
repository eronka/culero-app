import { SafeAreaView } from "react-native-safe-area-context";
import { Card, StyledPressable, StyledText } from "../../../components";
import { View, ScrollView, ImageProps, Image, ViewToken } from "react-native";
import { ReactElement, useCallback } from "react";
import { StepIndicator } from "./StepIndicator";
import { useScreenInfo } from "../../../hooks/useScreenInfo";
import { DefaultTheme } from "@react-navigation/native";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

export type StepProps = {
  component: ReactElement;
  image: ImageProps["source"];
  skippable?: boolean;
  onNextPress?: () => void;
};

export type OnboardingLayoutProps = {
  data: Array<StepProps>;
};

export const OnboardingLayout = ({ data }: OnboardingLayoutProps) => {
  const x = useSharedValue(0);
  const flatListRef = useAnimatedRef<Animated.FlatList<StepProps>>();
  const { width, isPhone } = useScreenInfo();

  const scrollHandle = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const renderItem = useCallback(
    ({ item, index }: { item: StepProps; index: number }) => {
      return (
        <View className="flex px-4 md:mt-5" style={{ width }}>
          <View className=" flex md:flex-row-reverse justify-center">
            <Image
              className="rounded-lg mb-5 md:mb-0"
              style={[
                {
                  width: isPhone ? width - 32 : width / 3,
                },
                !isPhone ? { height: "100%" } : {},
              ]}
              source={item.image}
            />

            <Card
              className="md:w-2/3 md:max-w-screen-sm md:mr-16 md:p-10 md:min-h-96"
              bodyComponent={
                <>
                  {item.component}
                  <StyledPressable
                    className="hidden md:flex py-4 rounded-2xl"
                    onPress={async () => {
                      await item.onNextPress?.();
                      if (index + 1 < data.length) {
                        flatListRef.current?.scrollToIndex({
                          index: index + 1,
                          animated: true,
                        });
                      }
                    }}
                  >
                    Next
                  </StyledPressable>
                </>
              }
            />
            <StyledPressable
              className="md:hidden my-9 py-4 rounded-2xl"
              onPress={async () => {
                await item.onNextPress?.();

                if (index + 1 < data.length) {
                  flatListRef.current?.scrollToIndex({ index: index + 1 });
                }
              }}
              textVariant={{ weight: 600, lg: true }}
            >
              Next
            </StyledPressable>
          </View>

          {item.skippable && (
            <StyledText
              weight={600}
              color="gray35"
              center
              className="mt-6 italic"
              onPress={() => {
                if (index + 1 < data.length) {
                  flatListRef.current?.scrollToIndex({ index: index + 1 });
                }
              }}
            >
              Skip for now
            </StyledText>
          )}
          <View className="mt-20" />
        </View>
      );
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
          snapToInterval={width}
          ref={flatListRef}
          horizontal
          style={{ width }}
          pagingEnabled={true}
          data={data}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          getItemLayout={(data, index) => {
            return { length: width, index, offset: width * index };
          }}
          onScroll={scrollHandle}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
