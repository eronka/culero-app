import { ActivityIndicator, FlatList, View } from "react-native";
import {
  Card,
  GiveReviewCard,
  HorizontalDivider,
  StyledText,
} from "../../components";

import { SettingsLayout } from "./components/SettingsLayout";
import { useGivenReviews } from "../../hooks/useGivenReviews";
import { useReviewedUsers } from "../../hooks/useReviewedUsers";

export const GivenReviewsSettings = () => {
  const connections = useReviewedUsers();
  return (
    <SettingsLayout canGoBack={true}>
      <Card
        className="px-20"
        bodyComponent={
          connections.isFetched ? (
            <>
              <FlatList
                data={connections.data}
                ListEmptyComponent={() => (
                  <View>
                    <StyledText>You have no reviews yet</StyledText>
                  </View>
                )}
                ItemSeparatorComponent={() => <HorizontalDivider />}
                renderItem={({ item }) => (
                  <View className="py-9">
                    <GiveReviewCard ratedUser={item} />
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
