import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Inventory, { InventoryPriority } from '../types/Inventory';
import { Box } from '@material-ui/core';

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
        inventoryZone: {
            minHeight: '3em',
            border: 'dashed 2px black'
        }
    }),
);

type InventoryDisplayProps = {
    inventoryList: Inventory[],
    updateInventory: (productId: string, priority: InventoryPriority) => void
}

function handleInventoryDragAndDrop(e: React.DragEvent<HTMLElement>, inventory: Inventory[], newPriority: InventoryPriority, updateInventory: (productId: string, priority: InventoryPriority) => void) {
    updateInventory(e.dataTransfer.getData('text'), newPriority);
}

export default (props: InventoryDisplayProps) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Box className={classes.inventoryZone} onDragOver={event => event.preventDefault()} onDrop={event => handleInventoryDragAndDrop(event, props.inventoryList, InventoryPriority.AVAILABLE, props.updateInventory)} >
                Available<br />
                {props.inventoryList.filter(inventoryItem => inventoryItem.priority == InventoryPriority.AVAILABLE).map(inventoryItem => (
                    <TextField key={inventoryItem.product.id} draggable onDragStart={event => event.dataTransfer.setData('text/plain', inventoryItem.product.id)} variant="outlined" value={inventoryItem.product.name} InputProps={{ readOnly: true }} />
                ))}
            </Box>
            <Box className={classes.inventoryZone} onDragOver={event => event.preventDefault()} onDrop={event => handleInventoryDragAndDrop(event, props.inventoryList, InventoryPriority.REQUIRED, props.updateInventory)} >
                Required<br />
                {props.inventoryList.filter(inventoryItem => inventoryItem.priority == InventoryPriority.REQUIRED).map(inventoryItem => (
                    <TextField key={inventoryItem.product.id} draggable onDragStart={event => event.dataTransfer.setData('text/plain', inventoryItem.product.id)} variant="outlined" value={inventoryItem.product.name} InputProps={{ readOnly: true }} />
                ))}
            </Box>
        </div>
    )
}