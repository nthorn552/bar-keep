import React from "react";
import Container from "@material-ui/core/Container";
import backBackApi from "../../services/barBackApi";
import { AxiosResponse } from "axios";
import Product from "../../types/Product";
import ProductList from "./productList";
import ProductEditor from "./ProductEditor";

type ProductManagerState = {
  productList: Product[];
  productListReady: boolean;
  active?: Product;
};

class ProductManager extends React.Component<{}, ProductManagerState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      productListReady: false,
      productList: [],
    };
  }

  componentDidMount() {
    backBackApi.get(`/products`).then((res: AxiosResponse<Product[]>) => {
      this.setState({
        ...this.state,
        productListReady: true,
        productList: res.data,
      });
    });
  }

  onClickProduct(product: Product) {
    this.setState({ active: product });
    console.log("product selected:", product);
  }

  render() {
    return (
      <Container style={{ display: "flex" }}>
        <ProductList
          products={this.state.productList}
          activeProduct={this.state.active}
          isLoading={!this.state.productListReady}
          clickHandler={this.onClickProduct.bind(this)}
        ></ProductList>
        {this.state.active && (
          <ProductEditor product={this.state.active}></ProductEditor>
        )}
      </Container>
    );
  }
}
export default ProductManager;
