import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";

interface RecipeCardProps {
  recipe: {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
  };
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardActionArea
        sx={{ height: "100%" }}
        component={Link}
        to={`/recipe/${recipe.idMeal}`}
      >
        <CardMedia
          component="img"
          height="140"
          image={recipe.strMealThumb + "/preview"}
          alt={recipe.strMeal}
          onError={(e) => {
            (e.target as HTMLImageElement).src = recipe.strMealThumb;
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {recipe.strMeal}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RecipeCard;
