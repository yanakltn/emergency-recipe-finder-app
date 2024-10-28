import { Container } from "@mui/material";
import RecipesList from "../components/RecipesList";
import IngredientSearch from "../components/IngredientSearch";

const Homepage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <IngredientSearch />
      <RecipesList />
    </Container>
  );
};

export default Homepage;
