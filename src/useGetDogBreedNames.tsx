export const getDogBreedNames = async () => {
  const response = await fetch(
    "https://frontend-take-home-service.fetch.com/dogs/breeds",
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (response.ok) {
    const json = await response.json();
    console.log("retrieved dog breed names");
    return json;
  } else {
    console.error("failed retrieving dog breed names");
    return [];
  }
};
