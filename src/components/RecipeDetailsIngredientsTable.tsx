import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { DetailedRecipe } from "../models";

type RecipeDetailsIngredientsTableProps = {
  recipe: DetailedRecipe;
};

const RecipeDetailsIngredientsTable: React.FC<
  RecipeDetailsIngredientsTableProps
> = ({ recipe }) => {
  return (
    <>
      <Typography
        variant="h5"
        component="h2"
        fontWeight="bold"
        align="center"
        gutterBottom
        sx={{ mt: 4 }}
      >
        Ingredients:
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="ingredients table">
          <TableHead>
            <TableRow>
              <TableCell>Ingredient</TableCell>
              <TableCell align="right">Measure</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recipe.strIngredients.map((ingredient, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {ingredient}
                </TableCell>
                <TableCell align="right">{recipe.strMeasures[index]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default RecipeDetailsIngredientsTable;
