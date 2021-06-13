import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Brand from "../../types/Brand";

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
    brandLogo: {
        width: "20%"
    }
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
    <li className={props.isActive ? classes.active : null} onClick={() => props.clickHandler(props.brand)}>
      {props.brand.name}
      <img className={classes.brandLogo} src={props.brand.logoUrl}/>
    </li>
  );
};
