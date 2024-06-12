import { ActivityIndicator, ScrollView, View } from "react-native";
import { DrawerHeader } from "../../components/headers/DrawerHeader";
import { IconButton } from "../../components/IconButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ConnectionStackParamList } from "../../types";
import {
  GiveReviewCard,
  OverallRateCard,
  ReviewCard,
  StyledText,
  UserCard,
} from "../../components";
import { useUserReviews } from "../../hooks/useUserReviews";
import { useUserRatings } from "../../hooks/useUserRatings";
import { useConnection } from "../../hooks/useConnection";
import { useMemo } from "react";

export const ConnectionScreen = (
  props: NativeStackScreenProps<ConnectionStackParamList, "Connection">
) => {
  const navigation = useNavigation();
  const user = useConnection(props.route.params.userId);
  const avgs = useUserRatings(props.route.params.userId);
  const reviews = useUserReviews(props.route.params.userId);
  const displayUser = useMemo(() => {
    if (user.data) {
      return user.data;
    }
    return props.route.params.user;
  }, [user.data, props.route.params.user]);

  return (
    <ScrollView>
      <View className="p-4 md:p-9">
        <DrawerHeader
          leftIcon={
            <IconButton
              iconProps={{ name: "back", size: 24 }}
              onPress={() => navigation.goBack()}
            />
          }
          title="Connections"
          iconProps={{ name: "user-group", color: "black" }}
        />

        <View className="" style={{ maxWidth: 850 }}>
          {displayUser && <UserCard connection={displayUser} />}

          {avgs.isFetched &&
            avgs.data &&
            avgs.data.professionalism +
              avgs.data.communication +
              avgs.data.reliability !==
              0 && (
              <OverallRateCard
                className="mt-2"
                professionalismRating={avgs.data.professionalism}
                communicationRating={avgs.data.communication}
                reliabilityRating={avgs.data.reliability}
              />
            )}
          <View className="mt-2 md:mt-10">
            <GiveReviewCard isWhiteBg={false} ratedUser={displayUser} />

            {reviews.isFetched && reviews.data && (
              <View className="mt-4">
                <StyledText
                  weight={600}
                  xl2
                >{`All reviews (${reviews.data.length})`}</StyledText>
                <View>
                  {reviews.data.map((review, index) => (
                    <ReviewCard
                      className="mt-4"
                      key={`review-${index}`}
                      review={review}
                    />
                  ))}
                </View>
              </View>
            )}
            {!!(avgs.isLoading || reviews.isLoading) && (
              <ActivityIndicator size="large" className="self-center mt-5" />
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
