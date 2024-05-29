import { View } from "react-native";
import { SettingsLayout } from "./components/SettingsLayout";
import { SettingsNavigation } from "./components/SettingsNavigation";
import { useUserSettings } from "../../hooks/useUserSettings";
import { FlatList } from "react-native-gesture-handler";
import { useMemo } from "react";
import { UserSettings } from "../../types";
import { Card, HorizontalDivider, StyledText } from "../../components";
import { RadioButtons } from "../../components/RadioButtons";
import { useUpdateUserSettings } from "../../hooks/useUpdateUserSettings";

export type SelectSettingProps = {
  title: string;
  description: string;
  settingField: keyof UserSettings;
  options: { label: string; selected: boolean; value: boolean }[];
};
const SelectSetting = ({
  title,
  description,
  options,
  settingField,
}: SelectSettingProps) => {
  const updateSettings = useUpdateUserSettings();
  return (
    <View className="py-8 px-4">
      <StyledText weight={600} xl2>
        {title}
      </StyledText>
      <StyledText lg color="gray65" className="mt-4">
        {description}
      </StyledText>
      <RadioButtons
        options={options}
        onSelect={(option) => {
          updateSettings.mutate({ [settingField]: option.value });
        }}
        className="mt-5"
      />
    </View>
  );
};

export const PrivacySettingsScreen = () => {
  const settings = useUserSettings();

  const settingsOptions: SelectSettingProps[] = useMemo(() => {
    if (!settings.data) {
      return [];
    }
    return [
      {
        title: "Review Visibility",
        description:
          "Control who can view your profile by choosing whether it's visible to others. ",
        settingField: "reviewsVisible",
        options: [
          {
            label: "Public",
            selected: settings.data.reviewsVisible,
            value: true,
          },
          {
            label: "Connections Only",
            selected: !settings.data.reviewsVisible,
            value: false,
          },
        ],
      },
      {
        title: "Identity Hiding Options",
        description:
          "Maintain anonymity by hiding your identity when posting reviews. ",
        settingField: "anonymous",
        options: [
          {
            label: "Submit Anonymously",
            selected: settings.data.anonymous,
            value: true,
          },
          {
            label: "Show My Identity",
            selected: !settings.data.anonymous,
            value: false,
          },
        ],
      },
    ];
  }, [settings.data]);

  return (
    <SettingsLayout canGoBack={true}>
      <>
        <Card
          className="mb-10"
          bodyComponent={
            <FlatList
              contentContainerClassName="p-6"
              ItemSeparatorComponent={() => (
                <View className="w-full px-4">
                  <HorizontalDivider />
                </View>
              )}
              data={settingsOptions}
              renderItem={({ item }) => <SelectSetting {...item} />}
            />
          }
        />

        <SettingsNavigation
          items={[
            { title: "Given Reviews", navTo: "Given reviews" },
            { title: "Received Reviews", navTo: "Received reviews" },
          ]}
        />
      </>
    </SettingsLayout>
  );
};
