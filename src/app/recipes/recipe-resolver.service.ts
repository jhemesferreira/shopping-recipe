import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { inject } from "@angular/core";
import { RecipeService } from "./recipe.service";

export const RecipeResolver: ResolveFn<Recipe> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(RecipeService).getRecipeById(+route.paramMap.get('id'));
  }
