import React from "react";
import { render, screen } from "@testing-library/react";
import RecipeDetailsIngredientsTable from "./RecipeDetailsIngredientsTable";
import { DetailedRecipe } from "../models";
import "@testing-library/jest-dom/extend-expect";

describe("RecipeDetailsIngredientsTable Component", () => {
  const mockRecipe: DetailedRecipe = {
    idMeal: "52772",
    strMeal: "Teriyaki Chicken Casserole",
    strCategory: "Chicken",
    strArea: "Japanese",
    strInstructions: "...",
    strMealThumb:
      "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
    strIngredients: ["soy sauce", "water", "brown sugar", "ginger", "garlic"],
    strMeasures: ["3/4 cup", "1/2 cup", "1/4 cup", "1 tsp", "2 cloves"],
  };

  it("renders the ingredients table correctly", () => {
    render(<RecipeDetailsIngredientsTable recipe={mockRecipe} />);

    expect(screen.getByText("Ingredients:")).toBeInTheDocument();
    expect(screen.getByText("Ingredient")).toBeInTheDocument();
    expect(screen.getByText("Measure")).toBeInTheDocument();

    mockRecipe.strIngredients.forEach((ingredient, index) => {
      expect(screen.getByText(ingredient)).toBeInTheDocument();
      expect(
        screen.getByText(mockRecipe.strMeasures[index])
      ).toBeInTheDocument();
    });
  });

  it("renders an empty table if ingredients are empty", () => {
    render(
      <RecipeDetailsIngredientsTable
        recipe={{ ...mockRecipe, strIngredients: [], strMeasures: [] }}
      />
    );

    expect(screen.getByText("Ingredients:")).toBeInTheDocument();
    expect(screen.queryAllByRole("row")).toHaveLength(1);
  });
});
