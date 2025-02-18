import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Dog, Match, SortCategoryType, SortType } from "../Types";
import { LoginModal } from "./LoginModal";
import { Logout } from "./Logout";
import { SearchDogs } from "./SearchDogs";
import { MatchedDogModal } from "./MatchedDogModal";
import { API } from "./API";
import "./App.css";

const { fetchDogBreedNames, fetchMatch, fetchDogObjs } = API();

function App() {
  const [breedNames, setBreedNames] = useState<string[]>([]);
  const [sort, setSort] = useState<SortType>("asc");
  const [sortCategory, setSortCategory] = useState<SortCategoryType>("breed");
  const [size, setSize] = useState<number>(25);
  const [page, setPage] = useState<number>(1);
  const [zipCodes, setZipCodes] = useState<string[]>([]);
  const [ageMin, setAgeMin] = useState<number>(0);
  const [ageMax, setAgeMax] = useState<number>(14);
  const [selectedBreedNames, setSelectedBreedNames] = useState<string[]>([]);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [filteredDogs, setFilteredDogs] = useState<Dog[]>([]);
  const [favoritedDogs, setFavoritedDogs] = useState<Dog[]>([]);
  const [matchedDogId, setMatchedDogId] = useState<string>("");
  const [matchedDogObj, setMatchedDogObj] = useState<Dog | null>(null);

  useEffect(() => {
    if (loggedIn) {
      fetchDogBreedNames().then((breeds) => setBreedNames(breeds));
    }
    if (!loggedIn) {
      setBreedNames([]);
    }
  }, [loggedIn]);

  const handleFetchMatch = async () => {
    const match: Match = await fetchMatch(favoritedDogs.map((dog) => dog.id));
    setMatchedDogId(match.match);
  };

  const handleFilterDogs = async () => {
    const filteredDogs = await fetchDogObjs(
      selectedBreedNames,
      sort,
      sortCategory,
      size,
      page,
      zipCodes,
      ageMin,
      ageMax
    );
    setFilteredDogs(filteredDogs);
  };

  useEffect(() => {
    handleFilterDogs();
  }, [
    page,
    ageMin,
    ageMax,
    zipCodes,
    selectedBreedNames,
    size,
    sortCategory,
    sort,
    loggedIn,
  ]);

  useEffect(() => {
    if (matchedDogId.length > 0) {
      for (let i = 0; i < favoritedDogs.length; i++) {
        if (matchedDogId === favoritedDogs[i].id) {
          setMatchedDogObj(favoritedDogs[i]);
        } else {
          console.log("No match found");
        }
      }
    }
  }, [matchedDogId]);

  if (!loggedIn) {
    return <LoginModal setLoggedIn={setLoggedIn} />;
  }

  return (
    <div>
      <div>
        <Logout
          setLoggedIn={setLoggedIn}
          setMatchedDogId={setMatchedDogId}
          setFavoritedDogs={setFavoritedDogs}
        />
        <SearchDogs
          breedNames={breedNames}
          selectedBreedNames={selectedBreedNames}
          setSelectedBreedNames={setSelectedBreedNames}
          setSort={setSort}
          sort={sort}
          setSortCategory={setSortCategory}
          sortCategory={sortCategory}
          setSize={setSize}
          size={size}
          setPage={setPage}
          page={page}
          setZipCodes={setZipCodes}
          zipCodes={zipCodes}
          setAgeMin={setAgeMin}
          setAgeMax={setAgeMax}
          ageMin={ageMin}
          ageMax={ageMax}
        />
      </div>
      {filteredDogs.length <= 0 && (
        <Button onClick={() => handleFilterDogs()}>Start your search! </Button>
      )}
      {favoritedDogs.length > 0 && (
        <Button
          sx={{ fontSize: "25px", backgroundColor: "orange" }}
          onClick={() => handleFetchMatch()}
        >
          Click to find your perfect match
        </Button>
      )}
      {matchedDogObj && (
        <MatchedDogModal
          matchedDogObj={matchedDogObj}
          setMatchedDogObj={setMatchedDogObj}
          setFavoritedDogs={setFavoritedDogs}
        />
      )}

      <div className="card-container">
        {filteredDogs.length > 0 &&
          filteredDogs.map((dog: Dog) => {
            return (
              <Card className="card">
                <CardMedia
                  sx={{ height: 140 }}
                  image={dog.img}
                  title={dog.id}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {dog.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    This is {dog.name}, a {dog.breed} that is full of love. They
                    are {dog.age} years old from zip: {dog.zip_code} and ready
                    to find a home.
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <Button
                    disabled={favoritedDogs.includes(dog)}
                    onClick={() => setFavoritedDogs((prev) => [...prev, dog])}
                    size="small"
                  >
                    Favorite
                  </Button>
                </CardActions>
              </Card>
            );
          })}
      </div>
    </div>
  );
}

export default App;
