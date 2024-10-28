import React from "react";
import { render, screen } from "@testing-library/react";
import RecipesList from "./RecipesList";
import { RecipeContext } from "../context/RecipeContext";
import { Ingredient, Recipe } from "../models";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

jest.mock("./RecipeCard", () => () => <div data-testid="recipe-card" />);

describe("RecipesList Component", () => {
  it("renders loading indicator when isLoading is true", () => {
    render(
      <RecipeContext.Provider
        value={{
          isLoading: true,
          loadedIngredient: null,
          recipes: [],
          ingredients: [],
          selectedIngredient: null,
          setSelectedIngredient: jest.fn(),
          searchRecipes: jest.fn(),
        }}
      >
        <RecipesList />
      </RecipeContext.Provider>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders recipe list when recipes are available", () => {
    const mockRecipes: Recipe[] = [
      { idMeal: "1", strMeal: "Recipe 1", strMealThumb: "image1.jpg" },
      { idMeal: "2", strMeal: "Recipe 2", strMealThumb: "image2.jpg" },
    ];
    const mockIngredient: Ingredient = {
      idIngredient: "1",
      strIngredient: "Chicken",
    };

    render(
      <RecipeContext.Provider
        value={{
          isLoading: false,
          loadedIngredient: mockIngredient,
          recipes: mockRecipes,
          ingredients: [],
          selectedIngredient: {
            idIngredient: "1",
            strIngredient: "Chicken",
          } as Ingredient,
          setSelectedIngredient: jest.fn(),
          searchRecipes: jest.fn(),
        }}
      >
        <MemoryRouter>
          <RecipesList />
        </MemoryRouter>
      </RecipeContext.Provider>
    );

    expect(screen.getByText("Recipes for Chicken")).toBeInTheDocument();
    expect(screen.getAllByTestId("recipe-card")).toHaveLength(2);
  });

  it('renders "no recipes found" message when recipes are empty', () => {
    const mockIngredient: Ingredient = {
      idIngredient: "1",
      strIngredient: "Chicken",
    };

    render(
      <RecipeContext.Provider
        value={{
          isLoading: false,
          loadedIngredient: mockIngredient,
          recipes: [],
          ingredients: [],
          selectedIngredient: null,
          setSelectedIngredient: jest.fn(),
          searchRecipes: jest.fn(),
        }}
      >
        <RecipesList />
      </RecipeContext.Provider>
    );

    expect(
      screen.getByText(
        "No recipes found for Chicken. Try a different ingredient."
      )
    ).toBeInTheDocument();
  });
});
