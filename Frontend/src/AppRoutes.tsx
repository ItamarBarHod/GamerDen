import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthProvider";
import Login from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignUp from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import AccountPage from "./pages/AccountPage";
import EditGamingPreferencesPage from "./pages/EditGamingPreferencesPage";
import EditPersonalDetailsPage from "./pages/EditPersonalDetailsPage";
import Background from "./components/Background";
import NavBar from "./components/NavBar/NavBar";
import { Box, ThemeProvider } from "@mui/material";
import ProfilePage from "./pages/ProfilePage";
import Loading from "./components/Loading";
import { NullUser } from "./api/types";
import theme from "./components/Theme";

const AppRoutes = () => {
  const authContext = useContext(AuthContext);

  const { isUserLoading, user } = authContext;

  if (isUserLoading) {
    return <Loading />;
  }

  return (
    <Background>
      <ThemeProvider theme={theme}>
        <NavBar />
        <Box className="overflow-auto h-screen w-screen">
          <Routes>
            <Route path="/" element={user === NullUser ? <HomePage /> : <Navigate to="/dashboard" />} />
            <Route path="/login" element={user === NullUser ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="/sign-up" element={user === NullUser ? <SignUp /> : <Navigate to="/dashboard" />} />
            <Route path="/account" element={user === NullUser ? <Navigate to="/login" /> : <AccountPage />} />
            <Route path="/edit-personal-details" element={user === NullUser ? <Navigate to="/login" /> : <EditPersonalDetailsPage />} />
            <Route path="/edit-gaming-preferences" element={user === NullUser ? <Navigate to="/login" /> : <EditGamingPreferencesPage />} />
            <Route path="/dashboard" element={user === NullUser ? <Navigate to="/login" /> : <Dashboard />} />
            <Route path="/profile/:username" element={user === NullUser ? <Navigate to="/login" /> : <ProfilePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Box>
      </ThemeProvider>
    </Background>
  );
};

export default AppRoutes;
