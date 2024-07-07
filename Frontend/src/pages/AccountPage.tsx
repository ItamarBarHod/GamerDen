import { Box } from "@mui/material";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import GamingPreferencesSection from "../sections/GamingPreferencesSection";
import PersonalDetailsSection from "../sections/PersonalDetailsSection";
import Loading from "../components/Loading";

const AccountPage = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <Loading />;
  }

  const { user } = authContext;

  return (
    <Box className="flex flex-col items-center justify-center min-h-screen p-4">
      <Box className="mb-8">
        <PersonalDetailsSection user={user} isEditable={true} />
      </Box>
      <Box>
        <GamingPreferencesSection user={user} isEditable={true} />
      </Box>
    </Box>
  );
};

export default AccountPage;
