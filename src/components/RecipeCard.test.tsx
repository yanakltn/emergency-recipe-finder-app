import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import RecipeCard from "./RecipeCard";

describe("RecipeCard Component", () => {
  const mockRecipe = {
    idMeal: "52772",
    strMeal: "Teriyaki Chicken Casserole",
    strMealThumb:
      "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
  };

  it("renders the recipe card correctly", () => {
    render(
      <MemoryRouter>
        <RecipeCard recipe={mockRecipe} />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("img", { name: mockRecipe.strMeal })
    ).toBeInTheDocument();
    expect(screen.getByText(mockRecipe.strMeal)).toBeInTheDocument();
  });

  it("links to the correct recipe details page", () => {
    render(
      <MemoryRouter>
        <RecipeCard recipe={mockRecipe} />
      </MemoryRouter>
    );

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      `/recipe/${mockRecipe.idMeal}`
    );
  });

  it("handles image loading errors", () => {
    render(
      <MemoryRouter>
        <RecipeCard recipe={{ ...mockRecipe, strMealThumb: "" }} />{" "}
      </MemoryRouter>
    );

    const image = screen.getByRole("img", { name: mockRecipe.strMeal });
    fireEvent.error(image);
    expect(image).toHaveAttribute("src", "");
  });
});
