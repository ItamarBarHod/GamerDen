import { useContext } from 'react';
import { AuthContext } from "../../context/AuthProvider";
import { Home as HomeIcon, AccountCircle as AccountCircleIcon } from "@mui/icons-material";
import { MdLogout } from "react-icons/md";
import NavBarBase from './NavBarBase';

const NavBarLoggedin = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <div>Loading...</div>;
  }

  const { AuthLogout } = authContext;

  const links = [
    { to: "/dashboard", icon: <HomeIcon />, label: "Home" },
    { to: "/account", icon: <AccountCircleIcon />, label: "Profile" },
    { to: "/", icon: <MdLogout />, label: "Logout", onClick: AuthLogout },
  ];

  return <NavBarBase links={links} />;
};

export default NavBarLoggedin;
