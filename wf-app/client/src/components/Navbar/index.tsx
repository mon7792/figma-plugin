import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {

    const { authUser, isLoggedIn, logout } = useAuth();
    return (
        <nav>
            <ul>
                <li>HOME</li>
                {isLoggedIn? <li><button onClick={logout}>LOGOUT</button></li>:<></>}
            </ul>
        </nav>
    )
}

export default Navbar;