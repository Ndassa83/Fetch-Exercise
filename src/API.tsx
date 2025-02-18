import { Dog, Match } from "../Types";

export const API = () => {
  const API_URL = "https://frontend-take-home-service.fetch.com";

  const fetchDogBreedNames = async (): Promise<string[]> => {
    const response = await fetch(`${API_URL}/dogs/breeds`, {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      const json = await response.json();
      console.log("retrieved dog breed names");
      return json;
    } else {
      console.error("failed retrieving dog breed names");
      return [];
    }
  };

  const fetchDogIds = async (
    selectedBreedNames: string[],
    sort: string,
    sortCategory: string,
    size: number,
    page: number,
    zipCodes: string[],
    ageMin: number,
    ageMax: number
  ): Promise<{
    resultIds: [];
    total: number;
    next: string;
    prev: string;
  }> => {
    const searchParams = new URLSearchParams();

    if (selectedBreedNames.length > 0) {
      selectedBreedNames.forEach((breed) =>
        searchParams.append("breeds", breed)
      );
    }

    if (zipCodes.length > 0) {
      zipCodes.forEach((zip) => searchParams.append("zipCodes", zip));
    }

    if (page > 1 && size)
      searchParams.append("from", (page * size - size).toString());

    if (size) searchParams.append("size", size.toString());

    if (sort) searchParams.append("sort", `${sortCategory}:${sort}`);

    if (ageMin) searchParams.append("ageMin", ageMin.toString());

    if (ageMax >= 0) searchParams.append("ageMax", ageMax.toString());

    const responseIds = await fetch(
      `${API_URL}/dogs/search/?${searchParams.toString()}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (responseIds.ok) {
      const json = await responseIds.json();
      return json;
    } else {
      console.error("failed retrieving dog IDs");
      return { resultIds: [], total: 0, next: "", prev: "" };
    }
  };

  const fetchDogObjs = async (
    selectedBreedNames: string[],
    sort: string,
    sortCategory: string,
    size: number,
    page: number,
    zipCodes: string[],
    ageMin: number,
    ageMax: number
  ): Promise<Dog[]> => {
    const dogIdsObj = await fetchDogIds(
      selectedBreedNames,
      sort,
      sortCategory,
      size,
      page,
      zipCodes,
      ageMin,
      ageMax
    );
    const dogIdArr: string[] = dogIdsObj.resultIds;

    const responseObj = await fetch(`${API_URL}/dogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",

      body: JSON.stringify(dogIdArr),
    });
    if (responseObj.ok) {
      const json = await responseObj.json();

      console.log("response is good", json);
      return json;
    } else {
      console.error("failed retrieving dogs");
      return [];
    }
  };

  const fetchMatch = async (favoritedDogs: string[]): Promise<Match> => {
    const response = await fetch(`${API_URL}/dogs/match`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(favoritedDogs),
    });
    if (response.ok) {
      const json = await response.json();
      return json;
    } else {
      console.error("failed retrieving dogs");
      return { match: "" };
    }
  };

  const Login = async (name: string, email: string) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    });

    if (response.ok) {
      console.log("Login successful!");
      return true;
    } else {
      console.error("Login failed:", response.statusText);
      return false;
    }
  };

  const Logout = async () => {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      console.log("Logout successful!");
      return false;
    } else {
      console.error("Logout failed");
      return true;
    }
  };

  return { fetchDogBreedNames, fetchDogObjs, fetchMatch, Login, Logout };
};
