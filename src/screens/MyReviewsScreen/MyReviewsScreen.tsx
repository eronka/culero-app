import { View, ScrollView, ActivityIndicator } from "react-native";
import React from "react";
import { DrawerHeader } from "../../components/headers/DrawerHeader";
import { OverallRateCard, ReviewCard, StyledText } from "../../components";
import { useScreenInfo } from "../../hooks/useScreenInfo";
import { useUser } from "../../hooks";
import { useUserReviews } from "../../hooks/useUserReviews";
import { useUserRatings } from "../../hooks/useUserRatings";

export const MyReviewsScreen = ({}: {}) => {
  const user = useUser()!;
  const reviews = useUserReviews(user.id);
  const rating = useUserRatings(user.id);

  const { isPhone } = useScreenInfo();

  return (
    <ScrollView>
      <View className="p-4 md:p-9">
        <DrawerHeader
          title="My Reviews"
          iconProps={{ name: "user-star", color: "black" }}
        />
        {rating.isLoading && (
          <ActivityIndicator size="large" className="self-center" />
        )}
        {!rating.isLoading && !rating.data?.professionalism && (
          <View>
            <StyledText>You have no reviews</StyledText>
          </View>
        )}
        {!rating.isLoading && rating.data && rating.data.professionalism && (
          <View style={{ maxWidth: 831 }}>
            <OverallRateCard
              professionalismRating={rating.data.professionalism}
              communicationRating={rating.data.communication}
              reliabilityRating={rating.data.reliability}
            />
            {reviews.isFetched && reviews.data && (
              <>
                <StyledText
                  className="ml-4 mt-2"
                  weight={600}
                  xl2={!isPhone}
                >{`${reviews.data.length} Reviews`}</StyledText>
                <View>
                  {reviews.data.map((review, index) => (
                    <ReviewCard
                      className="mt-4"
                      key={`review-${index}`}
                      review={review}
                    />
                  ))}
                </View>
              </>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};
