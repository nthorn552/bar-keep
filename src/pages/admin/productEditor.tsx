import React, { ChangeEvent } from "react";
import Container from "@material-ui/core/Container";
import backBackApi from "../../services/barBackApi";
import Product from "../../types/Product";
import {
  Button,
  createStyles,
  TextField,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import Brand from "../../types/Brand";
import { AxiosResponse } from "axios";

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
  brandFieldValue: string;
  brandList: Brand[];
  brandListReady: boolean;
};

class ProductEditor extends React.Component<
  ProductEditorProps,
  ProductEditorState
> {
  constructor(props: ProductEditorProps) {
    super(props);
    this.state = {
      isDirty: false,
      draft: {
        ...props.product,
        brand: props.product.brand?.id ? props.product.brand : undefined,
      },
      brandFieldValue: "",
      brandList: [],
      brandListReady: false,
    };
  }

  componentWillReceiveProps(newProps: ProductEditorProps) {
    if (newProps.product && newProps.product.id !== this.state.draft?.id) {
      this.setState({
        ...this.state,
        brandFieldValue: newProps.product.brand?.name || "",
        draft: newProps.product,
        isDirty: false,
      });
    }
  }

  componentDidMount(): void {
    backBackApi.get(`/brands`).then((res: AxiosResponse<Brand[]>) => {
      this.setState({
        ...this.state,
        brandList: res.data,
        brandListReady: true,
        brandFieldValue: this.props.product.brand?.name || "",
      });
    });
  }

  onNameChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    this.setState({
      draft: { ...this.state.draft, name: event.target.value },
      isDirty: true,
    });
  }

  async onSave() {
    await this.props.updateProduct(this.state.draft);
    this.setState({
      draft: this.props.product,
      brandFieldValue: this.state.draft.brand?.name || "",
      isDirty: false,
    });
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
        <Autocomplete
          options={this.state.brandList}
          getOptionLabel={(option: Brand) => option.name}
          openOnFocus={false}
          inputValue={this.state.brandFieldValue}
          style={{ width: 300 }}
          renderInput={(params: any) => (
            <TextField
              {...params}
              label="Select Brand (if applicable)"
              variant="outlined"
            />
          )}
          onInputChange={(_event, value) =>
            this.setState({
              ...this.state,
              brandFieldValue: value,
            })
          }
          onChange={(_event, brand: Brand) => {
            this.setState({
              ...this.state,
              isDirty: true,
              brandFieldValue: brand?.name || "",
              draft: { ...this.state.draft, brand, brandId: brand?.id || null },
            });
          }}
        />
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
