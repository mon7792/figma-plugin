import { useAuth } from "../../hooks/useAuth";
import { Navigate } from 'react-router-dom';
import { routes } from "../../routes";


function Login() {
  const { authUser, isLoggedIn, login, logout, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div>
        <h1>loading....</h1>
      </div>
    );
  }
  
  if (isLoggedIn) {
    return <Navigate to={routes.APP} />
  }

  return (
    <div className="Login">
      <h1>3rdParty Login</h1>
      <a href={routes.GITHUB_LOGIN}>
        <button>Login with GITHUB</button>
      </a>
      <button onClick={()=>{login({id: "def", name:"defname", email: "abc@fg.com"})}}>Dummy Login</button>  
    </div>
  );
}

export default Login;
