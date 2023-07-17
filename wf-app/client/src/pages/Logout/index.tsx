import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { routes } from "../../routes";
import { useEffect } from "react";

function Logout() {
  const { isLoggedIn, login, logout, isLoading } = useAuth();
  useEffect(()=>{
    logout()
  },[])
  
  if (isLoading) {
    return (
      <div>
        <h1>loading....</h1>
      </div>
    );
  }
  

  if (!isLoggedIn) {
    return <Navigate to={routes.APP} />;
  }

  return <>LOGOUT</>;
}

export default Logout;
