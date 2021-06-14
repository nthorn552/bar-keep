import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Product from "../../types/Product";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
      // '& .MuiTextField-root': {
      //     verticalAlign: 'initial'
      // }
    },
    active: {
      backgroundColor: "lightblue",
    },
    productLogo: {
        width: "20%"
    }
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
    <li className={props.isActive ? classes.active : null} onClick={() => props.clickHandler(props.product)}>
      {props.product.name}
    </li>
  );
};
