import React, { ChangeEvent } from "react";
import Container from "@material-ui/core/Container";
import Recipe from "../../types/Recipe";
import Product from "../../types/Product";
import productService from "../../services/productService";
import {
  Button,
  createStyles,
  TextField,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core";
import AddNewInventory from "../../components/AddNewInventory";
import AddProduct from "../../components/AddProduct";
import Ingredient, { IngredientQuantityType } from "../../types/Ingredient";
import ingredientService from "../../services/ingredientService";
import IngredientEditor from "./ingredientEditor";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
    },
    buttonRow: {
      display: "flex",
      "& > *": {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
      },
      "& :not(:first-child)": {
        marginLeft: theme.spacing(1),
      },
    },
  });
interface RecipeEditorProps extends WithStyles<typeof styles> {
  recipe: Recipe;
  updateRecipe: (newRecipe: Recipe) => Promise<never>;
  closeCallback: () => Promise<never>;
}
type RecipeEditorState = {
  productList: Product[];
  productListReady: boolean;
  filteredProductList: Product[];
  isDirty: boolean;
  draft: Recipe;
};

class RecipeEditor extends React.Component<
  RecipeEditorProps,
  RecipeEditorState
> {
  constructor(props: RecipeEditorProps) {
    super(props);
    this.state = {
      productList: [],
      productListReady: false,
      filteredProductList: [],
      isDirty: false,
      draft: props.recipe,
    };
  }

  componentDidMount() {
    productService.get().then((productList) => {
      this.setState({ ...this.state, productListReady: true, productList });
      this.setFilteredProductList();
    });
  }

  componentWillReceiveProps(newProps: RecipeEditorProps) {
    if (newProps.recipe && newProps.recipe.id !== this.state.draft?.id) {
      this.setState({ draft: newProps.recipe, isDirty: false });
    }
  }

  onNameChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    this.setState({
      ...this.state,
      draft: { ...this.state.draft, name: event.target.value },
      isDirty: true,
    });
  }

  async onSave() {
    await this.props.updateRecipe(this.state.draft);
    this.setState({ 
      ...this.state, 
      draft: this.props.recipe, 
      isDirty: false });
  }

  async onClose() {
    this.props.closeCallback();
  }

  setFilteredProductList() {
    const productsIdsInIngredients: string[] = this.state.draft.ingredients.reduce(
      (list, ingredient) => [...list, ingredient.product.id],
      []
    );
    const newFilteredProductList = this.state.productList.filter(
      (product) => !productsIdsInIngredients.includes(product.id)
    );
    this.setState({
      ...this.state,
      filteredProductList: newFilteredProductList,
    });
  }

  async addNewIngredient(product: Product) {
    const ingredientPayload: Omit<Ingredient, "id"> = {
      product,
      quantityCount: 0,
      quantityType: IngredientQuantityType.PART
    }
    const newIngredient = await ingredientService.create(this.state.draft.id, ingredientPayload);
    newIngredient.product = product; // Patch this is in on the fly to save the extra request;
    this.setState(
      {
        ...this.state,
        draft: {
          ...this.state.draft,
          ingredients: [...this.state.draft.ingredients, newIngredient],
        }
      },
      () => {
        this.setFilteredProductList();
      }
      );
  }

  async handleIngredientUpdate(ingredientId: string, ingredient?: Ingredient | undefined): Promise<void> {
    if (!ingredient) {
      await ingredientService.destroy(this.props.recipe.id, ingredientId);
    } else {
      await ingredientService.update(this.props.recipe.id, ingredient);
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Container>
        <TextField
          variant="outlined"
          onChange={this.onNameChange.bind(this)}
          value={this.state.draft.name}
        ></TextField>
        <br />


        {this.state.productListReady && (
            <AddProduct
              availableProducts={this.state.filteredProductList}
              handleAdd={this.addNewIngredient.bind(this)}
            />
          )}

        {this.state.draft.ingredients.map(ingredient =>   
          <IngredientEditor ingredient={ingredient} recipeId={this.props.recipe?.id} updateIngredient={this.handleIngredientUpdate}/>
        )}
        <div className={classes.buttonRow}>
          <Button
            variant="contained"
            onClick={this.onClose.bind(this)}
            aria-label="Close editor"
          >
            {this.state.isDirty ? "Cancel" : "Close"}
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={!this.state.isDirty}
            onClick={this.onSave.bind(this)}
            aria-label="Save Changes"
          >
            Save Changes
          </Button>
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(RecipeEditor);
