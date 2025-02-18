import { Button } from "@mui/material";
import { API } from "./API";
import { Dog } from "../Types";

type LogoutProps = {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setMatchedDogId: React.Dispatch<React.SetStateAction<string>>;
  setFavoritedDogs: React.Dispatch<React.SetStateAction<Dog[]>>;
};

export const Logout = ({
  setLoggedIn,
  setMatchedDogId,
  setFavoritedDogs,
}: LogoutProps) => {
  const { Logout } = API();

  const handleLogOut = async () => {
    setLoggedIn(await Logout());
    setMatchedDogId("");
    setFavoritedDogs([]);
  };

  return <div>{<Button onClick={handleLogOut}> Log out </Button>}</div>;
};
