export const fetchDogIds = async (
  selectedBreedNames: string[],
  sort: string,
  sortCategory: string,
  size: number,
  page: number,
  zipCodes: string[],
  ageMin: number,
  ageMax: number
) => {
  const searchParams = new URLSearchParams();
  if (selectedBreedNames.length > 0) {
    selectedBreedNames.forEach((breed) => searchParams.append("breeds", breed));
  }

  if (zipCodes.length > 0) {
    zipCodes.forEach((zip) => searchParams.append("zipCodes", zip));
  }

  if (page > 1 && size)
    searchParams.append("from", (page * size - size).toString());

  if (size) searchParams.append("size", size.toString());

  if (sort) searchParams.append("sort", `${sortCategory}:${sort}`);

  if (ageMin) searchParams.append("ageMin", ageMin.toString());

  if (ageMax) searchParams.append("ageMax", ageMax.toString());

  const responseIds = await fetch(
    `https://frontend-take-home-service.fetch.com/dogs/search/?${searchParams.toString()}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (responseIds.ok) {
    const json = await responseIds.json();
    return json;
  } else {
    console.error("failed retrieving dogs");
    return [];
  }
};
