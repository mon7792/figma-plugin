import React, { FunctionComponent, useEffect, useState } from 'react';
import { getLoginKeys, getLoginStatus, getLoginUrl } from '../../../api';

import '../../styles/ui.css';
import feel from '../../assets/feel.svg';
import { useLocalStorage } from '../../../hooks/localStore';

type LoginProps = {
  login: boolean;
  setLogin: (status: boolean) => void;
  url?: string;
};

// Login Components
const Login: FunctionComponent<LoginProps> = ({ login, setLogin }) => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [usr, setUser] = useLocalStorage();

  // user.
  useEffect(() => {
    setLogin(usr.authenticated);
  }, [usr]);

  const onLogin = async () => {
    // 1. login button is disable from taking any input
    setDisabled(true);

    // 1. get the logins keys
    const { rKey, wKey } = await getLoginKeys();

    // 2. prepare the login url and open the login url
    const loginUrl = getLoginUrl(wKey);
    // TODO: will be navigated to login screen.
    window.open(loginUrl, '_blank');

    // 3. keep on reading read keys. until 5 minutes
    let intervalID: number;
    let stopReadKey: boolean;
    intervalID = setInterval(async () => {
      let ur = await getLoginStatus(rKey);
      setUser(ur);
      if (ur.authenticated || stopReadKey) {
        clearInterval(intervalID);
      }
    }, 5000);

    setTimeout(() => {
      stopReadKey = true;
    }, 300000);
  };

  if (login) {
    return <></>;
  }

  return (
      <div className="container mx-auto">
        <div className="h-screen flex items-center justify-center">
          <div className="grid grid-cols-1 items-center justify-center">
            <div>
              <img className="object-scale-down h-48 w-96" src={feel} alt="" />
            </div>

            <div className="flex items-center justify-center">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                onClick={onLogin}
                disabled={disabled}
              >
                {disabled ? (
                  <>
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span>LOGIN</span>
                  </>
                ) : (
                  <>
                    <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                    </svg>
                    <span>LOGIN</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Login;
