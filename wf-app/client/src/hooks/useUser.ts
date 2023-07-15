import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocalStorage } from "./useLocalStorage";
import { User } from "../type";


export const useUser = () => {
  const {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
    isLoading,
    setIsLoading,
  } = useContext(AuthContext);

  const { getItem, setItem } = useLocalStorage();

  const updateLoadingStatus = (loadingStatus: boolean) => {
    setIsLoading(loadingStatus);
    setItem("isLoading", JSON.stringify(loadingStatus));
  };

  const updateLogInStatus = (loginStatus: boolean) => {
    setIsLoggedIn(loginStatus);
    setItem("isLoggedIn", JSON.stringify(loginStatus));
  };

  const addUser = (user: User) => {
    setAuthUser(user);
    setItem("user", JSON.stringify(user));
  };


  return { authUser, addUser, isLoggedIn, updateLogInStatus, isLoading, updateLoadingStatus };
};
