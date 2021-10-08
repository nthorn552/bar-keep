import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Recipe from "../../types/Recipe";
import { Container } from "@material-ui/core";
import RecipeListItem from "./recipeListItem";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
      display: "flex",
      flexDirection: "column",
    },
  })
);

type RecipeListProps = {
  recipes: Recipe[];
  activeRecipe?: Recipe;
  isLoading?: boolean;
  clickHandler: (recipe: Recipe) => void;
};

export default (props: RecipeListProps) => {
  const classes = useStyles();
  return (
    <Container>
      {!props.isLoading &&
        props.recipes.map((recipe) => (
          <RecipeListItem
            key={recipe.id}
            recipe={recipe}
            isActive={props.activeRecipe && recipe.id === props.activeRecipe.id}
            clickHandler={props.clickHandler}
          ></RecipeListItem>
        ))}
    </Container>
  );
};
