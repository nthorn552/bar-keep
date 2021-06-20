import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import "./App.css";
import Container from "@material-ui/core/Container";
import BarKeep from "./BarKeep";
import Admin from "./pages/admin";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        verticalAlign: "initial",
      },
    },
    header: {
      textAlign: "center",
    },
  })
);

const App: React.FunctionComponent = () => {
  const classes = useStyles();
  return (
    <Container>
      <Router>
        <h1 className={classes.header}>Welcome to Bar Keep</h1>
        <Switch>
          <Route path="/admin/:tabSlug?">
            <Admin />
          </Route>
          <Route path="/">
            <BarKeep />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
};

export default App;
