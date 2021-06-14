import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Product from "../../types/Product";
import { Container } from "@material-ui/core";
import ProductListItem from "./productListItem";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
      display: "flex",
      flexDirection: "column",
    },
  })
);

type ProductListProps = {
  products: Product[];
  activeProduct?: Product;
  isLoading?: boolean;
  clickHandler: (product: Product) => void;
};

export default (props: ProductListProps) => {
  const classes = useStyles();
  return (
    <Container>
      {!props.isLoading &&
        props.products.map((product) => (
          <ProductListItem
            key={product.id}
            product={product}
            isActive={props.activeProduct && product.id === props.activeProduct.id}
            clickHandler={props.clickHandler}
          ></ProductListItem>
        ))}
    </Container>
  );
};
