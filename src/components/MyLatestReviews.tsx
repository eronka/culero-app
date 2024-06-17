import { ActivityIndicator, FlatList, View } from "react-native";
import { useUser } from "../hooks";
import { useUserReviews } from "../hooks/useUserReviews";
import { Card } from "./Card";
import { StyledText } from "./StyledText";
import { useScreenInfo } from "../hooks/useScreenInfo";
import { SmallReviewCard } from "./SmallReviewCard";
import { useEffect, useMemo } from "react";
import { usePlatformWideReviews } from "../hooks/usePlatformWideReviews";

export const MyLatestReviews = ({
  allowPlatformWideReviews = true,
}: {
  allowPlatformWideReviews?: boolean;
}) => {
  const me = useUser()!;
  const userReviews = useUserReviews(me.id);
  const platformWideReviews = usePlatformWideReviews();
  const { isPhone } = useScreenInfo();

  useEffect(() => {
    if (
      userReviews.isFetched &&
      userReviews.data &&
      userReviews.data.length == 0 &&
      !platformWideReviews.isFetched
    ) {
      platformWideReviews.refetch();
    }
  }, [userReviews.data, userReviews.isFetched, platformWideReviews.isFetched]);

  const displayLoading = useMemo(() => {
    if (!userReviews.isFetched) {
      return true;
    }
    if (
      userReviews.data &&
      userReviews.data.length === 0 &&
      allowPlatformWideReviews &&
      !platformWideReviews.isFetched
    ) {
      return true;
    }

    return false;
  }, [
    userReviews.data,
    userReviews.isFetched,
    allowPlatformWideReviews,
    platformWideReviews.isFetched,
  ]);

  const body = useMemo(() => {
    if (displayLoading) {
      return <ActivityIndicator size="large" className="self-center" />;
    }

    let reviews = userReviews.data! || [];

    if (!reviews.length && allowPlatformWideReviews) {
      reviews = platformWideReviews.data! || [];
    }

    if (!reviews.length) {
      return <StyledText className="mt-5">No reviews to display.</StyledText>;
    }

    return (
      <FlatList
        data={reviews}
        // list dosen't scroll on web when overflow is visible
        style={isPhone ? { overflow: "visible" } : {}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="pb-4"
        renderItem={({ item }) => (
          <SmallReviewCard className="w-80 mr-4 min-w-48" review={item} />
        )}
      />
    );
  }, [displayLoading, userReviews.data]);

  return (
    <Card
      bodyComponent={<View>{body}</View>}
      hideHeaderDivider
      headerComponent={
        <StyledText xl2 weight={500}>
          {userReviews.isLoading || platformWideReviews.data?.length
            ? "Latest reviews"
            : "My latest reviews"}
        </StyledText>
      }
    />
  );
};
