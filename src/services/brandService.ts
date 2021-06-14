import Brand from "../types/Brand";
import BarBackApi from "./barBackApi";

function update(brand: Brand): Promise<Brand> {
  return BarBackApi.put(`/brands/${brand.id}`, brand);
}

export default {
  update,
};
