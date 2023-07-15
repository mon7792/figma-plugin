import { createContext, FC, useContext, useState, Context } from "react";
import { User } from "../type";

const defUser: User = {
  id: "def",
  name: "def",
  email: "def",
  authToken: "def",
};

type AuthContextProps = {
  authUser: User;
  setAuthUser: (user: User) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLogged: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

export const AuthContext = createContext<AuthContextProps>({
  authUser: defUser,
  setAuthUser: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const [authUser, setAuthUser] = useState<User>(defUser);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const value: AuthContextProps = {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
    isLoading, 
    setIsLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


export function useAuth(){
    return useContext(AuthContext)
}