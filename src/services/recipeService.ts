import { AxiosResponse } from "axios";
import Recipe from "../types/Recipe";
import BarBackApi from "./barBackApi";

async function get(id?: Recipe): Promise<Recipe[]> {
  return BarBackApi.get(`/recipes/${id || ""}`).then(
    (res: AxiosResponse<Recipe[]>) => {
      return res.data;
    }
  );
}
async function update(recipe: Recipe): Promise<Recipe> {
  console.log("requesting update", recipe);
  const requestResult = await BarBackApi.put(`/recipes/${recipe.id}`, recipe);
  return requestResult.data;
}
async function create(recipe: Recipe): Promise<Recipe> { // TODO
  console.log("requesting create", recipe);
  const requestResult = await BarBackApi.post(`/recipes`, recipe);
  return requestResult.data;
}

export default {
  get,
  update,
  create
};
