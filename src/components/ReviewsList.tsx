import { View, FlatList, ActivityIndicator } from "react-native";
import { useScreenInfo } from "../hooks/useScreenInfo";
import { SmallReviewCard } from "./SmallReviewCard";
import { StyledText } from "./StyledText";
import { useUserReviews } from "../hooks/useUserReviews";

export const ReviewsList = ({ userId }: { userId: string }) => {
  const reviews = useUserReviews(userId);
  const { isPhone } = useScreenInfo();

  if (reviews.isLoading) {
    return <ActivityIndicator size="large" className="self-center mt-8" />;
  }

  return (
    <View>
      {!reviews.isFetched && (
        <ActivityIndicator size="large" className="self-center" />
      )}
      {reviews.isFetched && !!reviews.data && !reviews.data.length && (
        <StyledText className="mt-5">You have no reviews.</StyledText>
      )}
      {reviews.data && reviews.isFetched && !!reviews.data.length && (
        <FlatList
          data={reviews.data}
          // list dosen't scroll on web when overflow is visible
          style={isPhone ? { overflow: "visible" } : {}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="pb-4"
          renderItem={({ item }) => (
            <SmallReviewCard className="w-80 mr-4 min-w-48" review={item} />
          )}
        />
      )}
    </View>
  );
};
