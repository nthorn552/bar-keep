import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import barBackApi from '../services/barBackApi';
import Inventory, { InventoryPriority } from '../types/Inventory';
import Recipe from '../types/Recipe';
import MenuDisplay, { MenuState } from './MenuDisplay';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        verticalAlign: 'initial'
      }
    },
    context: {
      width: '14ch'
    },
    input: {
      minWidth: '25ch'
    }
  }),
);

type BarMenuProps = {
  inventory: Inventory[]
}

type BarMenuState = {
  availableMenu: Recipe[],
  availableInventory: Inventory[],
  menuState: MenuState
}

class BarKeep extends React.Component<BarMenuProps, BarMenuState> {

  constructor(props: BarMenuProps) {
    super(props);
    this.state = {
      availableMenu: [],
      availableInventory: this.props.inventory || [],
      menuState: MenuState.READY
    };
  }

  getProductIdListByInventoryPriority(priority: InventoryPriority) {
    return this.state.availableInventory.reduce((requiredProductList, inventoryItem) => {
      if (inventoryItem.priority == priority) {
        requiredProductList.push(inventoryItem.product.id);
      }
      return requiredProductList;
    }, []);
  }

  componentDidUpdate() {
    if (this.props.inventory.length !== this.state.availableInventory.length || !this.props.inventory.every((val, index) => this.state.availableInventory[index] && val === this.state.availableInventory[index])) {
      this.setState({ ...this.state, availableInventory: this.props.inventory, menuState: MenuState.LOADING }, () => {
        barBackApi.get(`/recipes`, {
          params: {
            requiredProducts: this.getProductIdListByInventoryPriority(InventoryPriority.REQUIRED),
            availableProducts: this.getProductIdListByInventoryPriority(InventoryPriority.AVAILABLE)
          }
        })
          .then(res => {
            this.setState({ ...this.state, availableMenu: res.data, menuState: MenuState.READY });
          }).catch(err => {
            console.log("ERROR?", err);
            this.setState({ ...this.state, availableMenu: [], menuState: MenuState.ERROR });
          })
      });
    }
  }

  render() {
    return (
      <Container>
        <MenuDisplay menu={this.state.availableMenu} menuState={this.state.menuState} />
      </Container>
    )
  }
}
export default BarKeep