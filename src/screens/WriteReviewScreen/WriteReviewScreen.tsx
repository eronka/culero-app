import { View, ScrollView } from "react-native";
import {
  Card,
  GiveReviewCard,
  SearchBar,
  StyledText,
  UserCard,
} from "../../components";
import { Icon } from "../../icons";
import { ConnectionReviewCard } from "../../components/ConnectionsReviewCard";

export const WriteReviewScreen = () => {
  return (
    <ScrollView>
      <View className="p-9">
        <View className="flex-row">
          <StyledText lg weight={600} xl4>
            Write a Review
          </StyledText>
          <Icon name="review" className="ml-4" size={30} />
        </View>

        <View className="flex-row gap-4 mt-12">
          <Card
            className="basis-3/4 py-6 px-9"
            headerComponent={
              <View className="w-2/3 mb-4">
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
                  onSubmit={(value) => console.log("Seach with ", value)}
                />
              </View>
            }
            bodyComponent={
              <View>
                <StyledText weight={500} lg color="gray39" className="mt-2">
                  Search result:
                </StyledText>
                <UserCard
                  className="mt-2"
                  userName="Logan Davis"
                  userPosition="UX designer"
                  isVerified={true}
                  revewisCount={20}
                  connectionsCount={100}
                  joinedDate={new Date()}
                  userAvatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
                <GiveReviewCard
                  className="hidden md:block mt-8"
                  isWhiteBg={true}
                />
              </View>
            }
          />
          <ConnectionReviewCard
            expandable={false}
            className="basis-1/4"
            title="Suggested Profiles for Review"
            subtitle="Consider writing reviews for connections you've collaborated with recently."
          />
        </View>
      </View>
    </ScrollView>
  );
};
