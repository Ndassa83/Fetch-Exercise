import { Button } from "@mui/material";

type logOutModalProps = {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LogoutModal = ({ setLoggedIn }: logOutModalProps) => {
  const logout = async () => {
    const response = await fetch(
      "https://frontend-take-home-service.fetch.com/auth/logout",
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (response.ok) {
      setLoggedIn(false);

      console.log("Logout successful!");
    } else {
      console.error("Logout failed");
    }
  };

  return <div>{<Button onClick={logout}> Log out </Button>}</div>;
};
