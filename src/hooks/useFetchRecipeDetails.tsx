import { useEffect, useState } from "react";
import { DetailedRecipe } from "../models";
import { getRecipeDetails } from "../api";

export const useFetchRecipeDetails = (recipeId: string) => {
  const [recipe, setRecipe] = useState<DetailedRecipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setRecipe(null);

    const fetchRecipeDetails = async () => {
      try {
        const recipeDetails = await getRecipeDetails(recipeId);

        if (recipeDetails) {
          const ingredients = [];
          const measures = [];

          for (let i = 1; i <= 20; i++) {
            const ingredientKey = `strIngredient${i}` as keyof DetailedRecipe;
            const measureKey = `strMeasure${i}` as keyof DetailedRecipe;

            const ingredient = recipeDetails[ingredientKey];
            const measure = recipeDetails[measureKey];

            if (ingredient && measure) {
              ingredients.push(ingredient as string);
              measures.push(measure as string);
            }
          }

          const detailedRecipe: DetailedRecipe = {
            ...recipeDetails,
            strIngredients: ingredients,
            strMeasures: measures,
          };

          setRecipe(detailedRecipe);
        } else {
          setRecipe(null);
        }
      } catch (error: any) {
        console.error("Error fetching recipe details:", error);
        setError(error.message || "Failed to fetch recipe details");
        setRecipe(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);

  return { recipe, isLoading, error };
};
