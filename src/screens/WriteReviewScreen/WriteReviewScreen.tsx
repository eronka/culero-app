import { View, ScrollView } from "react-native";
import {
  Card,
  GiveReviewCard,
  HorizontalDivider,
  SearchBar,
  StyledText,
  UserCard,
} from "../../components";
import { Icon } from "../../icons";
import { ConnectionReviewCard } from "../../components/ConnectionsReviewCard";
import { useState } from "react";
import { getSearchUserResult, sendFeedback } from "../../utils/api";
import { useScreenInfo } from "../../hooks/useScreenInfo";
import { DrawerHeader } from "../../components/headers/DrawerHeader";

export const WriteReviewScreen = () => {
  const { isPhone } = useScreenInfo();
  const [searchResult, setSearchResult] = useState<{
    isInitial: boolean;
    result: any[];
  }>({
    result: [],
    isInitial: true,
  });

  return (
    <ScrollView>
      <View className="p-4 md:p-9">
        <DrawerHeader title="Write a Review" iconProps={{ name: "review" }} />

        <View className="md:flex-row gap-4">
          <View className="basis-3/4">
            <Card
              className="py-6 px-3 md:px-9"
              headerComponent={
                <View className="md:w-2/3 mb-4">
                  <StyledText weight={500} xl2>
                    Search by Social Link
                  </StyledText>
                  <StyledText weight={400} className="mt-8 mb-2" color="gray33">
                    Enter the social link (LinkedIn, Twitter, GitHub, or
                    Instagram) of the person you want to review.
                  </StyledText>
                  <SearchBar
                    placeholder="Enter social link"
                    containerClassName="mt-2  bg-grayF7"
                    onSubmit={async (value) => {
                      if (!value) {
                        return;
                      }
                      const result = await getSearchUserResult(value);
                      console.log("search result is", result);
                      setSearchResult({ isInitial: false, result });
                    }}
                  />
                </View>
              }
              bodyComponent={
                !searchResult.isInitial ? (
                  <View>
                    <StyledText weight={500} lg color="gray39" className="mt-2">
                      Search result:
                    </StyledText>
                    {searchResult.result.length > 0 && (
                      <>
                        <UserCard
                          className="mt-2"
                          connection={searchResult.result[0]}
                        />
                        <GiveReviewCard
                          className="md:mt-8"
                          isWhiteBg={true}
                          onSubmit={(values) => {
                            sendFeedback(searchResult.result[0].id, values);
                          }}
                        />
                      </>
                    )}
                  </View>
                ) : undefined
              }
            />
          </View>
          <ConnectionReviewCard
            expandable={false}
            className="md:basis-1/4"
            title="Suggested Profiles for Review"
            subtitle="Consider writing reviews for connections you've collaborated with recently."
          />
        </View>
      </View>
    </ScrollView>
  );
};
