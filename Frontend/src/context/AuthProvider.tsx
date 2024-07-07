import { createContext, useState, useEffect, ReactNode, FC } from "react";
import { NullUser, User } from "../api/types";
import { jwtDecode } from "jwt-decode";

type AuthContextType = {
  user: User;
  isUserLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  AuthLogin: () => void;
  AuthLogout: () => void;
}

const nullAuthContext: AuthContextType = {
  user: NullUser,
  isUserLoading: false,
  setUser: () => { },
  AuthLogin: () => { },
  AuthLogout: () => { },
};

const AuthContext = createContext<AuthContextType>(nullAuthContext);

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(NullUser);
  const [isUserLoading, setIsUserLoading] = useState<boolean>(true);


  function decodeAndSetUser() {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decodedUser: User = jwtDecode(token);
      setUser(decodedUser);
    } else {
      setUser(NullUser);
    }
    setIsUserLoading(false);
  }

  useEffect(() => {
    decodeAndSetUser();
  }, []);

  const AuthLogin = () => {
    decodeAndSetUser();
  };

  const AuthLogout = () => {
    localStorage.removeItem("accessToken");
    setUser(NullUser);
  };

  return (
    <AuthContext.Provider value={{ user, isUserLoading, setUser, AuthLogin, AuthLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
