import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./assets/css/App.css";
import { RouterProvider } from "react-router-dom";
import routes from "./router/routes";

function App() {
  console.log(import.meta.env.VITE_APP_SERVER_API);

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
