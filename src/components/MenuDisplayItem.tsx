import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Recipe from '../types/Recipe';

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
        },
        active: {
            backgroundColor: 'lightblue'
        }
    }),
);

type RecipeDisplayProps = {
    recipe: Recipe,
    isActive: boolean,
    clickHandler: (recipe: Recipe) => void
}

export default (props: RecipeDisplayProps) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <TextField className={props.isActive ? classes.active : null} onClick={() => props.clickHandler(props.recipe)} variant="outlined" value={props.recipe.name} InputProps={{ readOnly: true }} />
        </div>
    )
}