import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import backBackApi from "../../services/barBackApi";

import Product from "../../types/Product";
import { AxiosResponse } from "axios";

type ProductManagerState = {
  productList: Product[];
  productListReady: boolean;
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

  render() {
    return (
      <Container>
        <Box>
          <ul>
            {this.state.productListReady &&
              this.state.productList.map((product) => <li>{product.name}</li>
              )}
          </ul>
        </Box>
      </Container>
    );
  }
}
export default ProductManager;
