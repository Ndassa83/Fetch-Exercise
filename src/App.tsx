import { useEffect, useState } from "react";
import { LoginModal } from "./LoginModal";
import "./App.css";
import { LogoutModal } from "./LogoutModal";
import { getDogBreedNames } from "./useGetDogBreedNames";
import { SearchDogs } from "./SearchDogs";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { fetchDogObjs } from "./useFetchDogObjs";
import { useFetchMatch } from "./useFetchMatch";
import { MatchedDogModal } from "./MatchedDogModal";
interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}
function App() {
  const [breedNames, setBreedNames] = useState<string[]>([]);
  const [sort, setSort] = useState<string>("asc");
  const [sortCategory, setSortCategory] = useState<string>("breed");
  const [size, setSize] = useState<number>(25);
  const [page, setPage] = useState<number>(1);
  const [zipCodes, setZipCodes] = useState<string[]>([]);
  const [ageMin, setAgeMin] = useState<number>(0);
  const [ageMax, setAgeMax] = useState<number>(14);
  const [selectedBreedNames, setSelectedBreedNames] = useState<string[]>([]);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [filteredDogs, setFilteredDogs] = useState<Dog[] | null>(null);
  const [favoritedDogs, setFavoritedDogs] = useState<Dog[]>([]);
  const [matchedDogId, setMatchedDogId] = useState<string | null>(null);
  const [matchedDogObj, setMatchedDogObj] = useState<Dog | null>(null);

  useEffect(() => {
    if (loggedIn) {
      getDogBreedNames().then((breeds) => setBreedNames(breeds));
    }
    if (!loggedIn) {
      setBreedNames([]);
    }
  }, [loggedIn]);

  const handleFetchMatch = async () => {
    const match: any = await useFetchMatch(favoritedDogs.map((dog) => dog.id));
    setMatchedDogId(match.match);
  };
  console.log(matchedDogId);

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
  ]);

  useEffect(() => {
    if (matchedDogId) {
      for (let i = 0; i < favoritedDogs.length; i++) {
        if (matchedDogId === favoritedDogs[i].id) {
          setMatchedDogObj(favoritedDogs[i]);
        } else {
          console.log("No match found");
        }
      }
    }
  }, [matchedDogId]);

  return (
    <div>
      {!loggedIn && (
        <LoginModal loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      )}
      {loggedIn && (
        <div>
          <div>
            <LogoutModal loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
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
          {!filteredDogs && (
            <Button onClick={() => handleFilterDogs()}>
              Start your search!{" "}
            </Button>
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
            {filteredDogs &&
              filteredDogs.map((dog: Dog) => {
                return (
                  <Card className="card">
                    <CardMedia
                      sx={{ height: 140 }}
                      image={dog.img} //image
                      title={dog.id} // name
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {dog.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        This is {dog.name}, a {dog.breed} that is full of love.
                        They are {dog.age} years old from zip: {dog.zip_code}{" "}
                        and ready to find a home.
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "center" }}>
                      <Button
                        disabled={favoritedDogs.includes(dog)}
                        onClick={() =>
                          setFavoritedDogs((prev) => [...prev, dog])
                        }
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
      )}
    </div>
  );
}

export default App;
