import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "primereact/button";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button
      label="Log Out"
      className="mt-2 p-button-danger"
      onClick={() => logout({ returnTo: window.location.origin })}
    />
  );
};

export default LogoutButton;
