import React, { ChangeEvent } from "react";
import Container from "@material-ui/core/Container";
import Product from "../../types/Product";
import { OutlinedInput } from "@material-ui/core";
import ProductService from "../../services/productService";

type ProductEditorProps = {
  product: Product;
};
type ProductEditorState = {
  isDirty: boolean;
  draft: Product;
};

class ProductEditor extends React.Component<
  ProductEditorProps,
  ProductEditorState
> {
  constructor(props: ProductEditorProps) {
    super(props);
    this.state = {
      isDirty: false,
      draft: props.product,
    };
  }

  componentWillReceiveProps(newProps: ProductEditorProps) {
    console.log("UPDATE", newProps);
    if (newProps.product && newProps.product.id !== this.state.draft?.id) {
      this.setState({ draft: newProps.product, isDirty: false });
    }
  }

  onNameChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    console.log("EVENT:", event);
    this.setState({
      draft: { ...this.state.draft, name: event.target.value },
      isDirty: true,
    });
  }

  async onSave() {
    console.log("Update Product:", this.state.draft);
    const updateResult = await ProductService.update(this.state.draft);
    const createResult = await ProductService.create(this.state.draft);
  }

  render() {
    return (
      <Container>
        <OutlinedInput
          onChange={this.onNameChange.bind(this)}
          value={this.state.draft.name}
        ></OutlinedInput>

        <button onClick={this.onSave.bind(this)}>SAVE</button>
      </Container>
    );
  }
}
export default ProductEditor;
