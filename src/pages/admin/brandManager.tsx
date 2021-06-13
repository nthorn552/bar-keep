import React from "react";
import Container from "@material-ui/core/Container";
import backBackApi from "../../services/barBackApi";
import { AxiosResponse } from "axios";
import Brand from "../../types/Brand";
import BrandList from "./brandList";
import BrandEditor from "./BrandEditor";

type BrandManagerState = {
  brandList: Brand[];
  brandListReady: boolean;
  active?: Brand;
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
    this.setState({ active: brand });
    console.log("brand selected:", brand);
  }

  render() {
    return (
      <Container style={{ display: "flex" }}>
        <BrandList
          brands={this.state.brandList}
          activeBrand={this.state.active}
          isLoading={!this.state.brandListReady}
          clickHandler={this.onClickBrand.bind(this)}
        ></BrandList>
        {this.state.active && (
          <BrandEditor brand={this.state.active}></BrandEditor>
        )}
      </Container>
    );
  }
}
export default BrandManager;
