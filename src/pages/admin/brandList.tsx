import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Brand from "../../types/Brand";
import { Container, List } from "@material-ui/core";
import BrandListItem from "./brandListItem";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
      display: "flex",
      flexDirection: "column",
    },
  })
);

type BrandListProps = {
  brands: Brand[];
  activeBrand?: Brand;
  isLoading?: boolean;
  clickHandler: (brand: Brand) => void;
};

export default (props: BrandListProps) => {
  const classes = useStyles();
  return (
    <List component="div" aria-label="main mailbox folders">
      {!props.isLoading &&
        props.brands.map((brand) => (
          <BrandListItem
            key={brand.id}
            brand={brand}
            isActive={props.activeBrand && brand.id === props.activeBrand.id}
            clickHandler={props.clickHandler}
          ></BrandListItem>
        ))}
        </List>
  );
};