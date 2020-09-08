import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { DrinkQueryItem } from './DrinkQueryBuilder';

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
            <TextField variant="outlined" value={props.queryItem.item.name} InputProps={{ readOnly: true }} />
        </div>
    )
}