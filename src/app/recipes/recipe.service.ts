import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe(
    1,
    'A tes Recipe',
    'this is simply a test',
    'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505',
    [new Ingredient('ingredient 1', 5), new Ingredient('ingredient 2', 4)]
    ),
    new Recipe(
    2,
    'Another recipe',
    'this is simply a test',
    'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505',
    [new Ingredient('ingredient 1', 5)]),

  ];

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
