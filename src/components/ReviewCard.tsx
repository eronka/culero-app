import { Alert, Pressable, View, ViewProps } from "react-native";
import { Card } from "./Card";
import { StyledText } from "./StyledText";
import { Avatar } from "./Avatar";
import { StyledStarRating } from "./StarRating";
import { FavouriteButton } from "./FavouriteButton";
import { IconButton } from "./IconButton";
import { twMerge } from "tailwind-merge";
import { useAvgRating } from "../hooks/useAvgRating";
import { useLikeReview } from "../hooks/useLikeReview";
import { useUnlikeReview } from "../hooks/useUnlikeReview";
import { Review } from "../types/Review";
import { useNavToConnection } from "../hooks/useNavToConnection";

export type RatingCardProps = {
  review: Review;
  className?: ViewProps["className"];
};

const Rating = ({ category, value }: { category: string; value: number }) => {
  return (
    <View className="flex-row md:flex-col items-center justify-between">
      <StyledText weight={600} color="darkgrey">
        {category}
      </StyledText>
      <StyledText weight={700} xl2>
        {value.toFixed(1)}
      </StyledText>
    </View>
  );
};

export const ReviewCard = ({ className, review }: RatingCardProps) => {
  const overallRating = useAvgRating(review);
  const likeReviewMutation = useLikeReview();
  const unlikeReviewMutation = useUnlikeReview();
  const connectionNav = useNavToConnection();

  return (
    <Card
      className={twMerge("px-9 py-4", className)}
      headerComponent={
        <View className="flex-row justify-between p-2 items-center pb-4">
          <Pressable
            className="flex-row"
            disabled={review.isAnonymous}
            onPress={() => {
              if (review.postedBy?.id) {
                connectionNav.navigate(review.postedBy.id);
              }
            }}
          >
            <Avatar
              userImage={review.postedBy?.profilePictureUrl}
              isAnonymous={review.isAnonymous}
            />
            <View className="ml-2">
              <StyledText weight={700} className="text-3xl">
                {overallRating.toLocaleString("en", {
                  maximumFractionDigits: 1,
                })}
                <StyledText
                  weight={300}
                  className="text-lg"
                >{`/ 5`}</StyledText>
              </StyledText>

              <StyledStarRating readonly startingValue={overallRating} />
            </View>
          </Pressable>
          {!review.isOwnReview && (
            <View className="flex-row items-center">
              <FavouriteButton
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
              <IconButton iconProps={{ name: "message" }} className="ml-4" />
            </View>
          )}
        </View>
      }
      bodyComponent={
        <View className="md:flex-row my-8">
          <View>
            <StyledText color="darkgrey">Review:</StyledText>
          </View>
          <View className="flex-auto md:px-4">
            <StyledText weight={500}>{review.comment}</StyledText>
          </View>
        </View>
      }
      footerComponent={
        <View className="mt-4">
          <View className="md:flex-row justify-around">
            <Rating category="Professionalism" value={review.professionalism} />
            <Rating category="Reliability" value={review.reliability} />
            <Rating category="Communication" value={review.communication} />
          </View>
          <View>
            <StyledText
              color="gray83"
              className="text-xs text-right mt-4"
            >{`Posted on: ${new Date(
              review.createdAt
            ).toLocaleDateString()}`}</StyledText>
          </View>
        </View>
      }
    />
  );
};
