import React, { useState, useEffect } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Recipe from '../types/Recipe';
import MenuDisplayItem from './MenuDisplayItem';
import barBackApi from '../services/barBackApi';
import RecipeDisplay from './RecipeDisplay';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            width: '100%',
            minHeight: theme.spacing(10),
            backgroundColor: 'moccasin'
        },
        menuPage: {
            display: 'inline-flex',
            flexDirection: 'column',
            width: '50%',
            backgroundColor: '#ffffff55',
            border: '1px solid #ffffff33',
            borderRadius: theme.spacing(1),
            margin: theme.spacing(1),
            padding: theme.spacing(1)
        },
        pageMessageContainer: {
            display: 'flex',
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        pageContainer: {
            display: 'flex',
            flexDirection: 'column'
        }
    }),
);

export enum MenuState {
    LOADING = 'loading',
    READY = 'ready',
    ERROR = 'error'
}

type MenuDisplayProps = {
    menu: Recipe[],
    menuState: MenuState
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

    let menuDisplay = null, recipeDisplay = null;
    switch (props.menuState) {
        case MenuState.READY:
            menuDisplay = props.menu.length ? props.menu.map(menuRecipe => {
                return <MenuDisplayItem key={menuRecipe.id} recipe={menuRecipe} isActive={activeMenuRecipe && menuRecipe.id === activeMenuRecipe.id} clickHandler={(recipe: Recipe) => {
                    setActiveMenuItem(activeMenuRecipe && recipe.id === activeMenuRecipe.id ? null : recipe);
                }} />
            }) :
                <div className={classes.pageMessageContainer}>
                    No menu available due to limited ingredients
                </div>
            if (fullRecipeLoading) {
                recipeDisplay = <div className={classes.pageMessageContainer}><CircularProgress /></div>
            } else if (fullRecipe && !props.menu.find(recipe => recipe.id === fullRecipe.id)) {
                setFullRecipe(null);
            } else if (fullRecipe) {
                recipeDisplay = <RecipeDisplay recipe={fullRecipe} />;
            }
            break;
        case MenuState.LOADING:
            menuDisplay = <div className={classes.pageMessageContainer}><CircularProgress /></div>
            break;
        case MenuState.ERROR:
            menuDisplay = <div className={classes.pageMessageContainer}>Uh oh, something went wrong and we couldn't create the menu...</div>
            break;
    }

    return (
        <div className={classes.root}>
            <div className={classes.menuPage}>
                {menuDisplay}
            </div>
            <div className={classes.menuPage}>
                {recipeDisplay}
            </div>

        </div >
    )
}