import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { Toaster } from "react-hot-toast";
import { CookiesProvider } from 'react-cookie';


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <Toaster />
       <CookiesProvider>
      <App />
      </CookiesProvider>
    </UserProvider>
  </StrictMode>
);
