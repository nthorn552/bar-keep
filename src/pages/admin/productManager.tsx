import React, { ChangeEvent } from "react";
import Container from "@material-ui/core/Container";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import backBackApi from "../../services/barBackApi";
import { AxiosResponse } from "axios";
import Product from "../../types/Product";
import ProductService from "../../services/productService";
import ProductList from "./productList";
import ProductEditor from "./productEditor";
import {
  Box,
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
interface ProductManagerProps extends WithStyles<typeof styles> {}

type ProductManagerState = {
  productList: Product[];
  productListReady: boolean;
  filterValue: string;
  active?: Product;
};

class ProductManager extends React.Component<
  ProductManagerProps,
  ProductManagerState
> {
  constructor(props: ProductManagerProps) {
    super(props);
    this.state = {
      productListReady: false,
      productList: [],
      filterValue: "",
    };
  }

  componentDidMount() {
    this.refreshProducts();
  }

  onClickProduct(product: Product) {
    this.setState({ active: product });
  }

  onSaveUpdate() {
    this.setState({ active: undefined });
    this.refreshProducts();
  }

  async updateActiveProduct(product: Product) {
    const updatedResult = await ProductService.update(product);
    const updatedList = [...this.state.productList];
    const resultIndex = updatedList.findIndex(
      (thisProduct) => thisProduct.id === updatedResult.id
    );
    updatedList[resultIndex] = updatedResult;
    this.setState({ productList: updatedList, active: updatedResult });
  }

  clearActiveProduct() {
    this.setState({ ...this.state, active: undefined });
  }

  private handleFilterChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    this.setState({ ...this.state, filterValue: event.target.value });
  }

  private refreshProducts() {
    backBackApi.get(`/products?includeBrands=true`).then((res: AxiosResponse<Product[]>) => {
      this.setState({
        ...this.state,
        productListReady: true,
        productList: res.data,
      });
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <Container className={classes.root}>
        <Box className={classes.column}>
          <div className={classes.headerBar}>
            <IconButton color="primary" aria-label="Add Product">
              <AddCircleIcon fontSize="large"></AddCircleIcon>
            </IconButton>

            <TextField
              variant="outlined"
              label="Search Products"
              onChange={this.handleFilterChange.bind(this)}
              value={this.state.filterValue}
            ></TextField>
          </div>
          <ProductList
            products={this.state.productList.filter((thisProduct) =>
              thisProduct.name
                .toLocaleLowerCase()
                .includes(this.state.filterValue.toLocaleLowerCase())
            )}
            activeProduct={this.state.active}
            isLoading={!this.state.productListReady}
            clickHandler={this.onClickProduct.bind(this)}
          ></ProductList>
        </Box>
        <Box className={classes.column}>
          {this.state.active && (
            <ProductEditor
              product={this.state.active}
              updateProduct={this.updateActiveProduct.bind(this)}
              closeCallback={this.clearActiveProduct.bind(this)}
            ></ProductEditor>
          )}
        </Box>
      </Container>
    );
  }
}

export default withStyles(styles)(ProductManager);
