import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Inventory, { InventoryPriority } from '../types/Inventory';
import { Box, Container } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: theme.spacing(1)
        },
        inventoryItem: {
            margin: theme.spacing(1)
        },
        inventoryZone: {
            minHeight: theme.spacing(10),
            border: 'solid 1px mediumturquoise',
            borderRadius: theme.spacing(1),
            padding: theme.spacing(1),
            background: 'mintcream'
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
        <Container>
            <Box className={classes.inventoryZone} onDragOver={event => event.preventDefault()} onDrop={event => handleInventoryDragAndDrop(event, props.inventoryList, InventoryPriority.AVAILABLE, props.updateInventory)} >
                Available<br />
                {props.inventoryList.filter(inventoryItem => inventoryItem.priority == InventoryPriority.AVAILABLE).map(inventoryItem => (
                    <TextField className={classes.inventoryItem} key={inventoryItem.product.id} draggable onDragStart={event => event.dataTransfer.setData('text/plain', inventoryItem.product.id)} variant="outlined" value={inventoryItem.product.name} InputProps={{ readOnly: true }} />
                ))}
            </Box>
            <br />
            <Box className={classes.inventoryZone} onDragOver={event => event.preventDefault()} onDrop={event => handleInventoryDragAndDrop(event, props.inventoryList, InventoryPriority.REQUIRED, props.updateInventory)} >
                Required<br />
                {props.inventoryList.filter(inventoryItem => inventoryItem.priority == InventoryPriority.REQUIRED).map(inventoryItem => (
                    <TextField className={classes.inventoryItem} key={inventoryItem.product.id} draggable onDragStart={event => event.dataTransfer.setData('text/plain', inventoryItem.product.id)} variant="outlined" value={inventoryItem.product.name} InputProps={{ readOnly: true }} />
                ))}
            </Box>
        </Container>
    )
}