import React, { ChangeEvent } from "react";
import Container from "@material-ui/core/Container";
import Brand from "../../types/Brand";
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
interface BrandEditorProps extends WithStyles<typeof styles> {
  brand: Brand;
  updateBrand: (newBrand: Brand) => Promise<never>;
  closeCallback: () => Promise<never>;
}
type BrandEditorState = {
  isDirty: boolean;
  draft: Brand;
};

class BrandEditor extends React.Component<BrandEditorProps, BrandEditorState> {
  constructor(props: BrandEditorProps) {
    super(props);
    this.state = {
      isDirty: false,
      draft: props.brand,
    };
  }

  componentWillReceiveProps(newProps: BrandEditorProps) {
    if (newProps.brand && newProps.brand.id !== this.state.draft?.id) {
      this.setState({ draft: newProps.brand, isDirty: false });
    }
  }

  onNameChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    this.setState({
      draft: { ...this.state.draft, name: event.target.value },
      isDirty: true,
    });
  }

  onUrlChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    this.setState({
      draft: { ...this.state.draft, logoUrl: event.target.value },
      isDirty: true,
    });
  }

  async onSave() {
    await this.props.updateBrand(this.state.draft);
    this.setState({ draft: this.props.brand, isDirty: false });
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
          onChange={this.onUrlChange.bind(this)}
          value={this.state.draft.logoUrl}
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

export default withStyles(styles)(BrandEditor);
