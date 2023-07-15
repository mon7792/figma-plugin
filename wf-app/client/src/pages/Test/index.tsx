import { useAuth } from "../../hooks/useAuth";

const Test = () => {
  const { authUser, login, logout,isLoggedIn } = useAuth();
  
  const logIn = (e: any) => {
    e.preventDefault();
    console.log("Login started");
    console.log(authUser.name);
    login({
      id: "143",
      name: "logged",
      email: "mk@com",
    });
    console.log("Login started------");
  };

  const logOut = (e: any) => {
    e.preventDefault();
    console.log("logOut started");
    logout()
  };
  return (
    <div className="App">
      <h1>Hello CodeSandbox:</h1>
      <h2>Start editing to see some magic happen!</h2>
      <h3>User is currently: {isLoggedIn ? "LOGGED-IN" : "LOGGED-OUT"}</h3>
      {isLoggedIn ? <span>{authUser.name}</span> : null}
      {isLoggedIn ? (
        <button onClick={logOut}>Logout</button>
      ) : (
        <button onClick={logIn}>LOGIN</button>
      )}
    </div>
  );
};

export default Test;
