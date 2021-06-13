import React from "react";
import Container from "@material-ui/core/Container";
import backBackApi from "../../services/barBackApi";
import { AxiosResponse } from "axios";
import Brand from "../../types/Brand";

type BrandEditorProps = {
    brand: Brand;
};
type BrandEditorState = {
    isDirty: boolean,
    draft: Brand
};

class BrandEditor extends React.Component<BrandEditorProps, BrandEditorState> {
  constructor(props: BrandEditorProps) {
    super(props);
    this.state = {
      isDirty: false,
      draft: props.brand
    };
  }

  onSave() {
      console.log("Update Brand:")
  }

  render() {
    return (
      <Container>
          {JSON.stringify(this.state.draft)}
      </Container>
    );
  }
}
export default BrandEditor;
