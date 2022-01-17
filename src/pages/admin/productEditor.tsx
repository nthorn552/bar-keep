import React, { ChangeEvent } from "react";
import Container from "@material-ui/core/Container";
import Product from "../../types/Product";
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
interface ProductEditorProps extends WithStyles<typeof styles> {
  product: Product;
  updateProduct: (newProduct: Product) => Promise<never>;
  closeCallback: () => Promise<never>;
}
type ProductEditorState = {
  isDirty: boolean;
  draft: Product;
};

class ProductEditor extends React.Component<
  ProductEditorProps,
  ProductEditorState
> {
  constructor(props: ProductEditorProps) {
    super(props);
    this.state = {
      isDirty: false,
      draft: props.product,
    };
  }

  componentWillReceiveProps(newProps: ProductEditorProps) {
    if (newProps.product && newProps.product.id !== this.state.draft?.id) {
      this.setState({ draft: newProps.product, isDirty: false });
    }
  }

  onNameChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    this.setState({
      draft: { ...this.state.draft, name: event.target.value },
      isDirty: true,
    });
  }

  async onSave() {
    await this.props.updateProduct(this.state.draft);
    this.setState({ draft: this.props.product, isDirty: false });
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
        <TextField
          variant="outlined"
          value={this.state.draft?.brand?.name || ""}
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

export default withStyles(styles)(ProductEditor);
