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

function update(product: Product): Promise<Product> {
  console.log("requesting update", product);
  return BarBackApi.put(`/products/${product.id}`, product);
}
function create(product: Product): Promise<Product> { // TODO
  console.log("requesting create", product);
  return BarBackApi.post(`/products`, product);
}

export default {
  get,
  update,
  create
};
