import { Container, Typography, Link, Box } from '@mui/material';
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import Loading from '../components/Loading';

const NotFoundPage = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <Loading />
  }

  const { user } = authContext;

  return (
    <Box className="bg-gray-100 h-screen flex justify-center items-center">
      <Container>
        <Box className="flex flex-col items-center text-center">
          <Typography variant="h1" className="text-8xl font-bold text-gray-800">
            404
          </Typography>
          <Typography variant="h4" className="text-4xl font-medium text-gray-800">
            Page Not Found
          </Typography>
          <Link href={user ? "/dashboard" : "/"} className="mt-4 text-xl text-blue-600 hover:underline">
            Go back home
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFoundPage;
