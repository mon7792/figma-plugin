import React from 'react';

import '../styles/ui.css';
import Login from './Login';
import Notification from './Notification';
import Generate from './Generate';
import SvgSet from './SvgSet';

function App() {
  const [login, setLogin] = React.useState<boolean>(true);
  const [notification, setNotification] = React.useState<boolean>(false);


  React.useEffect(() => {
    // This is how we read messages sent from the plugin controller
    window.onmessage = (event) => {
      const { type, message } = event.data.pluginMessage;
      console.log("---> recevied",type, message )
      if (type === 'create-rectangles') {
        console.log(`Figma Says: ${message}`);
      }


      if (type === 'generate-svg') {
        console.log(`Figma Says: ${message}`);
      }
    };
  }, []);

  if (!login) {
    return (
      <Login login={login} setLogin={setLogin}/>
    );
  }

  return (
    <div>
      <Notification  title='close this notification' isOpen={notification} setIsOpen={setNotification}/>
      <Generate />
      <SvgSet />
    </div>
  );
}

export default App;
