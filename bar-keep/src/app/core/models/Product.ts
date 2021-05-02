import Brand from "./Brand"

type Product = {
  id: string,
  name: string,
  brand?: Brand
}

export default Product