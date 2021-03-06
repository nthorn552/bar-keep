import React, { useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { DrinkQueryItem } from './DrinkQueryBuilder';
import Product from '../types/Product';
import Inventory, { InventoryPriority } from '../types/Inventory';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        alignItems: 'initial'
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

type NewItemProps = {
  addInventory: (item: Inventory) => void,
  availableProducts: Product[]
}


export default (props: NewItemProps) => {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const [priority, setPriority] = useState(InventoryPriority.AVAILABLE);
  return (
    <div className={classes.root}>
      <TextField select className={classes.context} variant="standard" value={priority} onChange={(event) => {
        switch (event.target.value) {
          case InventoryPriority.REQUIRED:
            setPriority(InventoryPriority.REQUIRED);
            break;
          default:
            setPriority(InventoryPriority.AVAILABLE);

        }
      }}>
        <MenuItem value={InventoryPriority.REQUIRED}>
          Must have
                            </MenuItem>
        <MenuItem value={InventoryPriority.AVAILABLE}>
          Can have
                            </MenuItem>
      </TextField>
      <Autocomplete
        id="combo-box-demo"
        options={props.availableProducts}
        getOptionLabel={(option: Product) => option.name}
        openOnFocus={false}
        inputValue={value}
        style={{ width: 300 }}
        renderInput={(params: any) => <TextField {...params} label="Combo box" variant="outlined" />}
        onInputChange={(_event, value, reason) => reason == "reset" ? setValue("") : setValue(value)}
        onChange={(_event, item: Product) => {
          if (item) {
            props.addInventory({ product: item, priority });
            setValue("");
            setPriority(InventoryPriority.AVAILABLE);
          }
        }}
      />
    </div>
  )
}