import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";

const Callback = () => {
  const { authUser, login, logout, isLoggedIn, getUserProfile } = useAuth();

  //   1. isLogged : redirect to app page
  //   2. !isLogged: get user information from profile page.
  //   3. if sucess: update the auth fields and redirect to app
  //   4. is error: redirect to home.

  useEffect(() => {
    const getUser = async () => {
      await getUserProfile();
    };
    getUser().catch(() => {
      return <Navigate to="/" />;
    });
  }, []);

  if (isLoggedIn) {
    return <Navigate to="/" />;
  } else {
  }

  return (
    <div className="Callback">
      this should be visible only for certain duration.
    </div>
  );
};

export default Callback;
