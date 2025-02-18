export type Dog = {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
};

export type Match = {
  match: string;
};

export type SortType = "asc" | "desc";
export type SortCategoryType = "breed" | "name" | "age";
