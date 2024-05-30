import { View, ScrollView, ActivityIndicator } from "react-native";
import {
  Card,
  GiveReviewCard,
  NewUserCard,
  SearchBar,
  StyledText,
  UserCard,
} from "../../components";
import { ConnectionReviewCard } from "../../components/ConnectionsReviewCard";
import { useState } from "react";
import { searchByUserLink } from "../../utils/api";
import { useScreenInfo } from "../../hooks/useScreenInfo";
import { DrawerHeader } from "../../components/headers/DrawerHeader";
import { useQueryClient } from "@tanstack/react-query";
import { AuthType, Connection } from "../../types";
import { Icon } from "../../icons";

export const WriteReviewScreen = () => {
  const queryClient = useQueryClient();
  const [searchResult, setSearchResult] = useState<{
    isInitial: boolean;
    result?: Connection;
    isLoading: boolean;
    error?: boolean;
  }>({
    result: undefined,
    isInitial: true,
    error: false,
    isLoading: false,
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

                      try {
                        setSearchResult({ isInitial: false, isLoading: true });
                        const data = await queryClient.fetchQuery({
                          queryKey: ["search-connection", value],
                          queryFn: () => searchByUserLink(value),
                        });
                        setSearchResult({
                          isInitial: false,
                          result: data,
                          isLoading: false,
                        });
                      } catch (error) {
                        setSearchResult({
                          error: true,
                          isLoading: false,
                          result: undefined,
                          isInitial: false,
                        });
                      }
                    }}
                  />
                </View>
              }
              bodyComponent={
                !searchResult.isInitial ? (
                  <View>
                    <StyledText weight={500} lg color="gray39" className="my-2">
                      Search result:
                    </StyledText>
                    {searchResult.isLoading && (
                      <ActivityIndicator className="self-center" />
                    )}
                    {searchResult.result && !searchResult.isLoading && (
                      <>
                        {(searchResult.result.authType as unknown as string) !==
                        "EXTERNAL" ? (
                          <UserCard
                            className="mt-2"
                            connection={searchResult.result}
                          />
                        ) : (
                          <NewUserCard
                            className="mt-2"
                            connection={searchResult.result}
                          />
                        )}
                        <GiveReviewCard
                          className="md:mt-8"
                          isWhiteBg={true}
                          ratedUser={searchResult.result}
                        />
                      </>
                    )}
                    {!searchResult.result && !searchResult.isLoading && (
                      <View className="items-center my-4">
                        <Icon name="user-not-found" />
                        <StyledText
                          color="light-primary"
                          weight={900}
                          xl6
                          className="my-6"
                        >
                          No result found
                        </StyledText>
                        <StyledText color="gray33">
                          We couldn’t find what you searched for.
                        </StyledText>
                        <StyledText color="gray33">
                          Try searching again
                        </StyledText>
                      </View>
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
