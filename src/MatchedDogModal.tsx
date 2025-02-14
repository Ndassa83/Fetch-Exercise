import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

type matchedDogModalProps = {
  matchedDogObj: Dog;
  setMatchedDogObj: React.Dispatch<React.SetStateAction<Dog | null>>;
  setFavoritedDogs: React.Dispatch<React.SetStateAction<Dog[]>>;
};

export const MatchedDogModal = ({
  matchedDogObj,
  setMatchedDogObj,
  setFavoritedDogs,
}: matchedDogModalProps) => {
  const handleReMatch = () => {
    setMatchedDogObj(null);
    setFavoritedDogs([]);
  };

  return (
    <div className="login-modal">
      <div style={{ fontSize: "28px" }}>You've been matched!</div>
      <Card className="card">
        <CardMedia
          sx={{ height: 140 }}
          image={matchedDogObj.img}
          title={matchedDogObj.id}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {matchedDogObj.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            You have been matched with {matchedDogObj.name}, a{" "}
            {matchedDogObj.age} year old {matchedDogObj.breed}!
          </Typography>
        </CardContent>
        <Button onClick={() => handleReMatch()}>Find another match</Button>
      </Card>
    </div>
  );
};
