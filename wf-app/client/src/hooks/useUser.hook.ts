import { useState, useEffect } from 'react';
// import { getAuthenticatedUser } from './common';
import { useNavigate } from 'react-router-dom';

type userResp = {
  authenticated: boolean
  user: any
}

const getDummyUserDetails =(): Promise<userResp>=> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({authenticated: true, user: {id: 12, username: "dummy"}});
    }, 2000);
  });
}

// store some state in local storage.
export function useUser() {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserDetails() {
      const usrResp =  await getDummyUserDetails()
      if (!usrResp.authenticated) {
        navigate("/login");
        return;
      }
      setUser(usrResp.user);
      setAuthenticated(usrResp.authenticated);
    }
    console.log("How many time is it called")
    getUserDetails();
  }, [user, authenticated]);

  return { user, authenticated };
}