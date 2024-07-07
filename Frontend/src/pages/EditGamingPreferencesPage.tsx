
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import { UserPreferences } from "../api/types";
import { updateUser } from "../api/api.endpoints";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import PreferencesSection from "../sections/PreferencesSection";

const EditGamingPreferencesPage = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  if (!authContext) {
    return <Loading />
  }

  const { user, setUser } = authContext;

  const handleSaveClick = async (preferences: UserPreferences) => {
    user.preferences = preferences;
    const result = await updateUser(user);

    if (result.user) {
      setUser(result.user);
      navigate("/account");
    }
  };

  return (
    <PreferencesSection
      buttonLabel="Save Preferences"
      onSubmitClick={handleSaveClick}
      userPref={user.preferences}
      useExistingButton={false}
    />
  );
};

export default EditGamingPreferencesPage;
