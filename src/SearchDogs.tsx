import {
  Autocomplete,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
} from "@mui/material";
import { SortCategoryType, SortType } from "../Types";

const DATABASE_TOTAL = 10000;
const sortCatOptions: SortCategoryType[] = ["breed", "name", "age"];

type SearchDogsProps = {
  breedNames: string[];
  selectedBreedNames: string[];
  setSelectedBreedNames: React.Dispatch<React.SetStateAction<string[]>>;
  setSort: React.Dispatch<React.SetStateAction<SortType>>;
  setSortCategory: React.Dispatch<React.SetStateAction<SortCategoryType>>;
  sortCategory: SortCategoryType;
  sort: SortType;
  setSize: React.Dispatch<React.SetStateAction<number>>;
  size: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  setZipCodes: React.Dispatch<React.SetStateAction<string[]>>;
  zipCodes: string[];
  setAgeMin: React.Dispatch<React.SetStateAction<number>>;
  ageMin: number;
  setAgeMax: React.Dispatch<React.SetStateAction<number>>;
  ageMax: number;
};

export const SearchDogs = ({
  breedNames,
  selectedBreedNames,
  setSelectedBreedNames,
  setSort,
  sort,
  setSortCategory,
  sortCategory,
  setSize,
  size,
  setPage,
  page,
  setZipCodes,
  zipCodes,
  setAgeMin,
  ageMin,
  setAgeMax,
  ageMax,
}: SearchDogsProps) => {
  return (
    <div className="search-container">
      <div className="search-header">Search Dogs</div>
      <Autocomplete
        className="search-field"
        value={selectedBreedNames}
        onChange={(_, newValue) => {
          setSelectedBreedNames(newValue);
        }}
        multiple
        options={breedNames}
        renderTags={(value: string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search by Breed"
            placeholder="Add Breed"
          />
        )}
      />
      <Autocomplete
        className="search-field"
        value={zipCodes}
        onChange={(_, newValue) => {
          setZipCodes(newValue);
        }}
        multiple
        freeSolo
        options={[]}
        renderTags={(value: string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Enter Zip Codes"
            placeholder="Enter zip codes"
            fullWidth
            margin="normal"
          />
        )}
      />
      <div className="sort-field">
        <FormControl className="search-field">
          <InputLabel>Sort by:</InputLabel>
          <Select
            value={sortCategory}
            label="sort by"
            onChange={(e) =>
              setSortCategory(e.target.value as SortCategoryType)
            }
          >
            {sortCatOptions.map((category) => (
              <MenuItem value={category}>{category}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Asc | Dsc</InputLabel>
          <Select
            value={sort}
            label="Asc or Desc"
            onChange={(e) => setSort(e.target.value as SortType)}
          >
            <MenuItem value={"asc"}>ascending</MenuItem>
            <MenuItem value={"desc"}>descending</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="# Results"
          type="number"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
        />
      </div>

      <div>
        Age Range {ageMin} to {ageMax}
      </div>
      <Slider
        value={[ageMin, ageMax] as number[]}
        onChange={(_, newValue) => {
          if (Array.isArray(newValue)) {
            setAgeMin(newValue[0]);
            setAgeMax(newValue[1]);
          }
        }}
        min={0}
        max={14}
        valueLabelDisplay="auto"
        disableSwap
      />
      <div className="search-buttons">
        <Button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
        >
          Previous
        </Button>
        <div>Page {page}</div>
        <Button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === Math.ceil(DATABASE_TOTAL / size)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
