import React, { ChangeEvent } from "react";
import Container from "@material-ui/core/Container";
import Recipe from "../../types/Recipe";
import {
  Button,
  createStyles,
  TextField,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core";

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
      isDirty: false,
      draft: props.recipe,
    };
  }

  componentWillReceiveProps(newProps: RecipeEditorProps) {
    if (newProps.recipe && newProps.recipe.id !== this.state.draft?.id) {
      this.setState({ draft: newProps.recipe, isDirty: false });
    }
  }

  onNameChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    this.setState({
      draft: { ...this.state.draft, name: event.target.value },
      isDirty: true,
    });
  }

  async onSave() {
    await this.props.updateRecipe(this.state.draft);
    this.setState({ draft: this.props.recipe, isDirty: false });
  }

  async onClose() {
    this.props.closeCallback();
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
