import { DetailedRecipe, Ingredient, Recipe } from "../models";
import axiosInstance from "./axiosConfig";

interface ListIngredientsResponse {
  meals: Ingredient[] | null;
}

export const getIngredientsList = async (): Promise<Ingredient[]> => {
  try {
    const response = await axiosInstance.get<ListIngredientsResponse>(
      "/list.php?i=list"
    );
    return response.data.meals || [];
  } catch (error) {
    console.error("Error fetching ingredients list:", error);
    throw error;
  }
};

interface RecipeResponse {
  meals: Recipe[] | null;
}

export const searchRecipesByIngredient = async (
  ingredient: Ingredient
): Promise<Recipe[]> => {
  try {
    const response = await axiosInstance.get<RecipeResponse>(
      `/filter.php?i=${ingredient.strIngredient}`
    );
    return response.data.meals || [];
  } catch (error) {
    console.error("Error searching recipes by ingredient:", error);
    throw error;
  }
};

interface RecipeDetailsResponse {
  meals: DetailedRecipe[] | null;
}

export const getRecipeDetails = async (
  id: string
): Promise<DetailedRecipe | null> => {
  try {
    const response = await axiosInstance.get<RecipeDetailsResponse>(
      `/lookup.php?i=${id}`
    );
    return response.data.meals?.at(0) || null;
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    throw error;
  }
};
