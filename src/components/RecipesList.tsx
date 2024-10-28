import { CircularProgress, Grid2, Stack, Typography } from "@mui/material";
import { useRecipeContext } from "../context/RecipeContext";
import RecipeCard from "./RecipeCard";

const RecipesList: React.FC = () => {
  const { isLoading, loadedIngredient, recipes } = useRecipeContext();

  return (
    <>
      {isLoading && (
        <Stack direction="row" justifyContent="center" alignItems="center">
          <CircularProgress size="4rem" />
        </Stack>
      )}
      {!isLoading && recipes.length > 0 && (
        <Stack direction="column" alignItems="center">
          <Typography variant="h4" mb="2rem">
            Recipes for {loadedIngredient?.strIngredient}
          </Typography>
          <Grid2 container spacing={2} width={1}>
            {recipes.map((recipe) => (
              <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={recipe.idMeal}>
                <RecipeCard recipe={recipe} />
              </Grid2>
            ))}
          </Grid2>
        </Stack>
      )}
      {recipes.length === 0 && !!loadedIngredient && (
        <Typography variant="body1">
          No recipes found for {loadedIngredient?.strIngredient}. Try a
          different ingredient.
        </Typography>
      )}
    </>
  );
};

export default RecipesList;
