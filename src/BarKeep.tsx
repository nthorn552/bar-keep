import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import ProductService from "./services/productService";

import Product from "./types/Product";
import Inventory, { InventoryPriority } from "./types/Inventory";
import InventoryDisplay from "./components/InventoryDisplay";
import BarMenu from "./components/BarMenu";
import AddNewInventory from "./components/AddNewInventory";

type BarKeepState = {
  productList: Product[];
  productListReady: boolean;
  filteredProductList: Product[];
  inventoryList: Inventory[];
};

class BarKeep extends React.Component<{}, BarKeepState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      productListReady: false,
      productList: [],
      filteredProductList: [],
      inventoryList: [],
    };
  }

  componentDidMount() {
    ProductService.get().then((productList) => {
      this.setState({ ...this.state, productListReady: true, productList });
      this.setFilteredProductList();
    });
  }

  addNewInventory(newInventory: Inventory) {
    this.setState(
      {
        ...this.state,
        inventoryList: [...this.state.inventoryList, newInventory],
      },
      () => {
        this.setFilteredProductList();
      }
    );
  }

  setFilteredProductList() {
    const productsIdsInInventory: string[] = this.state.inventoryList.reduce(
      (list, inventoryItem) => [...list, inventoryItem.product.id],
      []
    );
    const newFilteredProductList = this.state.productList.filter(
      (product) => !productsIdsInInventory.includes(product.id)
    );
    this.setState({
      ...this.state,
      filteredProductList: newFilteredProductList,
    });
  }

  updateInventoryItem(targetProductId: string, newPriority: InventoryPriority) {
    const inventoryItemIndex = this.state.inventoryList.findIndex(
      (thisItem) => thisItem.product.id === targetProductId
    );
    if (~inventoryItemIndex) {
      this.setState({
        ...this.state,
        inventoryList: [
          ...this.state.inventoryList.slice(0, inventoryItemIndex),
          {
            ...this.state.inventoryList[inventoryItemIndex],
            priority: newPriority,
          },
          ...this.state.inventoryList.slice(inventoryItemIndex + 1),
        ],
      });
    }
  }

  render() {
    return (
      <Container>
        <Box>
          {this.state.productListReady && (
            <AddNewInventory
              availableProducts={this.state.filteredProductList}
              addInventory={this.addNewInventory.bind(this)}
            />
          )}
        </Box>
        <hr />
        <Box>
          <InventoryDisplay
            inventoryList={this.state.inventoryList}
            updateInventory={this.updateInventoryItem.bind(this)}
          />
        </Box>
        <br />
        <Box>
          <BarMenu inventory={this.state.inventoryList} />
        </Box>
      </Container>
    );
  }
}
export default BarKeep;
