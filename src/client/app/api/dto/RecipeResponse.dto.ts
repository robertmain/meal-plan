export type IngredientResponse = {
  id: string;
  name: string;
}

export type RecipeResponse = {
  id: string;
  name: string;
  description: string;
  ingredients: IngredientResponse[];
}
