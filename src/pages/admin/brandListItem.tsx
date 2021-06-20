import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Brand from "../../types/Brand";
import { ListItem, ListItemText } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
    },
    brandLogo: {
      marginRight: theme.spacing(1),
      width: "20%",
    },
  })
);

type BrandListItemProps = {
  brand: Brand;
  isActive?: boolean;
  clickHandler: (brand: Brand) => void;
};

export default (props: BrandListItemProps) => {
  const classes = useStyles();
  return (
    <ListItem
      button
      selected={props.isActive}
      onClick={() => props.clickHandler(props.brand)}
    >
      <img className={classes.brandLogo} src={props.brand.logoUrl} />
      <ListItemText primary={props.brand.name} />
    </ListItem>
  );
};
