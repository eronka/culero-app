import { Platform, Pressable, View, ViewProps } from "react-native";
import { Card, StyledText } from "../components";
import { Icon, IconName } from ".";
import { useMemo, useState } from "react";
import { SocialMediaModal } from "../components/SocialMediaModal";
import { useSocialAccounts } from "../hooks/useSocialAccounts";
import { SocialAccountType } from "../types/SocialAccount";

const StackedIcons = ({
  names,
  spacing = 26,
}: {
  names: Array<string>;
  spacing?: number;
}) => {
  return (
    <View
      style={{ height: 51, width: spacing * (names.length + 1) + names.length }}
    >
      {names.map((name, index) => (
        <View
          key={name}
          style={{
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
            left: index * spacing,
            top: 0,
            zIndex: index * 100,
            height: 51,
            width: 51,
            borderRadius: 300,
          }}
        >
          <Icon name={name as IconName} />
        </View>
      ))}
    </View>
  );
};

const availableSocialPlatforms: SocialAccountType[] = [
  SocialAccountType.GITHUB,
  SocialAccountType.FACEBOOK,
  SocialAccountType.LINKEDIN,
];

export type SocialMediaCardProps = {
  className?: ViewProps["className"];
};
export const SocialMediaCard = ({ className }: SocialMediaCardProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const socialAccounts = useSocialAccounts();

  const socials = availableSocialPlatforms.reduce(
    (acc, p) => {
      const socialFound = socialAccounts.data?.find((s) => s.platform === p);
      if (socialFound) {
        acc.added.push(p);
      } else {
        acc.toAdd.push(p);
      }
      return acc;
    },
    {
      added: [],
      toAdd: [],
    } as { added: SocialAccountType[]; toAdd: SocialAccountType[] }
  );

  console.log("socials", socials);
  return (
    <>
      <SocialMediaModal visible={isModalOpen} setVisibility={setModalOpen} />
      <Pressable onPress={() => setModalOpen(true)}>
        <Card
          className={className}
          bodyComponent={
            <View className="flex items-center">
              <StyledText className="text-lg text-center">
                Your Social Media
              </StyledText>
              {!!socials.added.length && (
                <View className="mt-8">
                  <StyledText className="text-md text-center mb-8">
                    Added
                  </StyledText>
                  <StackedIcons
                    names={socials.added.map((s) => `${s.toLowerCase()}-color`)}
                  />
                </View>
              )}
              {!!socials.toAdd.length && (
                <View className="mt-8">
                  <StyledText className="text-md text-center">
                    Add to Elevate
                  </StyledText>
                  <StyledText className="text-md text-center mb-4">
                    Your profile
                  </StyledText>
                  <View className="ml-4">
                    <StackedIcons
                      names={socials.toAdd.map(
                        (s) => `${s.toLowerCase()}-color`
                      )}
                    />
                  </View>
                </View>
              )}
            </View>
          }
        />
      </Pressable>
    </>
  );
};
