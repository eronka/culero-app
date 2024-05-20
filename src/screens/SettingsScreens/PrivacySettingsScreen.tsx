import { SettingsLayout } from "./components/SettingsLayout";
import { SettingsNavigation } from "./components/SettingsNavigation";

export const PrivacySettingsScreen = () => {
  return (
    <SettingsLayout canGoBack={true}>
      <>
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
