import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

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
        input: {
            minWidth: '25ch'
        }
    }),
);

type DrinkQueryItem = {
    id: any,
    priority: string,
    type: string,
    name?: string
}
type DrinkQueryBuilderProps = {
    updateItem: (item: DrinkQueryItem) => void,
    queryItem: DrinkQueryItem
}


export default (props: DrinkQueryBuilderProps) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <TextField select className={classes.context} variant="standard" value={props.queryItem.priority} onChange={(event) => {
                props.updateItem({ ...props.queryItem, priority: event.target.value })
            }}>
                <MenuItem value="REQUIRED">
                    Must have
                            </MenuItem>
                <MenuItem value="OPTIONAL">
                    Can have
                            </MenuItem>
            </TextField>
            <TextField select className={classes.context} variant="standard" value={props.queryItem.type} onChange={(event) => {
                props.updateItem({ ...props.queryItem, type: event.target.value })
            }}>
                <MenuItem value="LIQUOR">
                    liquor
                            </MenuItem>
                <MenuItem value="MIXER">
                    mixer
                            </MenuItem>
                <MenuItem value="OTHER">
                    ingredient
                            </MenuItem>
            </TextField>
            <TextField className={classes.input} label="Name" variant="outlined" value={props.queryItem.name} onChange={(event) => {
                props.updateItem({ ...props.queryItem, name: event.target.value })
            }} />
        </div>
    )
}