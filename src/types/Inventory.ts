import Product from "./Product";

export enum InventoryPriority{
  AVAILABLE='available',
  REQUIRED='required',
  EXCLUDED='excluded'
}

type Inventory = {
  product: Product,
  priority: InventoryPriority
}

export default Inventory