import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";

const URL_RECIPES = 'https://angular-course-33335-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';

// Injectable is optinal theoretically => But we need to add as soon as a service gets another service injected
@Injectable({
  providedIn: 'root'
})
export class DataStorageService
{
  constructor(private http: HttpClient, private recipeService: RecipeService){}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();

    this.http.put<Recipe[]>(
        URL_RECIPES,
        recipes
      )
      .subscribe(response => {
      console.log(response)
    });
  }

  fetchRecipes() {
    this.http.get<Recipe[]>(
      URL_RECIPES
    )
    .subscribe(recipes => {
      this.recipeService.setRecipes(recipes);
    })
  }
}
