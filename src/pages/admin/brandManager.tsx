import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import backBackApi from "../../services/barBackApi";
import { AxiosResponse } from "axios";
import Brand from "../../types/Brand";
import BrandListItem from './brandListItem';

type BrandManagerState = {
  brandList: Brand[];
  brandListReady: boolean;
};

class BrandManager extends React.Component<{}, BrandManagerState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      brandListReady: false,
      brandList: [],
    };
  }

  componentDidMount() {
    backBackApi.get(`/brands`).then((res: AxiosResponse<Brand[]>) => {
      this.setState({
        ...this.state,
        brandListReady: true,
        brandList: res.data,
      });
    });
  }

  onClickBrand(brand: Brand) {
    console.log("brand selected:", brand);
  }

  render() {
    return (
      <Container>
        <Box>
          <ul>
            {this.state.brandListReady &&
              this.state.brandList.map((brand) => <BrandListItem brand={brand} clickHandler={this.onClickBrand}></BrandListItem>
              )}
          </ul>
        </Box>
      </Container>
    );
  }
}
export default BrandManager;
