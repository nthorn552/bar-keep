import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ProductManager from "./productManager";
import BrandManager from "./brandManager";
import RecipeManager from "./recipeManager";
import { Paper, Tab, Tabs } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { TabContext, TabPanel } from "@material-ui/lab";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    header: {},
    managerContainer: {
      display: "flex",
      flexDirection: "column",
    },
  })
);

function handleTabChange(event: React.ChangeEvent, value: string) {
  console.log(event, value);
}

const Admin: React.FunctionComponent<{}> = () => {
  let { tabSlug } = useParams<{ tabSlug: string }>();
  const [value, setValue] = React.useState("products");
  const classes = useStyles();
  return (
    <Container>
      <h2 className={classes.header}>Manage the Bar's Content</h2>
      <Paper square>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event: React.ChangeEvent, newValue: string) =>
            setValue(newValue)
          }
          aria-label="disabled tabs example"
        >
          <Tab label="Brands" value="brands" />
          <Tab label="Products" value="products" />
          <Tab label="Recipes" value="recipes" />
        </Tabs>
      </Paper>
      <Container className={classes.managerContainer}>
        <TabContext value={value}>
          <TabPanel value="brands" tabIndex={0}>
            <BrandManager />
          </TabPanel>
          <TabPanel value="products" tabIndex={1}>
            <ProductManager />
          </TabPanel>
          <TabPanel value="recipes" tabIndex={2}>
            <RecipeManager />
          </TabPanel>
        </TabContext>
      </Container>
    </Container>
  );
};

export default Admin;
