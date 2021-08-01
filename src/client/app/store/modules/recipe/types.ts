export type Ingredient = {
  id: string;
  name: string;
}

export type Recipe = {
  id: string;
  name: string;
  description: string;
  ingredients: Ingredient[];
}
