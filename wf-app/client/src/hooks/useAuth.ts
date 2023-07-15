import { useEffect } from "react";
import { useUser } from "./useUser";
import { useLocalStorage } from "./useLocalStorage";
import { User, AuthState } from "../type";

const defUser: User = {
  id: "def",
  name: "def",
  email: "def",
  authToken: "def",
};

const getUser = async (): Promise<User> => {
  const user = await fetch("/profile");
  return user.json();
};

export const useAuth = () => {
  const {
    authUser,
    addUser,
    isLoggedIn,
    updateLogInStatus,
    isLoading,
    updateLoadingStatus,
  } = useUser();
  const { getItem } = useLocalStorage();

  useEffect(() => {
    const user = getItem("user");
    if (user) {
      addUser(JSON.parse(user));
    }

    const isLoggedIn = getItem("isLoggedIn");
    if (isLoggedIn) {
      updateLogInStatus(JSON.parse(isLoggedIn));
    }

    const isLoading = getItem("isLoading");
    if (isLoading) {
      updateLoadingStatus(JSON.parse(isLoading));
    }
  }, []);

  const login = (user: User) => {
    addUser(user);
    updateLogInStatus(true);
    updateLoadingStatus(false);
  };

  const logout = () => {
    addUser(defUser);
    updateLogInStatus(false);
    updateLoadingStatus(false);
  };

  const getUserProfile = async () => {
    updateLoadingStatus(true);
    try {
      const user = await getUser();
      addUser(user);
      updateLogInStatus(true);
      updateLoadingStatus(false);
    } catch (error) {
      addUser(defUser);
      updateLogInStatus(false);
      updateLoadingStatus(false);
    }
  };

  return { authUser, isLoading, isLoggedIn, login, logout, getUserProfile };
};
