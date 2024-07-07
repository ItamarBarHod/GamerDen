import PreferencesSection from "./PreferencesSection";
import { UserPreferences } from "../api/types";

type Props = {
  buttonLabel: string;
  onSubmitClick: (userPreferences: UserPreferences) => void;
  userPref: UserPreferences;
};

const SearchPartnersSection = ({ buttonLabel, onSubmitClick, userPref }: Props) => {
  return (
    <PreferencesSection
      buttonLabel={buttonLabel}
      onSubmitClick={onSubmitClick}
      userPref={userPref}
      useExistingButton={true}
    />
  );
};

export default SearchPartnersSection;
