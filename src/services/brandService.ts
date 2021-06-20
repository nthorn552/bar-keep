import { AxiosResponse } from "axios";
import Brand from "../types/Brand";
import BarBackApi from "./barBackApi";

async function get(id?: Brand): Promise<Brand[]> {
  return BarBackApi.get(`/brands/${id || ""}`).then(
    (res: AxiosResponse<Brand[]>) => {
      return res.data;
    }
  );
}
async function update(brand: Brand): Promise<Brand> {
  console.log("requesting update", brand);
  const requestResult = await BarBackApi.put(`/brands/${brand.id}`, brand);
  return requestResult.data;
}
async function create(brand: Brand): Promise<Brand> { // TODO
  console.log("requesting create", brand);
  const requestResult = await BarBackApi.post(`/brands`, brand);
  return requestResult.data;
}

export default {
  get,
  update,
  create
};
