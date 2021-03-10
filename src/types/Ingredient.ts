import Product from "./Product"

export enum IngredientQuantityType {
  PART = 'PART',
  OUNCE = 'OUNCE',
  DASH = 'DASH',
  DROP = 'DROP'
}

type Ingredient = {
  id: string,
  product: Product,
  quantityCount: number,
  quantityType: IngredientQuantityType
}

export default Ingredient