import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { Dog } from "../Types";

type MatchedDogModalProps = {
  matchedDogObj: Dog;
  setMatchedDogObj: React.Dispatch<React.SetStateAction<Dog | null>>;
  setFavoritedDogs: React.Dispatch<React.SetStateAction<Dog[]>>;
};

export const MatchedDogModal = ({
  matchedDogObj,
  setMatchedDogObj,
  setFavoritedDogs,
}: MatchedDogModalProps) => {
  const handleReMatch = () => {
    setMatchedDogObj(null);
    setFavoritedDogs([]);
  };

  const name = matchedDogObj.name;
  const image = matchedDogObj.img;
  const id = matchedDogObj.id;
  const breed = matchedDogObj.breed;
  const age = matchedDogObj.age;

  return (
    <div className="matchedDog-modal">
      <div>You've been matched!</div>
      <Card className="card">
        <CardMedia sx={{ height: 140 }} image={image} title={id} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            You have been matched with {name}, a {age} year old {breed}!
          </Typography>
        </CardContent>
        <Button onClick={() => handleReMatch()}>Find another match</Button>
      </Card>
    </div>
  );
};
