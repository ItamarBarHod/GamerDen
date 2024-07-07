import { Avatar, Box, Typography, Button, Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Person } from "@mui/icons-material";
import { Gender, User } from "../api/types";
import { IoMdMale, IoMdFemale } from "react-icons/io";
import { FaLanguage } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import { FaDiscord } from "react-icons/fa";
import Loading from "../components/Loading";

type Props = {
  isEditable: boolean;
  user: User;
};

const PersonalDetailsSection = ({ user, isEditable }: Props) => {

  if (!user) {
    return <Loading />;
  }

  const navigate = useNavigate();

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

  function getRating(): number {
    if (user.rating && user.rating_count) {
      return user.rating / user.rating_count;
    }
    return 0;
  }

  const handleEditPersonalDetails = () => {
    navigate("/edit-personal-details");
  };

  return (
    <Box
      className="flex justify-start items-center p-4 mt-5"
      sx={{
        background: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(5px)",
        borderRadius: 10,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
        width: "600px",
        mb: 1,
      }}
    >
      <Avatar sx={{ width: 200, height: 200, mr: 2 }}>
        {user.avatar ? (
          <Box
            component="img"
            src={`${user.avatar}`}
            className="w-full h-full"
          />
        ) : (
          <Person sx={{ width: "95%", height: "95%" }} />
        )}
      </Avatar>

      <Box flex="1">
        <Typography variant="h6" fontSize={40}>
          {user.username}
        </Typography>
        <Typography variant="body2" marginBottom={2}>
          {user.bio}
        </Typography>

        {/* Gender, Age, Country */}
        <Box className="flex justify-start items-center flex-row flex-wrap pr-2 mb-2">
          {user.gender === Gender.Male ? (
            <IoMdMale className="size-6 text-blue-700 mr-2" />
          ) : (
            <IoMdFemale className="size-6 text-pink-400 mr-2" />
          )}
          <Typography variant="h6" marginRight={1}>
            {calculateAge(user.dob ? user.dob : new Date(0))}
          </Typography>
          <Typography variant="h6">{user?.country}</Typography>
        </Box>
        {/* Languages */}
        <Box className="flex justify-start items-center flex-row flex-wrap mb-2">
          <FaLanguage className="mr-2" size={30} />
          <Typography>{user.languages.join(", ")}</Typography>
        </Box>
        {/* Discord */}
        <Box className="flex justify-start items-center flex-row flex-wrap mb-2">
          <FaDiscord className="mr-2" size={30} />
          <Typography>{user.discord}</Typography>
        </Box>
        <Box marginBottom={2}>
          <Rating
            name="user-rating"
            value={getRating()}
            precision={0.1}
            readOnly
          />
        </Box>
        {isEditable && (
          <Button
            startIcon={<MdModeEditOutline />}
            variant="contained"
            size="medium"
            onClick={handleEditPersonalDetails}
          >
            Edit Profile
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default PersonalDetailsSection;
