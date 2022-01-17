import React, { ChangeEvent } from "react";
import Container from "@material-ui/core/Container";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import backBackApi from "../../services/barBackApi";
import { AxiosResponse } from "axios";
import Brand from "../../types/Brand";
import BrandService from "../../services/brandService";
import BrandList from "./brandList";
import BrandEditor from "./brandEditor";
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
interface BrandManagerProps extends WithStyles<typeof styles> {}

type BrandManagerState = {
  brandList: Brand[];
  brandListReady: boolean;
  filterValue: string;
  active?: Brand;
};

class BrandManager extends React.Component<
  BrandManagerProps,
  BrandManagerState
> {
  constructor(props: BrandManagerProps) {
    super(props);
    this.state = {
      brandListReady: false,
      brandList: [],
      filterValue: "",
    };
  }

  componentDidMount() {
    this.refreshBrands();
  }

  onClickBrand(brand: Brand) {
    this.setState({ active: brand });
  }

  onSaveUpdate() {
    this.setState({ active: undefined });
    this.refreshBrands();
  }

  async updateActiveBrand(brand: Brand) {
    const updatedResult = await BrandService.update(brand);
    const updatedList = [...this.state.brandList];
    const resultIndex = updatedList.findIndex(
      (thisBrand) => thisBrand.id === updatedResult.id
    );
    updatedList[resultIndex] = updatedResult;
    this.setState({ brandList: updatedList, active: updatedResult });
  }

  clearActiveBrand() {
    this.setState({ ...this.state, active: undefined });
  }

  private handleFilterChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    this.setState({ ...this.state, filterValue: event.target.value });
  }

  private refreshBrands() {
    backBackApi.get(`/brands`).then((res: AxiosResponse<Brand[]>) => {
      this.setState({
        ...this.state,
        brandListReady: true,
        brandList: res.data,
      });
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <Container className={classes.root}>
        <Box className={classes.column}>
          <div className={classes.headerBar}>
            <IconButton color="primary" aria-label="Add Brand">
              <AddCircleIcon fontSize="large"></AddCircleIcon>
            </IconButton>

            <TextField
              variant="outlined"
              label="Search Brands"
              onChange={this.handleFilterChange.bind(this)}
              value={this.state.filterValue}
            ></TextField>
          </div>
          <BrandList
            brands={this.state.brandList.filter((thisBrand) =>
              thisBrand.name
                .toLocaleLowerCase()
                .includes(this.state.filterValue.toLocaleLowerCase())
            )}
            activeBrand={this.state.active}
            isLoading={!this.state.brandListReady}
            clickHandler={this.onClickBrand.bind(this)}
          ></BrandList>
        </Box>
        <Box className={classes.column}>
          {this.state.active && (
            <BrandEditor
              brand={this.state.active}
              updateBrand={this.updateActiveBrand.bind(this)}
              closeCallback={this.clearActiveBrand.bind(this)}
            ></BrandEditor>
          )}
        </Box>
      </Container>
    );
  }
}

export default withStyles(styles)(BrandManager);
