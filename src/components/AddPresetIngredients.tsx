import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Button, Checkbox, Container } from "@material-ui/core";
import Inventory, { InventoryPriority } from "../types/Inventory";
import Product from "../types/Product";

const useStyles = makeStyles((theme: Theme) => createStyles({}));
const basicProductNames = ["Vodka", "Gin", "Tequila", "Rum", "Whiskey"];

type AddPresetProps = {
  availableProducts: Product[];
  addInventory: (newInventory: Inventory[]) => {};
};

export default (props: AddPresetProps) => {
  const classes = useStyles();
  function handleClick() {
    const inventory: Inventory[] = [];
    basicProductNames.forEach((basicProdName) => {
      const product = props.availableProducts.find(
        (product) => product.name === basicProdName
      );
      if (product) {
        inventory.push({product, priority: InventoryPriority.AVAILABLE});
      }
    });
    props.addInventory(inventory);
  }
  return (
    <Button color="primary" type="button" onClick={handleClick}>
      Add the Basics
    </Button>
  );
};
