import { useUser } from "../../hooks/useUser.hook";
import { useNavigate } from 'react-router-dom';
import { routes } from "../../routes";

function Login() {
  const navigate = useNavigate();
  const { user, authenticated } = useUser();
  if (!user) {
    return (
      <div>
        <h1>loading....</h1>
      </div>
    );
  }
  if (user || authenticated) {
    navigate(routes.APP)
  }
  return (
    <div className="Login">
      <h1>3rdParty Login</h1>
      <a href={routes.GITHUB_LOGIN}>
        <button>Login with GITHUB</button>
      </a>
    </div>
  );
}

export default Login;
