import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Inventory from '../types/Inventory';

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

type InventoryDisplayProps = {
    inventoryList: Inventory[]
}


export default (props: InventoryDisplayProps) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {props.inventoryList.map(inventoryItem => (
                <TextField key={inventoryItem.product.id} variant="outlined" value={inventoryItem.product.name} InputProps={{ readOnly: true }} />
            ))}
        </div>
    )
}