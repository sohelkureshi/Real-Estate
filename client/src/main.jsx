import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
     domain="dev-2v34ccldaqvwxn6m.us.auth0.com"
     clientId="6IXRKFydmDuDyRHSJ3EBC2jfadRQLapQ"
     authorizationParams={{
      redirect_uri: "http://localhost:5173/"
     }}
     audience="https://real-estate-app.com/api"
     scope="openid profile email"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
