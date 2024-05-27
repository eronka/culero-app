import { ActivityIndicator, FlatList, View } from "react-native";
import {
  Card,
  HorizontalDivider,
  ReviewCard,
  StyledPressable,
  StyledText,
} from "../../components";
import { useUser } from "../../hooks";
import { useUserReviews } from "../../hooks/useUserReviews";
import { SettingsLayout } from "./components/SettingsLayout";

export const ReceivedReviewsScreen = () => {
  const user = useUser()!;
  const reviews = useUserReviews(user.id);
  return (
    <SettingsLayout canGoBack={true}>
      <Card
        className="px-20"
        bodyComponent={
          reviews.isFetched ? (
            <>
              <FlatList
                data={reviews.data}
                ListEmptyComponent={() => (
                  <View>
                    <StyledText>You have no reviews yet</StyledText>
                  </View>
                )}
                ItemSeparatorComponent={() => <HorizontalDivider />}
                renderItem={({ item }) => (
                  <View className="py-9">
                    <ReviewCard
                      review={item}
                      className="border border-[#EEEEEE] drop-shadow-md"
                    />
                    <View className="flex-row justify-between mt-5 items-center">
                      <StyledText color="gray65">
                        Notice something off about a review? Report it!
                      </StyledText>
                      <StyledPressable
                        color="primary"
                        className="py-1 rounded-sm"
                        textVariant={{ color: "white" }}
                      >
                        Report
                      </StyledPressable>
                    </View>
                  </View>
                )}
              />
            </>
          ) : (
            <ActivityIndicator size="large" className="mt-8 self-center" />
          )
        }
      />
    </SettingsLayout>
  );
};
