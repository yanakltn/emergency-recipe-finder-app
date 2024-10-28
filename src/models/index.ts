export interface DetailedRecipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strIngredients: string[];
  strMeasures: string[];
}

export interface Recipe {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}

export interface Ingredient {
  idIngredient: string;
  strIngredient: string;
  strDescription?: string;
  strType?: string;
}
