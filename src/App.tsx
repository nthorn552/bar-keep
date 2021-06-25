import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Container from "@material-ui/core/Container";
import BarKeep from "./BarKeep";
import Admin from "./pages/admin";

const App: React.FunctionComponent = () => {
  return (
    <Container>
      <Router>
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
