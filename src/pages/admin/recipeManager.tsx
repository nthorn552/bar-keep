import React, { ChangeEvent } from "react";
import { AxiosResponse } from "axios";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import backBackApi from "../../services/barBackApi";
import Recipe from "../../types/Recipe";
import RecipeService from "../../services/recipeService";
import RecipeList from "./recipeList";
import RecipeEditor from "./recipeEditor";
import {
  Box,
  Container,
  createStyles,
  IconButton,
  TextField,
  Theme,
  WithStyles,
  withStyles,
} from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    column: {
      display: "flex",
      flexDirection: "column",
    },
    headerBar: {
      display: "flex",
    },
  });
  interface RecipeManagerProps extends WithStyles<typeof styles> {}


type RecipeManagerState = {
  recipeList: Recipe[];
  recipeListReady: boolean;
    filterValue: string;
    active?: Recipe;
};

class RecipeManager extends React.Component<RecipeManagerProps, RecipeManagerState> {
  constructor(props: RecipeManagerProps) {
    super(props);
    this.state = {
      recipeListReady: false,
      recipeList: [],
      filterValue: "",
    };
  }

  componentDidMount() {
    backBackApi.get(`/recipes`).then((res: AxiosResponse<Recipe[]>) => {
      this.setState({
        ...this.state,
        recipeListReady: true,
        recipeList: res.data,
      });
    });
  }

  onClickRecipe(recipe: Recipe) {
    this.setState({ active: recipe });
  }

  onSaveUpdate() {
    this.setState({ active: undefined });
    this.refreshRecipes();
  }

  async updateActiveRecipe(recipe: Recipe) {
    const updatedResult = await RecipeService.update(recipe);
    const updatedList = [...this.state.recipeList];
    const resultIndex = updatedList.findIndex(
      (thisRecipe) => thisRecipe.id === updatedResult.id
    );
    updatedList[resultIndex] = updatedResult;
    this.setState({ recipeList: updatedList, active: updatedResult });
  }

  clearActiveRecipe() {
    this.setState({ ...this.state, active: undefined });
  }

  private handleFilterChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    this.setState({ ...this.state, filterValue: event.target.value });
  }

  private refreshRecipes() {
    backBackApi.get(`/recipes`).then((res: AxiosResponse<Recipe[]>) => {
      this.setState({
        ...this.state,
        recipeListReady: true,
        recipeList: res.data,
      });
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <Container>
        <Box className={classes.column}>
          <div className={classes.headerBar}>
            <IconButton color="primary" aria-label="Add Recipe">
              <AddCircleIcon fontSize="large"></AddCircleIcon>
            </IconButton>

            <TextField
              variant="outlined"
              label="Search Recipes"
              onChange={this.handleFilterChange.bind(this)}
              value={this.state.filterValue}
            ></TextField>
          </div>
          <RecipeList
            recipes={this.state.recipeList.filter((thisRecipe) =>
              thisRecipe.name
                .toLocaleLowerCase()
                .includes(this.state.filterValue.toLocaleLowerCase())
            )}
            activeRecipe={this.state.active}
            isLoading={!this.state.recipeListReady}
            clickHandler={this.onClickRecipe.bind(this)}
          ></RecipeList>
        </Box>
        <Box className={classes.column}>
          {this.state.active && (
            <RecipeEditor
              recipe={this.state.active}
              updateRecipe={this.updateActiveRecipe.bind(this)}
              closeCallback={this.clearActiveRecipe.bind(this)}
            ></RecipeEditor>
          )}
        </Box>
      </Container>
    );
  }
}
export default withStyles(styles)(RecipeManager);
