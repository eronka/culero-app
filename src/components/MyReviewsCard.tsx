import { ActivityIndicator, View, ViewProps } from "react-native";
import { Card } from "./Card";
import { StyledText } from "./StyledText";
import { StyledStarRating } from "./StarRating";
import { CategoryRating } from "./CategoryRating";
import { useSelfRatings } from "../hooks/useSelfRatings";
import { twMerge } from "tailwind-merge";
import { useScreenInfo } from "../hooks/useScreenInfo";

export type MyReviewsCardProps = {
  className?: ViewProps["className"];
};

export const MyReviewsCard = ({ className }: MyReviewsCardProps) => {
  const rating = useSelfRatings();
  const { isPhone } = useScreenInfo();

  return (
    <Card
      className={twMerge("", className)}
      headerComponent={
        <View className="flex-row justify-between">
          <StyledText weight={600} xl2>
            My Reviews
          </StyledText>
          {!rating.isLoading && rating.data && rating.data.professionalism && (
            <View className="items-end">
              <StyledText weight={700} className="text-3xl">
                {(
                  (rating.data.communication +
                    rating.data.professionalism +
                    rating.data.reliability) /
                  3
                ).toLocaleString("en", {
                  maximumFractionDigits: 1,
                })}
                <StyledText
                  weight={300}
                  className="text-lg"
                >{`/ 5`}</StyledText>
              </StyledText>

              <StyledStarRating
                readonly
                startingValue={
                  (rating.data.communication +
                    rating.data.professionalism +
                    rating.data.reliability) /
                  3
                }
              />
            </View>
          )}
        </View>
      }
      hideHeaderDivider
      bodyComponent={
        <>
          {rating.isLoading && (
            <ActivityIndicator size="small" className="self-center mt-6" />
          )}
          {!rating.isLoading && !rating.data?.professionalism && (
            <StyledText className="mt-5">You have no reviews yet</StyledText>
          )}

          {!rating.isLoading && rating.data && rating.data.professionalism && (
            <View className="flex-grow mt-6">
              <CategoryRating
                height={isPhone ? 15 : 20}
                hideNumbers={true}
                categoryName="Professionalsim"
                rating={rating.data.professionalism}
              />
              <CategoryRating
                height={isPhone ? 15 : 20}
                className="md:my-6"
                hideNumbers={true}
                categoryName="Reliability"
                rating={rating.data.reliability}
              />
              <CategoryRating
                height={isPhone ? 15 : 20}
                hideNumbers={true}
                categoryName="Communication"
                rating={rating.data.communication}
              />
            </View>
          )}
        </>
      }
    />
  );
};
