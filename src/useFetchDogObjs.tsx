import { fetchDogIds } from "./useFetchDogIds";

export const fetchDogObjs = async (
  selectedBreedNames: string[],
  sort: string,
  sortCategory: string,
  size: number,
  page: number,
  zipCodes: string[],
  ageMin: number,
  ageMax: number
) => {
  const dogIdObj = await fetchDogIds(
    selectedBreedNames,
    sort,
    sortCategory,
    size,
    page,
    zipCodes,
    ageMin,
    ageMax
  );
  const dogIdArr: string[] = dogIdObj.resultIds;

  console.log("dogIDObj:", dogIdObj);
  console.log("dogIdArr:", dogIdArr);
  const responseObj = await fetch(
    `https://frontend-take-home-service.fetch.com/dogs`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",

      body: JSON.stringify(dogIdArr),
    }
  );
  if (responseObj.ok) {
    const json = await responseObj.json();

    console.log("response is good", json);
    return json;
  } else {
    console.error("failed retrieving dogs");
    return [];
  }
};
