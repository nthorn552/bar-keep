import React, { useState, useEffect } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Recipe from '../types/Recipe';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {

    }
  }),
);

type RecipeDisplayProps = {
  recipe: Recipe
}

export default (props: RecipeDisplayProps) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
        {props.recipe.ingredients.map(ingredient => {
          return <div key={ingredient.id}>{ingredient.product.name} - {ingredient.quantityCount} {ingredient.quantityType.toLowerCase()}</div>
        })}
    </Box>
  )
}