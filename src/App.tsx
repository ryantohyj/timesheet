import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./layout";
import Application from "./pages/Application";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import Timesheet from "./pages/Timesheet";

import "./App.css";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout isLogin={isLogin} setIsLogin={setIsLogin} />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "/login",
          element: <Login setIsLogin={setIsLogin} />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
        {
          path: "/application",
          element: <Application />,
        },
        {
          path: "/timesheet",
          element: <Timesheet />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
      ],
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
