import { AxiosResponse } from "axios";
import Recipe from "../types/Recipe";
import Ingredient from "../types/Ingredient";
import BarBackApi from "./barBackApi";

async function getAll(recipeId: string): Promise<Ingredient[]> {
  return BarBackApi.get(`/recipes/${recipeId}/ingredients`).then(
    (res: AxiosResponse<Ingredient[]>) => {
      return res.data;
    }
  );
}
async function get(recipeId: string, ingredientId: string): Promise<Ingredient> {
  return BarBackApi.get(`/recipes/${recipeId}/ingredients/${ingredientId}`).then(
    (res: AxiosResponse<Ingredient>) => res.data
  ) 
}

async function update(recipeId: string, ingredient: Ingredient): Promise<Ingredient> {
  console.log("requesting update", ingredient);
  const requestResult = await BarBackApi.put(`/recipes/${recipeId}/ingredients/${ingredient.id}`, ingredient);
  return requestResult.data;
}

async function create(recipeId: string, ingredient: Omit<Ingredient, "id">): Promise<Ingredient> {
  console.log("requesting create", ingredient);
  const requestResult = await BarBackApi.post(`/recipes/${recipeId}/ingredients/`, ingredient);
  return requestResult.data;
}

async function destroy(recipeId: string, ingredientId: string): Promise<Ingredient> {
  console.log("requesting destroy", ingredientId);
  const requestResult = await BarBackApi.post(`/recipes/${recipeId}/ingredients/${ingredientId}`);
  return requestResult.data;
}

export default {
  get,
  update,
  create,
  destroy
};
