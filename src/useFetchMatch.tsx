export const useFetchMatch = async (favoritedDogs: string[]) => {
  const response = await fetch(
    `https://frontend-take-home-service.fetch.com/dogs/match`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(favoritedDogs),
    }
  );
  if (response.ok) {
    const json = await response.json();
    return json;
  } else {
    console.error("failed retrieving dogs");
    return [];
  }
};
