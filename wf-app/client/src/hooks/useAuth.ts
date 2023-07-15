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

const getUserPofile =(): Promise<AuthState>=> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({isLoggedIn: true, isLoading: false, user: {id: "12", name: "dummy-todo", email: "daf@daf.com"}});
    }, 2000);
  });
}

export const useAuth = () => {
  const { authUser, addUser, isLoggedIn, updateLogInStatus, isLoading, updateLoadingStatus } = useUser();
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
    const authState = await getUserPofile()
    addUser(authState.user);
    updateLogInStatus(authState.isLoggedIn);
    updateLoadingStatus(authState.isLoading);
  }

  return { authUser, isLoading, isLoggedIn, login, logout, getUserPofile };
};