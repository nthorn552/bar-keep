import React, { useState, useEffect } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Recipe from '../types/Recipe';
import MenuDisplayItem from './MenuDisplayItem';
import barBackApi from '../services/barBackApi';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                verticalAlign: 'initial'
            }
        },
        context: {
            width: '14ch'
        }
    }),
);

type MenuDisplayProps = {
    menu: Recipe[]
}

export default (props: MenuDisplayProps) => {
    const classes = useStyles();
    const [activeMenuRecipe, setActiveMenuItem] = useState<Recipe>(null);
    const [fullRecipeLoading, setFullRecipeLoading] = useState<boolean>(false);
    const [fullRecipe, setFullRecipe] = useState<Recipe>(null);
    useEffect(() => {
        if (activeMenuRecipe && (!fullRecipe || fullRecipe.id !== activeMenuRecipe.id)) {
            if (!fullRecipeLoading) {
                setFullRecipeLoading(true);
                barBackApi.get(`/recipes/${activeMenuRecipe.id}`)
                    .then(res => {
                        setFullRecipe(res.data);
                    }).catch(err => {
                        setFullRecipe(null);
                    }).finally(() => {
                        setFullRecipeLoading(false);
                    })
            } else {
                console.log("TODO: consider canceling request if selected recipe changes before fetch is complete?");
            }
        } else if (!activeMenuRecipe) {
            setFullRecipe(null);
        }
    });
    let activeMenuItemDisplay = null;
    if (fullRecipe) {
        activeMenuItemDisplay = fullRecipe.ingredients.map(ingredient => {
            return <div key={ingredient.id}>{ingredient.product.name} - {ingredient.quantityCount} {ingredient.quantityType.toLowerCase()}</div>
        })
    }
    return (
        <div className={classes.root}>
            <div>
                {
                    props.menu.map(menuRecipe => {
                        return <MenuDisplayItem key={menuRecipe.id} recipe={menuRecipe} isActive={activeMenuRecipe && menuRecipe.id === activeMenuRecipe.id} clickHandler={(recipe: Recipe) => {
                            setActiveMenuItem(activeMenuRecipe && recipe.id === activeMenuRecipe.id ? null : recipe);
                        }} />
                    })
                }
            </div>
            <div>
                Active recipe:
                {activeMenuItemDisplay}
            </div>

        </div>
    )
}