import { User, UserPreferences } from "../api/types";
import SearchPartnersSection from "../sections/SearchPartnersSection";
import { AuthContext } from "../context/AuthProvider";
import { useContext, useState } from "react";
import UserCards from "../components/UserCards";
import { Box, Typography } from "@mui/material";
import Loading from "../components/Loading";
import { findMatchingUsers } from "../api/api.endpoints";

const Dashboard = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <Loading />;
  }

  const { user } = authContext;
  const [hasMatch, setHasMatch] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);

  const handleSearchClick = async (preferences: UserPreferences) => {
    const tempPref: UserPreferences = user.preferences;
    user.preferences = preferences;
    const result = await findMatchingUsers(user);
    if (result.users) {
      setUsers(result.users);
      setHasMatch(true);
    } else {
      setUsers([]);
      setHasMatch(false);
    }
    user.preferences = tempPref;
  };

  return (
    <Box>
      <SearchPartnersSection
        buttonLabel="Search Partners"
        onSubmitClick={handleSearchClick}
        userPref={user.preferences}
      />
      {hasMatch ? (
        <UserCards users={users} />
      ) : (
        <Typography>Not found</Typography>
      )}
    </Box>
  );
};

export default Dashboard;
