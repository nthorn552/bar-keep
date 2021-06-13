import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ProductManager from "./productManager";
import BrandManager from "./brandManager";
import RecipeManager from "./recipeManager";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    header: {},
    managerContainer: {
      display: "flex",
    },
  })
);

const Admin: React.StatelessComponent<{}> = () => {
  const classes = useStyles();
  return (
    <Container>
      <h2 className={classes.header}>Manage the Bar's Content</h2>
      <Container className={classes.managerContainer}>
        <BrandManager></BrandManager>
        <ProductManager></ProductManager>
        <RecipeManager></RecipeManager>
      </Container>
    </Container>
  );
};

export default Admin;
