import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {

  private recipes: Recipe[] = [];

  recipeSelected = new Subject<Recipe>();
  recipeChange = new Subject<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService){}

  generateNewId(): number{
    return this.recipes.length + 1;
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]): void{
    this.shoppingListService.addIngredients(ingredients);
  }

  getRecipeById(id: number): Recipe {
    return this.recipes.find(recipe => recipe.id === id);
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipeChange.next(this.recipes);
  }

  setRecipes(recipes: Recipe[]): void {
    this.recipes  = recipes;
    this.recipeChange.next(this.recipes);
  }

  updateRecipe(recipe: Recipe): void {

    this.recipes.forEach((r : Recipe, index: number) => {
      if(r.id === recipe.id){
        this.recipes[index] = recipe;
      }
    });
    this.recipeChange.next(this.recipes);
  }

  deleteRecipe(id: number): void {
    this.recipes = this.recipes.filter((recipe: Recipe) => recipe.id !== id);
    this.recipeChange.next(this.recipes);
  }

}
