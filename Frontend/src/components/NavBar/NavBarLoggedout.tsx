import { Home as HomeIcon, Login, Edit } from "@mui/icons-material";
import NavBarBase from "./NavBarBase";

const NavBarLoggedout = () => {
  const links = [
    { to: "/", icon: <HomeIcon />, label: "Home" },
    { to: "/login", icon: <Login />, label: "Sign In" },
    { to: "/sign-up", icon: <Edit />, label: "Sign Up" },
  ];

  return <NavBarBase links={links} />;
};

export default NavBarLoggedout;
