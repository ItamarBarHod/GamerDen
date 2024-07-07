import { UserPreferences } from "../api/types";
import PreferencesSection from "./PreferencesSection";

type Props = {
  buttonLabel: string;
  onSubmitClick: (userPreferences: UserPreferences) => void;
  userPref: UserPreferences;
};

const EditGamingPreferencesSection = ({
  buttonLabel,
  onSubmitClick,
  userPref,
}: Props) => {

  return (
    <PreferencesSection
      buttonLabel={buttonLabel}
      onSubmitClick={onSubmitClick}
      userPref={userPref}
      useExistingPreferences={false}
      useExistingButton={false}
    />
  );
};

export default EditGamingPreferencesSection;
