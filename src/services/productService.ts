import { AxiosResponse } from "axios";
import Product from "../types/Product";
import BarBackApi from "./barBackApi";

async function get(id?: Product): Promise<Product[]> {
  return BarBackApi.get(`/products/${id || ""}`).then(
    (res: AxiosResponse<Product[]>) => {
      return res.data;
    }
  );
}
async function update(product: Product): Promise<Product> {
  console.log("requesting update", product);
  const requestResult = await BarBackApi.put(`/products/${product.id}`, product);
  return requestResult.data;
}
async function create(product: Product): Promise<Product> { // TODO
  console.log("requesting create", product);
  const requestResult = await BarBackApi.post(`/products`, product);
  return requestResult.data;
}

export default {
  get,
  update,
  create
};
