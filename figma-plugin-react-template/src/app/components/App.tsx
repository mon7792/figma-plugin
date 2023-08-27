import React from 'react';

import '../styles/ui.css';
import Login from './Login';
import Notification from './Notification';
import Generate from './Generate';
import SvgSet from './SvgSet';
import { postGenerateContent } from '../../api';

function App() {
  const [login, setLogin] = React.useState<boolean>(false);
  const [notification, setNotification] = React.useState<boolean>(false);
  const [svgImg, setSvgImg] = React.useState<Array<genSVG>>([]);


  React.useEffect(() => {
    // This is how we read messages sent from the plugin controller
    window.onmessage =  async (event) => {
      const { type, message } = event.data.pluginMessage;
      console.log("---> recevied",type, message )
      if (type === 'create-rectangles') {
        console.log(`Figma Says: ${message}`);
      }


      if (type === 'generate-svg') {
        console.log(`Figma Says: ${message}`);
        // call to the backend with search terms.
        const result = await postGenerateContent("", message)
        setSvgImg(result)
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
      <SvgSet images={svgImg}/>
    </div>
  );
}

export default App;
