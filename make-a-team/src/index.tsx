import { createRoot } from "react-dom/client";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <Auth0Provider
    domain="dev-fyxdmvb30m70jych.us.auth0.com"
    clientId="rv3k9r7D1NUR0KkLXHELZwfDxYxsDf3G"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>
);
