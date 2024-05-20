import { ScrollView, View } from "react-native";
import { DrawerHeader } from "../../components/headers/DrawerHeader";
import { IconButton } from "../../components/IconButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ConnectionStackParamList } from "../../types";
import { useGetUser, useUser } from "../../hooks";
import {
  Card,
  GiveReviewCard,
  OverallRateCard,
  ReviewCard,
  StyledText,
  UserCard,
} from "../../components";
import { useOtherUserAvg } from "../../hooks/useOtherUserAvg";
import { useUserReviews } from "../../hooks/useUserReviews";

export const ConnectionScreen = (
  props: NativeStackScreenProps<ConnectionStackParamList, "Connection">
) => {
  const navigation = useNavigation();
  const user = useGetUser(props.route.params.userId);
  const avgs = useOtherUserAvg(props.route.params.userId);
  const reviews = useUserReviews(props.route.params.userId);

  console.log(user.isFetched);

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
            <UserCard
              userName={user.data.name}
              userPosition={user.data.headline}
              isVerified={user.data.isEmailVerified}
              userAvatar={user.data.profilePictureUrl}
              revewisCount={user.data.ratingsCount}
              connectionsCount={user.data.connectionsCount}
              isConnection={user.data.isConnection}
              joinedDate={new Date(user.data.joinedAt)}
            />
            {avgs.isFetched &&
              avgs.data &&
              avgs.data.professionalism +
                avgs.data.communication +
                avgs.data.reliability && (
                <OverallRateCard
                  className="mt-2"
                  professionalismRating={avgs.data.professionalism}
                  communicationRating={avgs.data.communication}
                  reliabilityRating={avgs.data.reliability}
                />
              )}
            <View className="md:mt-10">
              <StyledText
                className="mb-2"
                weight={600}
                xl2
              >{`Do you know ${user.data.name}? Leave him a review`}</StyledText>
              <Card
                className="border border-primary bg-transparent"
                bodyComponent={
                  <GiveReviewCard
                    isWhiteBg={false}
                    onSubmit={(values) => {
                      console.log("values", values);
                    }}
                  />
                }
              />

              {reviews.isFetched && reviews.data && (
                <View className="md:mt-4">
                  <StyledText
                    weight={600}
                    xl2
                  >{`All reviews (${reviews.data.length})`}</StyledText>
                  <View>
                    {reviews.data.map((review, index) => (
                      <ReviewCard
                        className="mt-4"
                        key={`review-${index}`}
                        professionalismRating={review.professionalism}
                        reliabilityRating={review.reliability}
                        communicationRating={review.communication}
                        isFavourite={false}
                        isAnonymous={review.isAnonymous}
                        userImage={review.profilePictureUrl}
                        comment={review.comment}
                        date={new Date(review.createdOn)}
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
