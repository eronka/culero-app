import { Card } from "../../components";
import { SettingsLayout } from "./components/SettingsLayout";
import { SettingsNavigation } from "./components/SettingsNavigation";

export const SettingsScreen = () => {
  return (
    <SettingsLayout>
      <SettingsNavigation
        items={[
          { title: "Account Settings", navTo: "Account Settings" },
          { title: "Privacy / Reviews Management", navTo: "Privacy" },
        ]}
      />
    </SettingsLayout>
  );
};
