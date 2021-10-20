import React, { useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Product from '../types/Product';
import Ingredient from '../types/Ingredient';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
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
  handleAdd: (product: Product) => void,
  availableProducts: Product[]
}


export default (props: NewItemProps) => {
  const classes = useStyles();
  const [value, setValue] = useState("");
  return (
    <Container className={classes.root}>
      <Autocomplete
        id="combo-box-demo"
        options={props.availableProducts}
        getOptionLabel={(option: Product) => option.name}
        openOnFocus={false}
        inputValue={value}
        style={{ width: 300 }}
        renderInput={(params: any) => <TextField {...params} label='Add product...' variant="outlined" />}
        onInputChange={(_event, value, reason) => reason == "reset" ? setValue("") : setValue(value)}
        onChange={(_event, product: Product) => {
          if (product) {
            props.handleAdd(product);
            setValue("");
          }
        }}
      />
    </Container>
  )
}