import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  Box,
  Grid,
  Typography,
  TextField,
} from "@mui/material";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import { useRef, useState, useContext } from "react";
import { login } from "../api/api.endpoints";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import Loading from "../components/Loading";
import { AuthContext } from "../context/AuthProvider";
import theme from "../components/Theme";

const LoginPage = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <Loading />;
  }
  const { AuthLogin } = authContext;

  const [hasError, setHasError] = useState<boolean>(false);
  const navigate = useNavigate();

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleLogin = async () => {
    if (usernameRef.current && passwordRef.current) {
      const result = await login(
        usernameRef.current.value,
        passwordRef.current.value
      );
      if (result.accessToken) {
        setHasError(false);
        AuthLogin();
        navigate("/dashboard");
      } else {
        setHasError(true);
      }
    }
  };

  return (
    <Box className="min-h-screen flex justify-center items-center">
      <Grid
        className="flex flex-col items-center justify-center p-6 bg-opacity-80 bg-white backdrop-blur-sm rounded-2xl max-w-md w-full"
        style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4)" }}
      >
        <Box className="flex flex-col items-center w-full">
          <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1, width: "80%" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              inputRef={usernameRef}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={passwordRef}
            />
            {hasError && (
              <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
                Invalid Username or Password.
              </Alert>
            )}
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Sign In
            </Button>
            <Box
              sx={{
                justifyContent: "flex-start",
                alignItems: "center",
                marginBottom: 2,
              }}
            >
              <Typography variant="body2">
                Don't have an account?&nbsp;
                <Link to="/sign-up" style={{ fontWeight: "bold" }}>
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default LoginPage;
