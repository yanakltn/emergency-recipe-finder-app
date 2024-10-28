import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Ingredient, Recipe } from "../models";
import { RecipeContext, RecipeProvider } from "../context/RecipeContext";
import IngredientSearch from "./IngredientSearch";
import "@testing-library/jest-dom/extend-expect";

jest.mock("../api", () => ({
  getIngredientsList: jest.fn().mockResolvedValue([
    { idIngredient: "1", strIngredient: "Chicken" },
    { idIngredient: "2", strIngredient: "Salmon" },
  ]),
  searchRecipesByIngredient: jest.fn().mockResolvedValue([]),
}));

describe("IngredientSearch Component", () => {
  it("renders the search form", async () => {
    render(
      <RecipeProvider>
        <IngredientSearch />
      </RecipeProvider>
    );

    expect(
      screen.getByText("Search recipes by main ingredient")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Ingredients")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  it("calls searchRecipes on search button click", async () => {
    const mockSearchRecipes = jest.fn().mockResolvedValue([]);
    render(
      <RecipeContext.Provider
        value={{
          ingredients: [
            { idIngredient: "1", strIngredient: "Chicken" },
          ] as Ingredient[],
          selectedIngredient: {
            idIngredient: "1",
            strIngredient: "Chicken",
          } as Ingredient,
          recipes: [] as Recipe[],
          loadedIngredient: { idIngredient: "1", strIngredient: "Chicken" },
          isLoading: false,
          setSelectedIngredient: jest.fn(),
          searchRecipes: mockSearchRecipes,
        }}
      >
        <IngredientSearch />
      </RecipeContext.Provider>
    );
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    expect(mockSearchRecipes).toHaveBeenCalledWith({
      idIngredient: "1",
      strIngredient: "Chicken",
    } as Ingredient);
  });

  it("disables search button while loading", async () => {
    render(
      <RecipeContext.Provider
        value={{
          ingredients: [
            { idIngredient: "1", strIngredient: "Chicken" },
          ] as Ingredient[],
          selectedIngredient: {
            idIngredient: "1",
            strIngredient: "Chicken",
          } as Ingredient,
          recipes: [] as Recipe[],
          loadedIngredient: { idIngredient: "1", strIngredient: "Chicken" },
          isLoading: true,
          setSelectedIngredient: jest.fn(),
          searchRecipes: jest.fn(),
        }}
      >
        <IngredientSearch />
      </RecipeContext.Provider>
    );

    expect(screen.getByRole("button", { name: /search/i })).toBeDisabled();
  });
});
