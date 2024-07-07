import { AuthContext } from "../../context/AuthProvider";
import { useContext } from "react";
import NavBarLoggedin from "./NavBarLoggedin";
import NavBarLoggedout from "./NavBarLoggedout";
import { NullUser } from "../../api/types";
import Loading from "../Loading";

const Navbar = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <Loading />;
  }

  const { user } = authContext;

  return user === NullUser ? <NavBarLoggedout /> : <NavBarLoggedin />;
};

export default Navbar;
