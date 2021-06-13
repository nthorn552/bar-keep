import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import backBackApi from "../../services/barBackApi";
import { AxiosResponse } from "axios";
import Recipe from "../../types/Recipe";

type RecipeManagerState = {
  RecipeList: Recipe[];
  RecipeListReady: boolean;
};

class RecipeManager extends React.Component<{}, RecipeManagerState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      RecipeListReady: false,
      RecipeList: [],
    };
  }

  componentDidMount() {
    backBackApi.get(`/recipes`).then((res: AxiosResponse<Recipe[]>) => {
      this.setState({
        ...this.state,
        RecipeListReady: true,
        RecipeList: res.data,
      });
    });
  }

  render() {
    return (
      <Container>
        <Box>
          <ul>
            {this.state.RecipeListReady &&
              this.state.RecipeList.map((recipe) => <li>{recipe.name}</li>)}
          </ul>
        </Box>
      </Container>
    );
  }
}
export default RecipeManager;
