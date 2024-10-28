import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { Ingredient, Recipe } from "../models";
import { getIngredientsList, searchRecipesByIngredient } from "../api";

interface RecipeContextType {
  ingredients: Ingredient[];
  selectedIngredient: Ingredient | null;
  loadedIngredient: Ingredient | null;
  recipes: Recipe[];
  isLoading: boolean;
  setSelectedIngredient: (ingredient: Ingredient | null) => void;
  searchRecipes: (ingredient: Ingredient | null) => void;
}

export const RecipeContext = createContext<RecipeContextType | null>(null);

export const RecipeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [selectedIngredient, setSelectedIngredient] =
    useState<Ingredient | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedIngredient, setLoadedIngredient] = useState<Ingredient | null>(
    null
  );

  const searchRecipes = async (ingredient: Ingredient | null) => {
    if (selectedIngredient && !isLoading) {
      setIsLoading(true);
      setLoadedIngredient(selectedIngredient);
      try {
        const recipies = await searchRecipesByIngredient(selectedIngredient);
        setRecipes(recipies);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        alert("Error fetching recipes. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    getIngredientsList().then((ingredients: Ingredient[]) =>
      setIngredients(ingredients)
    );
  }, []);

  const contextValue: RecipeContextType = {
    ingredients,
    selectedIngredient,
    loadedIngredient,
    recipes,
    isLoading,
    setSelectedIngredient,
    searchRecipes,
  };

  return (
    <RecipeContext.Provider value={contextValue}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipeContext = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error("useRecipeContext must be used within a RecipeProvider");
  }
  return context;
};
