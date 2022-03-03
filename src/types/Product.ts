import Brand from "./Brand"

type Product = {
  id: string,
  name: string,
  brandId?: string,
  brand?: Brand
}

export default Product