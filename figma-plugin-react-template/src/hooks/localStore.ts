import { useEffect, useState, Dispatch, SetStateAction } from 'react';

let defUser: user = {
  key: '',
  authenticated: false,
};

export function useLocalStorage():[user, Dispatch<SetStateAction<user>>]{
  const [value, setValue] = useState<user>(defUser);

  // load the initial user.
  useEffect(()=>{
      parent.postMessage({ pluginMessage: { type: 'get-user'} }, '*');
  },[])
  
  useEffect(() => {
    // This is how we read messages sent from the plugin controller
    window.onmessage =  async (event) => {
      const { type, message } = event.data.pluginMessage;
      if (type === 'save-user') {
        console.log(`Figma Says: ${message}`);
        setValue(message)
      }
    };
  }, []);

  useEffect(()=>{
    function setLocalUserInfo() {
      const userInfo = JSON.stringify(value)
      parent.postMessage({ pluginMessage: { type: 'save-user', userInfo } }, '*');
      console.log(value)
  }
  setLocalUserInfo();
  },[value])

  return [value, setValue];
}

