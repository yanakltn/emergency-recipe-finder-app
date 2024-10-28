import * as React from "react";
import { useHistory, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Box, Chip, CircularProgress, Grid2, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useFetchRecipeDetails } from "../hooks/useFetchRecipeDetails";
import RecipeDetailsIngredientsTable from "../components/RecipeDetailsIngredientsTable";
import { StyledIconButton } from "../components/styles";

const RecipeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const { recipe, isLoading, error } = useFetchRecipeDetails(id);

  const handleGoBack = () => {
    history.goBack();
  };

  return error ? (
    <Box>Error: {error}</Box>
  ) : isLoading || !recipe ? (
    <Stack direction="column" alignItems="center" justifyContent="center">
      <CircularProgress size="4rem" />
    </Stack>
  ) : (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Grid2 container spacing={2} alignItems="center">
        <Grid2 size={{ xs: 12, md: 6 }} position="relative">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            style={{ maxWidth: "100%" }}
          />
          <StyledIconButton aria-label="go back" onClick={handleGoBack}>
            <ArrowBackIcon />
          </StyledIconButton>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            gutterBottom
          >
            {recipe.strMeal}
          </Typography>
          <Chip label={recipe.strCategory} color="success" sx={{ mr: 1 }} />
          <Chip label={recipe.strArea} color="secondary" />
        </Grid2>
      </Grid2>
      <RecipeDetailsIngredientsTable recipe={recipe} />
      <Typography
        variant="h5"
        gutterBottom
        sx={{ mt: 3, mb: 2 }}
        fontWeight="bold"
        align="center"
      >
        Instructions:
      </Typography>
      <Typography variant="body1">{recipe.strInstructions}</Typography>
    </Container>
  );
};

export default RecipeDetails;
