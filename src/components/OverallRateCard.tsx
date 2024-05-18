import { View, ViewProps } from "react-native";
import { Card } from "./Card";
import { StyledText } from "./StyledText";
import { CategoryRating } from "./CategoryRating";
import { twMerge } from "tailwind-merge";
import { useScreenInfo } from "../hooks/useScreenInfo";

export type OverallRateCardProps = {
  maxRating?: number;
  professionalismRating: number;
  reliabilityRating: number;
  communicationRating: number;
  className?: ViewProps["className"];
  barsContainerClassName?: ViewProps["className"];
};

export const OverallRateCard = ({
  maxRating = 5,
  communicationRating,
  professionalismRating,
  reliabilityRating,
  className,
  barsContainerClassName,
}: OverallRateCardProps) => {
  const { isPhone } = useScreenInfo();
  const overallRating =
    (communicationRating + professionalismRating + reliabilityRating) / 3;

  return (
    <Card
      className={twMerge("border border-primary md:border-none", className)}
      bodyComponent={
        <View className="p-4 md:flex-row md:items-center">
          <View className="md:align-center md:justify-center">
            <StyledText
              weight={700}
              center={!isPhone}
              xl6={!isPhone}
              xl3={isPhone}
            >
              {overallRating.toLocaleString("en", {
                maximumFractionDigits: 1,
              })}
              <StyledText weight={500} xl2>{`/${maxRating}`}</StyledText>
            </StyledText>
            <StyledText weight={500} color="nickel" xl2={!isPhone}>
              Overall Rate
            </StyledText>
          </View>
          <View
            className={twMerge(
              "flex-grow md:ml-10 mt-4 md:mt-0",
              barsContainerClassName
            )}
          >
            <CategoryRating
              height={isPhone ? 15 : 20}
              categoryName="Professionalsim"
              rating={professionalismRating}
            />
            <CategoryRating
              className="my-2"
              height={isPhone ? 15 : 20}
              categoryName="Reliability"
              rating={reliabilityRating}
            />
            <CategoryRating
              height={isPhone ? 15 : 20}
              categoryName="Communication"
              rating={communicationRating}
            />
          </View>
        </View>
      }
    />
  );
};
