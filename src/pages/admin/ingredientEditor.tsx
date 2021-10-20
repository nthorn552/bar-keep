import React, { ChangeEvent } from "react";
import Container from "@material-ui/core/Container";
import Ingredient, { IngredientQuantityType } from "../../types/Ingredient";
import {
  Button,
  createStyles,
  MenuItem,
  TextField,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core";
import { Label } from "@material-ui/icons";
import ingredientService from "../../services/ingredientService";
import Recipe from "../../types/Recipe";

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
interface IngredientEditorProps extends WithStyles<typeof styles> {
  recipeId: string; // TODO: Should be able to pull this id from Ingredient
  ingredient: Ingredient;
  updateIngredient: (ingredientId: string, updatedIngredient?: Ingredient) => Promise<void>;
}
type IngredientEditorState = {
  isDirty: boolean;
  draft: Ingredient;
};

class IngredientEditor extends React.Component<
  IngredientEditorProps,
  IngredientEditorState
> {
  constructor(props: IngredientEditorProps) {
    super(props);
    this.state = {
      isDirty: false,
      draft: props.ingredient,
    };
  }

  componentWillReceiveProps(newProps: IngredientEditorProps) {
    if (newProps.ingredient && newProps.ingredient.id !== this.state.draft?.id) {
      this.setState({ draft: newProps.ingredient, isDirty: false });
    }
  }

  checkIsDirty(overrides: Partial<Ingredient>): boolean {
    return this.props.ingredient.quantityCount !== (overrides?.quantityCount || this.state.draft.quantityCount)
      || this.props.ingredient.quantityType !== (overrides?.quantityType || this.state.draft.quantityType)
  }

  async updateIngredient() {
    const updatedIngredient = await ingredientService.update(this.props.recipeId, this.state.draft);
    this.setState({...this.state, isDirty: false, draft: updatedIngredient})
  }

  render() {
    const { classes } = this.props;
    return (
      <Container>
        {this.props.ingredient.product.name}
        <TextField type="number" value={this.state.draft.quantityCount} onChange={event => {
          const quantityCount = Math.round(10 * parseFloat(event.target.value))/10; // TODO: decide how to store/allow fractions
          this.setState({
            ...this.state,
            isDirty: this.checkIsDirty({quantityCount}),
            draft: {
              ...this.state.draft,
              quantityCount
            }
          })
        }}></TextField>
        <TextField select variant="standard" value={this.state.draft.quantityType} onChange={event => {
          const quantityType = event.target.value as IngredientQuantityType;
          this.setState({
            ...this.state,
            isDirty: this.checkIsDirty({quantityType}),
            draft: {
              ...this.state.draft,
              quantityType
            }
          })
        }}
        >
          <MenuItem value={IngredientQuantityType.PART}>
            Part
          </MenuItem>
          <MenuItem value={IngredientQuantityType.OUNCE}>
            Ounce
          </MenuItem>
          <MenuItem value={IngredientQuantityType.DASH}>
            Dash
          </MenuItem>
          <MenuItem value={IngredientQuantityType.DROP}>
            Drop
          </MenuItem>
        </TextField>
        
        {this.state.isDirty ? (
          <div>
          <Button onClick={this.updateIngredient}>Save</Button>
          <Button>Cancel</Button>
          </div>
          ) : ""
          }
      </Container>
    );
  }
}

export default withStyles(styles)(IngredientEditor);
