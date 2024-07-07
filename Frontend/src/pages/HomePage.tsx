import { Link as Link } from "react-router-dom";
import {
  Avatar,
  Button,
  Box,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import { Login, Edit, VideogameAsset } from "@mui/icons-material";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import Loading from "../components/Loading";
import theme from "../components/Theme";

const HomePage = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return <Loading />
  }

  return (
    <Grid
      container
      component="main"
      className="min-h-screen flex justify-center items-center"
    >
      <Grid className="flex flex-col items-center justify-center p-6 bg-opacity-80 bg-white backdrop-blur-sm rounded-2xl max-w-2xl"
        style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)' }}
      >
        <Box className="flex flex-col items-center p-4"
        >
          <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
            <VideogameAsset />
          </Avatar>
          <Typography
            component="h1"
            variant="h4"
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            Welcome to GamerDen
          </Typography>
          <Typography
            component="h2"
            variant="h6"
            className="text-center mt-2"
          >
            Embark on your gaming journey with the perfect companion.
            <br />
            Discover your ideal gaming partner and elevate your gaming
            experience to new heights!
          </Typography>
          <Divider
            sx={{
              width: "100%",
              my: 3,
              backgroundColor: "primary.main",
              height: "3px",
            }}
          />
          <Box
            className="mt-6 w-full flex flex-col items-center gap-4"
          >
            <Link to="/login">
              <Button
                variant="contained"
                color="primary"
                startIcon={<Login />}
                sx={{ width: "150px" }}
              >
                Sign In
              </Button>
            </Link>
            <Link to="/sign-up">
              <Button
                variant="contained"
                color="primary"
                startIcon={<Edit />}
                sx={{ width: "150px" }}
              >
                Sign Up
              </Button>
            </Link>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default HomePage;
