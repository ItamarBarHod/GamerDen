import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Rating,
  Divider,
  Chip,
} from "@mui/material";
import { Chat, Gamepad, Person } from "@mui/icons-material";
import { FaDiscord } from "react-icons/fa";
import { IoMdMale, IoMdFemale } from "react-icons/io";
import { User, Gender } from "../api/types";
import { useState } from "react";
import GamesList from "./GamesList";

type Props = {
  user: User;
};

const UserCard = ({ user }: Props) => {
  const [chatClick, setChatClick] = useState<boolean>(false);

  const handleStartChatClick = () => {
    setChatClick(true);
  };

  const calculateAge = (dob: Date): number => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const getRating = (): number => {
    return user.rating && user.rating_count
      ? user.rating / user.rating_count
      : 0;
  };

  return (
    <Card
      className="backdrop-blur-sm w-[325px] min-w-[325px] m-4 flex flex-col"
      sx={{
        background: "rgba(255, 255, 255, 0.8)",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.8)",
        borderRadius: 4,
      }}

    >
      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        {/* grid of the avatar and user personal details - Container */}
        <Grid container spacing={2} alignItems="center">
          {/* avatar Grid - item */}
          <Grid item>
            <Link to={`/profile/${user.username}`}>
              <Avatar>
                {user.avatar ? (
                  <img src={`${user.avatar}`} alt="Avatar" />
                ) : (
                  <Person />
                )}
              </Avatar>
            </Link>
          </Grid>
          {/* username, gender, age, country Grid - item */}
          <Grid item>
            <Typography variant="h6" color="primary">
              <Link to={`/profile/${user.username}`} className="no-underline">
                {user.username}
              </Link>
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {user.gender === Gender.Male ? (
                <IoMdMale color="blue" size={20} className="mr-2" />
              ) : (
                <IoMdFemale color="pink" size={20} className="mr-2" />
              )}
              <Typography>
                {calculateAge(user.dob ? user.dob : new Date(0))}
              </Typography>
              <Typography sx={{ ml: 1 }}>{user.country}</Typography>
            </Box>
          </Grid>
        </Grid>
        {/* bio Box */}
        <Box mt={2}>
          <Typography variant="body1">
            <strong>Bio:</strong> {user.bio || "No bio available"}
          </Typography>
        </Box>
        <Divider sx={{ marginTop: 1 }} >
          <Chip
            icon={<Gamepad />}
            label="Games:"
            sx={{
              backgroundColor: 'transparent',
              color: 'primary.main',
            }}
          />
        </Divider>
        {/* games Box */}
        <Box>
          <GamesList games={user.preferences.games} initialSlice={3} />
        </Box>
      </CardContent>
      <Divider sx={{ margin: 2 }} />
      <Box
        mt="auto"
        textAlign="center"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Rating
          name="user-rating"
          value={getRating()}
          precision={0.1}
          readOnly
          sx={{ mb: 1 }}
        />
        {chatClick ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={1}
            borderRadius={1}
            bgcolor="info.main"
            color="text.primary"
            width="100%"
            sx={{ mt: 2 }}
          >
            <FaDiscord className="text-white text-2xl mr-2" />
            <Typography variant="body1" fontWeight="bold" color="white">
              {user.discord}
            </Typography>
          </Box>
        ) : (
          <Button
            variant="contained"
            color="primary"
            startIcon={<Chat />}
            onClick={handleStartChatClick}
            sx={{ mt: 1, mb: 2 }}
          >
            Start Chatting
          </Button>
        )}
      </Box>
    </Card>
  );
};

export default UserCard;
