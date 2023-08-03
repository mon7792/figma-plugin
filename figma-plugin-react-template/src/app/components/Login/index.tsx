import React, { FunctionComponent, useState } from 'react';
// import { getLoginKeys, getLoginStatus, user } from '../../../api';

type LoginProps = {
   login: boolean;
   setLogin: (status: boolean) => void;
   url?: string;
}


// Login Components
const Login : FunctionComponent<LoginProps> = ({login, setLogin}) => {
  const [disabled, setDisabled] = useState<boolean>(false);


  const onLogin =  async () => {
    // 1. login button is disable from taking any input
    setDisabled(true)

    // 1. get the logins keys 
    // const {rKey, wKey} = await getLoginKeys();
    // console.log(rKey, wKey)

    // // 2. navigate to new browser web page
    // window.open('https://www.google.com/', '_blank');

    // // 3. keep on reading read keys. until 5 minutes
    // let intervalID: number ;
    // let stopReadKey: boolean;
    // let user: user = {
    //   authenticated: false
    // };
    // intervalID = setInterval(async ()=>{
    //     user = await getLoginStatus(rKey)
    //     if (user.authenticated || stopReadKey){
    //       clearInterval(intervalID)
    //     }
    // }, 5000)

    // setTimeout(()=>{
    //   stopReadKey = true;
    // }, 300000)

    // // 4. if it passes, show the ui
    // // 5. show the feedback email.
    // setLogin(user.authenticated)
    setLogin(true)
  };

  if (login){
    return <></>
  }


  return (
    <>
      <div>
        <button onClick={onLogin} disabled={disabled}>LOGIN</button>
      </div>
    </>
  );
};

export default Login;
