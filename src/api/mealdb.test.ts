import { AxiosInstance } from "axios";
import axiosInstance from "./axiosConfig";
import {
  getIngredientsList,
  searchRecipesByIngredient,
  getRecipeDetails,
} from "./mealdb";

jest.mock("./axiosConfig");

describe("MealDB API", () => {
  const mockedAxios = axiosInstance as jest.Mocked<AxiosInstance>;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getIngredientsList", () => {
    it("should fetch and return a list of ingredients", async () => {
      const mockIngredients = [
        { idIngredient: "1", strIngredient: "Chicken" },
        { idIngredient: "2", strIngredient: "Salmon" },
      ];
      mockedAxios.get.mockResolvedValue({ data: { meals: mockIngredients } });

      const ingredients = await getIngredientsList();

      expect(mockedAxios.get).toHaveBeenCalledWith("/list.php?i=list");
      expect(ingredients).toEqual(mockIngredients);
    });

    it("should return an empty array if meals is null", async () => {
      mockedAxios.get.mockResolvedValue({ data: { meals: null } });

      const ingredients = await getIngredientsList();

      expect(ingredients).toEqual([]);
    });

    it("should handle errors and re-throw", async () => {
      const mockError = new Error("Network Error");
      mockedAxios.get.mockRejectedValue(mockError);

      await expect(getIngredientsList()).rejects.toThrow(mockError);
    });
  });

  describe("searchRecipesByIngredient", () => {
    it("should fetch and return recipes by ingredient", async () => {
      const mockIngredient = { idIngredient: "1", strIngredient: "Chicken" };
      const mockRecipes = [
        { idMeal: "52772", strMeal: "Teriyaki Chicken Casserole" },
        { idMeal: "52796", strMeal: "Chicken Alfredo Primavera" },
      ];
      mockedAxios.get.mockResolvedValue({ data: { meals: mockRecipes } });

      const recipes = await searchRecipesByIngredient(mockIngredient);

      expect(mockedAxios.get).toHaveBeenCalledWith("/filter.php?i=Chicken");
      expect(recipes).toEqual(mockRecipes);
    });

    it("should return an empty array if meals is null", async () => {
      const mockIngredient = { idIngredient: "1", strIngredient: "Chicken" };
      mockedAxios.get.mockResolvedValue({ data: { meals: null } });

      const recipes = await searchRecipesByIngredient(mockIngredient);

      expect(recipes).toEqual([]);
    });

    it("should handle errors and re-throw", async () => {
      const mockIngredient = { idIngredient: "1", strIngredient: "Chicken" };
      const mockError = new Error("Network Error");
      mockedAxios.get.mockRejectedValue(mockError);

      await expect(searchRecipesByIngredient(mockIngredient)).rejects.toThrow(
        mockError
      );
    });
  });

  describe("getRecipeDetails", () => {
    it("should fetch and return recipe details by ID", async () => {
      const mockRecipeDetails = {
        idMeal: "52772",
        strMeal: "Teriyaki Chicken Casserole",
        strDrinkAlternate: null,
        strCategory: "Chicken",
        strArea: "Japanese",
        strInstructions:
          "Preheat oven to 350° F. Spray a 9x13-inch baking pan with non-stick spray.\r\nCombine soy sauce, ½ cup water, brown sugar, ginger and garlic in a small saucepan and cover. Bring to a boil over medium heat. Remove lid and cook for one minute once boiling.\r\nMeanwhile, stir together the corn starch and 2 tablespoons of water in a separate dish until smooth. Once sauce is boiling, add mixture to the saucepan and stir to combine. Cook until the sauce starts to thicken then remove from heat.\r\nPlace the chicken breasts in the prepared pan. Pour one cup of the sauce over top of chicken. Place chicken in oven and bake 35 minutes or until cooked through. Remove from oven and shred chicken in the dish using two forks.\r\n*Meanwhile, steam or cook the vegetables according to package directions.\r\nAdd the cooked vegetables and rice to the casserole dish with the chicken. Add most of the remaining sauce, reserving a bit to drizzle over the top when serving. Gently toss everything together in the casserole dish until combined. Return to oven and cook 15 minutes. Remove from oven and let stand 5 minutes before serving. Drizzle each serving with remaining sauce. Enjoy!",
        strMealThumb:
          "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
        strTags: "Meat,Casserole",
        strYoutube: "https://www.youtube.com/watch?v=4aZr5hZXP_s",
        strIngredient1: "soy sauce",
        strIngredient2: "water",
        strIngredient3: "brown sugar",
        strIngredient4: "ground ginger",
        strIngredient5: "minced garlic",
        strIngredient6: "cornstarch",
        strIngredient7: "chicken breasts",
        strIngredient8: "stir-fry vegetables",
        strIngredient9: "brown rice",
        strIngredient10: "",
        strIngredient11: "",
        strIngredient12: "",
        strIngredient13: "",
        strIngredient14: "",
        strIngredient15: "",
        strIngredient16: null,
        strIngredient17: null,
        strIngredient18: null,
        strIngredient19: null,
        strIngredient20: null,
        strMeasure1: "3/4 cup",
        strMeasure2: "1/2 cup",
        strMeasure3: "1/4 cup",
        strMeasure4: "1/2 teaspoon",
        strMeasure5: "1/2 teaspoon",
        strMeasure6: "4 Tablespoons",
        strMeasure7: "2",
        strMeasure8: "1 (12 oz.)",
        strMeasure9: "3 cups",
        strMeasure10: "",
        strMeasure11: "",
        strMeasure12: "",
        strMeasure13: "",
        strMeasure14: "",
        strMeasure15: "",
        strMeasure16: null,
        strMeasure17: null,
        strMeasure18: null,
        strMeasure19: null,
        strMeasure20: null,
        strSource: null,
        strImageSource: null,
        strCreativeCommonsConfirmed: null,
        dateModified: null,
      };
      mockedAxios.get.mockResolvedValue({
        data: { meals: [mockRecipeDetails] },
      });

      const recipeDetails = await getRecipeDetails("52772");

      expect(mockedAxios.get).toHaveBeenCalledWith("/lookup.php?i=52772");
      expect(recipeDetails).toEqual(mockRecipeDetails);
    });

    it("should return null if meals is null or empty", async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: { meals: null } });
      mockedAxios.get.mockResolvedValueOnce({ data: { meals: [] } });

      const recipeDetails1 = await getRecipeDetails("52772");
      const recipeDetails2 = await getRecipeDetails("52772");

      expect(recipeDetails1).toBeNull();
      expect(recipeDetails2).toBeNull();
    });

    it("should handle errors and re-throw", async () => {
      const mockError = new Error("Network Error");
      mockedAxios.get.mockRejectedValue(mockError);

      await expect(getRecipeDetails("52772")).rejects.toThrow(mockError);
    });
  });
});
