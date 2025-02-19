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
      fetchDogBreedNames().then(setBreedNames);
    } else {
      setBreedNames([]);
    }
  }, [loggedIn]);

  const handleFetchMatch = async () => {
    const match: Match = await fetchMatch(favoritedDogs.map((dog) => dog.id));
    setMatchedDogId(match.match);
  };

  const handleFilterDogs = async () => {
    const fetchedDogs = await fetchDogObjs(
      selectedBreedNames,
      sort,
      sortCategory,
      size,
      page,
      zipCodes,
      ageMin,
      ageMax
    );
    setFilteredDogs(fetchedDogs);
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
    if (matchedDogId) {
      const matchedDog = favoritedDogs.find((dog) => dog.id === matchedDogId);
      setMatchedDogObj(matchedDog || null);
    }
  }, [matchedDogId]);

  if (!loggedIn) {
    return <LoginModal setLoggedIn={setLoggedIn} />;
  }

  return (
    <div className="container">
      <div className="search">
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

        {filteredDogs.length === 0 && (
          <Button variant="contained" sx={{ mt: 3 }} onClick={handleFilterDogs}>
            Start your search!
          </Button>
        )}

        <Button
          className="search-buttons"
          disabled={favoritedDogs.length === 0}
          variant="contained"
          onClick={handleFetchMatch}
        >
          Click to find your perfect match
        </Button>
        <Logout
          setLoggedIn={setLoggedIn}
          setMatchedDogId={setMatchedDogId}
          setFavoritedDogs={setFavoritedDogs}
        />
      </div>
      <div className="card-container">
        {filteredDogs.map((dog: Dog) => (
          <Card key={dog.id} className="card">
            <CardMedia sx={{ height: 140 }} image={dog.img} title={dog.id} />
            <CardContent>
              <Typography gutterBottom variant="h5">
                {dog.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {dog.name} is a {dog.breed}, {dog.age} years old from zip:{" "}
                {dog.zip_code}. Looking for a loving home!
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
              <Button
                disabled={favoritedDogs.includes(dog)}
                onClick={() => setFavoritedDogs((prev) => [...prev, dog])}
                size="small"
                variant="outlined"
              >
                Favorite
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
      {matchedDogObj && (
        <MatchedDogModal
          matchedDogObj={matchedDogObj}
          setMatchedDogObj={setMatchedDogObj}
          setFavoritedDogs={setFavoritedDogs}
        />
      )}
    </div>
  );
}

export default App;
