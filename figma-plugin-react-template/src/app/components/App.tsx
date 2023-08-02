import React from 'react';
import logo from '../assets/logo.svg';
import '../styles/ui.css';
import Login from './Login';
import Notification from './Notification';

function App() {
  const [login, setLogin] = React.useState<boolean>(false);
  const [notification, setNotification] = React.useState<boolean>(true);

  const textbox = React.useRef<HTMLInputElement>(undefined);

  const countRef = React.useCallback((element: HTMLInputElement) => {
    if (element) element.value = '5';
    textbox.current = element;
  }, []);

  const onCreate = () => {
    const count = parseInt(textbox.current.value, 10);
    parent.postMessage({ pluginMessage: { type: 'create-rectangles', count } }, '*');
  };

  const onCancel = () => {
    parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*');
  };

  React.useEffect(() => {
    // This is how we read messages sent from the plugin controller
    window.onmessage = (event) => {
      const { type, message } = event.data.pluginMessage;
      if (type === 'create-rectangles') {
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
      <img src={logo} />
      <p>
      <input type='text' placeholder='Describe the feel' />
      </p>
      <button id="generate">
        generate
      </button>
      <p>
        Count: <input ref={countRef} />
      </p>
      <button id="create" onClick={onCreate}>
        Create
      </button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default App;
