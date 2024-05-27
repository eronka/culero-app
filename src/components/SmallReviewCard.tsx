import { Alert, View, ViewProps } from "react-native";
import { Card } from "./Card";
import { StyledText } from "./StyledText";
import { Avatar } from "./Avatar";
import { StyledStarRating } from "./StarRating";
import { FavouriteButton } from "./FavouriteButton";
import { CategoryRating } from "./CategoryRating";
import { IconButton } from "./IconButton";
import { twMerge } from "tailwind-merge";
import { Review } from "../types/Review";
import { Rating } from "../types/Rating";
import { useAvgRating } from "../hooks/useAvgRating";
import { useLikeReview } from "../hooks/useLikeReview";
import { useUnlikeReview } from "../hooks/useUnlikeReview";

export type SmallReviewCardProps = {
  className?: ViewProps["className"];
  review: Review;
};

export const SmallReviewCard = ({
  className,
  review,
}: SmallReviewCardProps) => {
  const overallRating = useAvgRating(review);
  const likeReviewMutation = useLikeReview();
  const unlikeReviewMutation = useUnlikeReview();

  return (
    <View className="py-6 px-3">
      <Card
        className={twMerge("shadow-xl", className)}
        bodyComponent={
          <View className="px-4">
            <IconButton
              className="self-end "
              iconProps={{ name: "dots-horizontal", color: "gray", size: 25 }}
              onPress={() => {
                Alert.alert("Settings");
              }}
            />
            <View className="flex justify-center items-center">
              <Avatar
                userImage={review?.postedBy?.profilePictureUrl}
                hasBadge={!review.isAnonymous}
                isAnonymous={review.isAnonymous}
                isVerified={review.postedBy?.isEmailVerified}
              />
              <StyledText weight={500} className="text-lg">
                {review.postedBy?.name || "Anonymous"}
              </StyledText>
              <StyledStarRating readonly startingValue={overallRating} />
            </View>
            <View className="flex-grow mt-4 mb-4">
              <CategoryRating
                hideBar={true}
                categoryName="Professionalsim"
                rating={review.professionalism}
              />
              <CategoryRating
                hideBar={true}
                categoryName="Reliability"
                rating={review.reliability}
              />
              <CategoryRating
                hideBar={true}
                categoryName="Communication"
                rating={review.communication}
              />
            </View>
          </View>
        }
        footerComponent={
          <View className="mt-4 flex-row justify-between items-center px-2">
            <FavouriteButton
              size={24}
              isFav={review.isFavorite}
              onPress={() => {
                if (!review.isFavorite) {
                  likeReviewMutation.mutate({
                    reviewId: review.id,
                    postedToId: review.postedToId,
                  });
                } else {
                  unlikeReviewMutation.mutate({
                    reviewId: review.id,
                    postedToId: review.postedToId,
                  });
                }
              }}
            />
            <IconButton iconProps={{ name: "message" }} onPress={() => {}} />
          </View>
        }
      />
    </View>
  );
};
