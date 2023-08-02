import React, { FunctionComponent } from 'react';

type LoginProps = {
   login: boolean
   setLogin: (status: boolean) => void;
}

// Login Components
const Login : FunctionComponent<LoginProps> = ({login, setLogin}) => {

  const onLogin = () => {

    // 1. get the logins keys 
    // 2. navigate to new browser web page
    // 3. keep on reading read keys. until 5 minutes 
    // 4. if it passes, show the ui
    // 5. show the feedback email.

    setLogin(true)
  };

  if (login){
    return <></>
  }


  return (
    <>
      <div>
        <button onClick={onLogin}>LOGIN</button>
      </div>
    </>
  );
};

export default Login;
