import { View, FlatList, ActivityIndicator } from "react-native";
import { useScreenInfo } from "../hooks/useScreenInfo";
import { useSelfReviews } from "../hooks/useSelfReviews";
import { SmallReviewCard } from "./SmallReviewCard";
import { StyledText } from "./StyledText";

export const ReviewsList = () => {
  const reviews = useSelfReviews();
  const { isPhone } = useScreenInfo();

  if (reviews.isLoading) {
    return <ActivityIndicator size="large" className="self-center mt-8" />;
  }

  return (
    <View>
      <FlatList
        data={reviews.data}
        ListEmptyComponent={
          <View className="flex">
            <StyledText>You have no reviews.</StyledText>
          </View>
        }
        // list dosen't scroll on web when overflow is visible
        style={isPhone ? { overflow: "visible" } : {}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="pb-4"
        renderItem={({ item }) => (
          <SmallReviewCard
            className="w-80 mr-4 min-w-48"
            professionalismRating={item.professionalism}
            communicationRating={item.communication}
            reliabilityRating={item.reliability}
            userName={item.userName}
            userImage={item.profilePictureUrl}
            isUserVerified={item.isEmailVerified}
            isAnonymous={item.isAnonymous}
            // TODO: Add property after it is implement on the backend
            isFavourite={false}
          />
        )}
      />
    </View>
  );
};
