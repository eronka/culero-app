import { ScrollView, View } from "react-native";
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

export const ConnectionScreen = (
  props: NativeStackScreenProps<ConnectionStackParamList, "Connection">
) => {
  const navigation = useNavigation();
  const user = useConnection(props.route.params.userId);
  const avgs = useUserRatings(props.route.params.userId);
  const reviews = useUserReviews(props.route.params.userId);

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

        {user.isFetched && user.data && (
          <View className="" style={{ maxWidth: 850 }}>
            <UserCard connection={user.data} />
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
              <GiveReviewCard isWhiteBg={false} ratedUser={user.data} />

              {/* <Card
                className="border border-primary bg-transparent"
                bodyComponent={
                  <GiveReviewCard isWhiteBg={false} ratedUser={user.data} />
                }
              /> */}

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
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};
