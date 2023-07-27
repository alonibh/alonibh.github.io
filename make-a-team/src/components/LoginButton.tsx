import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "primereact/button";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      label="Log In"
      className="mt-2"
      onClick={() => loginWithRedirect()}
    />
  );
};

export default LoginButton;
