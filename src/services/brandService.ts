import Brand from "../types/Brand";
import BarBackApi from "./barBackApi";

function updateBrand(brand: Brand): Promise<Brand> {
  return BarBackApi.put(`/brands/${brand.id}`, brand);
}

export default {
  updateBrand,
};
