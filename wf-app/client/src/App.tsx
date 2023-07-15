import { AuthContext, AuthProvider } from './context/AuthContext';
// import { useAuth } from './hooks/useAuth';

const App = () => {
  // const { user, login, logout } = useAuth();

  return (
    <AuthProvider>
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
      </div>
      </AuthProvider>
  );
};

export default App;