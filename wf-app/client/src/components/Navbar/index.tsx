import { useAuth } from "../../hooks/useAuth";
import { routes } from "../../routes";

const Navbar = () => {
  const { authUser, isLoggedIn } = useAuth();

  return (
    <nav>
      <ul>
        <li>HOME</li>
        {isLoggedIn ? (
          <li>
            <a href={routes.LOGOUT}>
              <button>LOGOUT</button>
            </a>
          </li>
        ) : (
          <></>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
