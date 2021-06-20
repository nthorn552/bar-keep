import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Product from "../../types/Product";
import { ListItem, ListItemText } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
    },
    productLogo: {
      width: "20%",
    },
  })
);

type ProductListItemProps = {
  product: Product;
  isActive?: boolean;
  clickHandler: (product: Product) => void;
};

export default (props: ProductListItemProps) => {
  const classes = useStyles();
  return (
    <ListItem
      button
      selected={props.isActive}
      onClick={() => props.clickHandler(props.product)}
    >
      <ListItemText primary={props.product.name} />
    </ListItem>
  );
};
