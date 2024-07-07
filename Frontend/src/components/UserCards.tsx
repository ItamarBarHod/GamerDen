import { Box } from "@mui/material";
import UserCard from "./UserCard";
import { User } from "../api/types";

type props = {
  users: User[];
}

const UserCards = ({ users }: props) => {
  return (
    <Box className="flex flex-wrap justify-center gap-5 mb-40">
      {users.map((user, i) => (
        <UserCard key={i} user={user} />
      ))}
    </Box>
  );
};

export default UserCards;
