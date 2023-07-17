import { createHashRouter, RouterProvider } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import App from "./pages/App";
import Test from "./pages/Test";
import Navbar from "./components/Navbar";
import Callback from "./pages/Callback";
import Logout from "./pages/Logout";

const Root = () => {
  const router = createHashRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/logout",
      element: <Logout />,
    },
    {
      path: "/app",
      element: <App />,
    },
    {
      path: "/test",
      element: <Test />,
    },
    {
      path: "/callback",
      element: <Callback />,
    },
  ]);

  return (
    <AuthProvider>
      <Navbar />
        <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default Root;
