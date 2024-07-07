import { Box } from "@mui/material";
import GamingPreferencesSection from "../sections/GamingPreferencesSection";
import PersonalDetailsSection from "../sections/PersonalDetailsSection";
import { useNavigate, useParams } from "react-router-dom";
import { getAccessTokenByUsername } from "../api/api.endpoints";
import { useEffect, useState, useContext } from "react";
import { NullUser, User } from "../api/types";
import Loading from "../components/Loading";
import NotFoundPage from "./NotFoundPage";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../context/AuthProvider";

const ProfilePage = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return <Loading />;
  }

  const { user } = authContext;

  const { username } = useParams();
  const navigate = useNavigate();

  const [profileUser, setProfileUser] = useState<User>(NullUser);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userNotFound, setUserNotFound] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (username === user.username) { // user typed his own name in /profile
        navigate("/dashboard");
      }
      if (username) {
        const result = await getAccessTokenByUsername(username);
        if (result.existError) {
          setUserNotFound(true);
        } else if (result.accessToken) {
          const user: User = jwtDecode(result.accessToken);
          setProfileUser(user);
        }
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (userNotFound) {
    return <NotFoundPage />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box className="flex flex-col items-center justify-center min-h-screen p-4">
      <Box className="mb-8">
        <PersonalDetailsSection user={profileUser} isEditable={false} />
      </Box>
      <Box>
        <GamingPreferencesSection user={profileUser} isEditable={false} />
      </Box>
    </Box>
  );
};

export default ProfilePage;
