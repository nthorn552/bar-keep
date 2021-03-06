import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import backBackApi from '../services/barBackApi';
import InventoryDisplay from './InventoryDisplay';
import Product from '../types/Product';
import Inventory from '../types/Inventory';
import AddNewInventory from './AddNewInventory';
import Recipe from '../types/Recipe';

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

enum MenuState {
  LOADING = 'loading',
  READY = 'ready',
  ERROR = 'error'
}

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

  componentDidUpdate() {
    console.log(this.state, this.props);


    if (this.props.inventory.length !== this.state.availableInventory.length){ //TODO: will need to actually compare items in inventory
        console.log('in')
      
      this.setState({ ...this.state, availableInventory: this.props.inventory, menuState: MenuState.LOADING }, () => {
        backBackApi.get(`/recipes`)
          .then(res => {
            this.setState({ ...this.state, availableMenu: res.data, menuState: MenuState.READY });
          }).catch(err => {
            this.setState({ ...this.state, availableMenu: [], menuState: MenuState.ERROR });
          })
      });
    } else {
      console.log('dont recalc')
    }
  }

  render() {
    return (
      <Container>
        test
      </Container>
    )
  }
}
export default BarKeep