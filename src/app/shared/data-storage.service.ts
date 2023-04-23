import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { exhaustMap, map, take } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

const URL_RECIPES = 'https://angular-course-33335-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';

// Injectable is optinal theoretically => But we need to add as soon as a service gets another service injected
@Injectable({
  providedIn: 'root'
})
export class DataStorageService
{
  constructor
  (
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService,
  ){}

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
    this.authService.user.pipe(take(1), exhaustMap(user => {
      return this.http.get<Recipe[]>(
        URL_RECIPES,
        {
          params: new HttpParams().set('auth', user.token)
        }
      )
    }), map(recipes => recipes.map(recipe => {
      return {
        ...recipe,
        ingredients: recipe.ingredients ?? []
      }
    })))
    .subscribe(recipes => {
      this.recipeService.setRecipes(recipes);
    })
  }
}
