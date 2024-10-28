import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { CircularProgress, Stack, Typography } from "@mui/material";
import { Ingredient } from "../models";
import { useRecipeContext } from "../context/RecipeContext";

const IngredientSearch: React.FC = () => {
  const {
    ingredients,
    isLoading,
    searchRecipes,
    selectedIngredient,
    setSelectedIngredient,
  } = useRecipeContext();

  const onSelectedIngredientChange = (
    event: any,
    ingredient: Ingredient | null
  ) => {
    setSelectedIngredient(ingredient);
  };

  const handleSearch = async () => {
    searchRecipes(selectedIngredient);
  };

  return (
    <>
      <Typography
        variant="h5"
        align="left"
        gutterBottom
        sx={{
          fontWeight: "bold",
          mb: 2,
        }}
      >
        Search recipes by main ingredient
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
        <Autocomplete
          fullWidth
          value={selectedIngredient}
          onChange={onSelectedIngredientChange}
          options={ingredients}
          getOptionLabel={(option: Ingredient) => option.strIngredient}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Ingredients"
              id="ingredient-search"
              placeholder="Search for ingredients..."
              variant="outlined"
            />
          )}
        />
        <Button
          aria-label="Search for recipes"
          variant="contained"
          color="primary"
          disabled={!selectedIngredient || isLoading}
          onClick={handleSearch}
          size="large"
        >
          {isLoading ? <CircularProgress size={24} /> : "Search"}
        </Button>
      </Stack>
    </>
  );
};

export default IngredientSearch;
