import React, { FunctionComponent, useEffect } from 'react';
// import './index.css';

type NotificationProps = {
  title: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const Notification: FunctionComponent<NotificationProps> = ({ title, isOpen, setIsOpen }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Hello, World!');
      setIsOpen(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const onClose = () => {
    setIsOpen(false);
  };
  if (!isOpen) {
    return <></>;
  }
  return (
    <div className="notification-top-bar">
      <p>
        {title}
        <small>
          <button onClick={onClose}>x</button>
        </small>
      </p>
    </div>
  );
};

export default Notification;
