import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Recipe from "../../types/Recipe";
import { ListItem, ListItemText } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
    },
    recipeLogo: {
      width: "20%",
    },
  })
);

type RecipeListItemProps = {
  recipe: Recipe;
  isActive?: boolean;
  clickHandler: (recipe: Recipe) => void;
};

export default (props: RecipeListItemProps) => {
  const classes = useStyles();
  return (
    <ListItem
      button
      selected={props.isActive}
      onClick={() => props.clickHandler(props.recipe)}
    >
      <ListItemText primary={props.recipe.name} />
    </ListItem>
  );
};
